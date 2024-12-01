import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function UserView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const notyf = new Notyf();

  // Check if the user is authenticated by looking for a token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  // Use navigate hook from react-router-dom for redirection
  const navigate = useNavigate();

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

  const handleViewDetails = (movieId) => {
    notyf.success(`Viewing details for movie ID: ${movieId}`);
    navigate(`/movie/${movieId}`);  // Redirect to the movie details page
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page if the user is not authenticated
    navigate('/login');
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

                {/* Only render the View Details button if the user is authenticated */}
                {isAuthenticated ? (
                  <button className="view-details-btn" onClick={() => handleViewDetails(movie._id)}>
                    View Details
                  </button>
                ) : (
                  <button className="view-details-btn" onClick={handleLoginRedirect} style={{ backgroundColor: 'black', color: 'white' }}>
                    Please log in to view details.
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No movies available.</p>
          )}
        </div>
      )}
    </div>
  );
}
