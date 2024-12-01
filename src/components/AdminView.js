import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import AddMovieModal from './AddMovieModal';
import UpdateMovie from './UpdateMovie'; // Import the UpdateMovie component
import DeleteMovie from './DeleteMovie'; // Import the DeleteMovie component

export default function AdminView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false); // For Add Movie modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // For Update Movie modal
  const [movieToUpdate, setMovieToUpdate] = useState(null); // Movie to update
  const notyf = new Notyf();

  // Fetch movies from the API
  useEffect(() => {
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notyf.error('Failed to load movies. Please try again later.');
      });
  }, []);

  // Function to refresh the movie list after adding, updating, or deleting a movie
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
        notyf.error('Failed to refresh movie list.');
      });
  };

  // Handle opening the Update Movie modal
  const handleUpdateMovie = (movie) => {
    setMovieToUpdate(movie);
    setShowUpdateModal(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar my-5 text-center">
        <h3>ADMIN DASHBOARD</h3>
      </div>

      <div className="text-center mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          Add New Movie
        </button>
      </div>

      <div className="admin-content">
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
                      <td>
                        <button onClick={() => handleUpdateMovie(movie)} className="btn btn-warning">
                          Update
                        </button>
                        <DeleteMovie 
                          movieId={movie._id || movie.id} 
                          movies={movies} 
                          setMovies={setMovies} 
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No movies found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Movie Modal */}
      <AddMovieModal 
        show={showAddModal} 
        handleClose={() => setShowAddModal(false)} 
        refreshMovies={refreshMovies} 
      />

      {/* Update Movie Modal */}
      {showUpdateModal && (
        <UpdateMovie 
          movie={movieToUpdate} 
          refreshMovies={refreshMovies} 
          handleClose={() => setShowUpdateModal(false)} 
        />
      )}
    </div>
  );
}
