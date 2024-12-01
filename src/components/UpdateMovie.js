// UpdateMovie.js
import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

export default function UpdateMovie({ movie, refreshMovies, handleClose }) {
  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const notyf = new Notyf();

  useEffect(() => {
    setUpdatedMovie(movie); // Reset to initial movie data when modal is opened
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/updateMovie/${updatedMovie._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMovie),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        refreshMovies(); // Refresh movie list after update
        handleClose(); // Close the modal
        notyf.success('Movie updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
        notyf.error('Failed to update the movie. Please try again later.');
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Movie</h3>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedMovie.title}
          onChange={handleChange}
        />
        <label>Director:</label>
        <input
          type="text"
          name="director"
          value={updatedMovie.director}
          onChange={handleChange}
        />
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={updatedMovie.year}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedMovie.description}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
}
