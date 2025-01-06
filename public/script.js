const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const newsContainer = document.getElementById("news-container");

// Fetch news from the server
async function fetchNews(query = "general") {
  try {
    const response = await fetch(`/news?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      renderNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p>No articles found. Try searching for something else.</p>`;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
  }
}

// Render news articles
function renderNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("news-article");

    articleElement.innerHTML = `
      <img src="${article.urlToImage || "https://via.placeholder.com/300x150"}" alt="Article Image">
      <h2>${article.title}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    newsContainer.appendChild(articleElement);
  });
}

// Event listener for search
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    alert("Please enter a search term.");
  }
});

// Load default news on page load
fetchNews();
