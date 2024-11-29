import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';


export default function AdminView () {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '', description: '' });
  const [loading, setLoading] = useState(true);
  const notyf = new Notyf();

  useEffect(() => {
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
        notyf.error('Failed to load movies. Please try again later.');
      });
  }, []);

  const handleCreateMovie = (e) => {
    e.preventDefault();

    // POST request to create a new movie
    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/addMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies([...movies, data]);
        setNewMovie({ title: '', director: '', year: '', description: '' }); 
        notyf.success('Movie added successfully!');
      })
      .catch((error) => {
        console.error("Error creating movie:", error);
        notyf.error('Failed to add movie. Please try again later.');
      });
  };

  return (
    <div className="admin-view">
      <h2>Admin Movie Dashboard</h2>
      <div className="movie-form">
        <h3>Create a New Movie</h3>
        <form onSubmit={handleCreateMovie}>
          <label>Title</label>
          <input
            type="text"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            required
          />
          <label>Director</label>
          <input
            type="text"
            value={newMovie.director}
            onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
            required
          />
          <label>Year</label>
          <input
            type="number"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            required
          />
          <label>Description</label>
          <textarea
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            required
          />
          <button type="submit">Create Movie</button>
        </form>
      </div>

      <h3>Movies List</h3>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
