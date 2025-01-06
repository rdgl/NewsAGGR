const dotenv = require("dotenv");
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/news", async (req, res) => {
  const query = req.query.query || "latest";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: data.message });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
