import React, { useEffect, useState } from "react";
import './App.css';

function SelectFitType() {
  const [selectedType, setSelectedType] = useState('');
  const [displayArticle, setDisplayArticle] = useState(null); // Initialize as null

  function handleChange(event) {
    setSelectedType(event.target.value);
  }

  useEffect(() => {
    // Fetch the data from the API
    fetch("http://localhost:3000/Articles")
      .then(resp => resp.json())
      .then(data => {
        // Save the fetched data in displayArticle state
        setDisplayArticle(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to fetch data only once

  // Find the selected article based on the selectedType value
  const selectedArticle = displayArticle ? displayArticle.find(article => article.Title === selectedType) : null;

  function handleGoBack() {
    setSelectedType(''); // Reset selectedType to empty string to go back to default option
  }

  // Add this useEffect hook to scroll to the top after the page updates
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [selectedType]);

  return (
    <div>
      <div className="coverArticle">
        <h2 id="myHeader">Diet to follow depending on your goal?</h2>
        <img id="healthy" src="https://images.indianexpress.com/2021/12/pexels-photo-5966430-food.jpg"/>
        <select className="optional" value={selectedType} onChange={handleChange}>
          <option value="">Select Goal to get diet</option>
          <option value="Fat Loss">Fat Loss</option>
          <option value="Weight loss">Weight loss</option>
          <option value="Muscle gain">Muscle gain</option>
          <option value="Pre-Workout Foods">Pre-Workout Foods</option>
          <option value="Healthy foods">Healthy foods</option>
        </select>
      </div>
      <div className="myArticle">
        {selectedArticle ? ( // Only display the article when a selection is made
          <div className="articlePage">
            <button id="goback" onClick={handleGoBack}>Go back</button>
            <h2>{selectedArticle.Title}</h2>
            {selectedArticle.article.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p>{null}</p>
        )}
      </div>
    </div>
  );
}

export default SelectFitType;
