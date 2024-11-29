import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

export default function UserView () {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const notyf = new Notyf();

  useEffect(() => {
    // Fetch movies from the backend
    fetch('/api/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
        notyf.success('Movies loaded successfully!');
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
        notyf.error('Failed to load movies. Please try again later.');
      });
  }, []);

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    notyf.success(`Viewing details for: ${movie.title}`);
  };

  return (
    <div className="user-view">
      <h2>All Movies</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-cards">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.director}</p>
              <p>{movie.year}</p>
              <button onClick={() => handleViewDetails(movie)}>View Details</button>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="movie-details">
          <h3>{selectedMovie.title} - Details</h3>
          <p>Director: {selectedMovie.director}</p>
          <p>Year: {selectedMovie.year}</p>
          <p>{selectedMovie.description}</p>
        </div>
      )}
    </div>
  );
}
