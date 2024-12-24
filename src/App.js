import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://dummyapi.online/api/movies");
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getCurrentMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return movies.slice(startIndex, endIndex);
  };

  return (
    <div className="app">
      <h1 className="title">🎬 Movie Database</h1>
      {loading ? (
        <div className="loader-wrapper">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <>
          <div className="movie-container">
            {getCurrentMovies().map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.image}
                  alt={movie.movie}
                  className="movie-image"
                />
                <h2 className="movie-title">{movie.movie}</h2>
                <p className="movie-rating">⭐ {movie.rating}</p>
                <a
                  href={movie.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-link"
                >
                  View on IMDb
                </a>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
