import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import AddMovieModal from './AddMovieModal';
import DeleteMovie from './DeleteMovie';

export default function AdminView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const notyf = new Notyf(); 

  // Fetch movies from the API
  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movies from the API function
  const fetchMovies = () => {
    setLoading(true);
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
  };

  // Remove movie from the list after deletion
  const removeMovieFromList = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar my-5 text-center">
        <h3>ADMIN DASHBOARD</h3>
      </div>

      {/* Add Movie Button */}
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
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.year}</td>
                      <td>{movie.description}</td>
                      <td>{movie.genre}</td>
                      <td>
                        <DeleteMovie 
                          movieId={movie._id}
                          removeMovieFromList={removeMovieFromList} 
                          refreshMovies={fetchMovies}
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
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        refreshMovies={fetchMovies} 
      />
    </div>
  );
}
