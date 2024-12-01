import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

export default function UserView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const notyf = new Notyf();

  useEffect(() => {
    // Fetch movies from the backend
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovies')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); 

        // Extract movies array from the response and set it to state
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies); // Set the movies array
        } else {
          console.error("Movies data is missing or not an array:", data);
          notyf.error('Failed to load movies. Please try again later.');
        }

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
      <h2 className="text-center my-3">All Movies</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-cards mt-5">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <div className="movie-card-header">
                  <h3 className="my-3">{movie.title}</h3>
                </div>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <button className="view-details-btn" onClick={() => handleViewDetails(movie)}>View Details</button>
              </div>
            ))
          ) : (
            <p>No movies available.</p>
          )}
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