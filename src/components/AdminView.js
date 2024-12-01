import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import AddMovieModal from './AddMovieModal';

export default function AdminView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const notyf = new Notyf(); 

  // Fetch movies from the API
  useEffect(() => {
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched movies:', data);
        setMovies(data.movies); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
        notyf.error('Failed to load movies. Please try again later.');
      });
  }, []);

  // Function to refresh the movie list after adding a new movie
  const refreshMovies = () => {
    setLoading(true);
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notyf.error('Failed to refresh movies list.');
      });
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar my-5 text-center">
        <h3>ADMIN DASHBOARD</h3>
      </div>

      {/* Add Movie Button - Placed here above the table */}
      <div className="text-center mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Movie
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Movies List Section */}
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="movies-table-container">
            <table className="movie-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Year</th>
                  <th>Description</th>
                  <th>Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <tr key={movie._id || movie.id}>
                      <td>{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.year}</td>
                      <td>{movie.description}</td>
                      <td>{movie.genre}</td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No movies found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Movie Modal */}
      <AddMovieModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        refreshMovies={refreshMovies} 
      />
    </div>
  );
}