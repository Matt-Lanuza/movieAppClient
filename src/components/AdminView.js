import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

export default function AdminView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar my-5 text-center">
        <h3>ADMIN DASHBOARD</h3>
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
                </tr>
              </thead>
              <tbody>
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <tr key={movie._id || movie.id}>
                      <td>{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.year}</td>
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
    </div>
  );
}
