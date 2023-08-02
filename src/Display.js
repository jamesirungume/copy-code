import React, { useEffect, useState } from "react";

function Display() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/Articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setError(null);
      })
      .catch(() => {
        setArticles([]);
        setError("Error fetching data from the API");
      });
  }, []);

  return (
    <div>
      <h2>Fetch API Example</h2>
      {error && <p>{error}</p>}
      {articles.map((article) => (
        <div key={article.id} className="myArticle">
          <h3>{article.Title}</h3>
          {article.article.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Display;
