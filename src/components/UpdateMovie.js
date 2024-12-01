import { useState } from 'react';
import { Notyf } from 'notyf';

export default function UpdateMovie({ movie, refreshMovies }) {
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(movie.year);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notyf = new Notyf();

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'director') setDirector(value);
    if (name === 'year') setYear(value);
    if (name === 'description') setDescription(value);
    if (name === 'genre') setGenre(value);
  };

  // Handle the update operation
  const handleUpdate = () => {
    setLoading(true);
    const updatedMovie = {
      title,
      director,
      year,
      description,
      genre,
    };

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('Authentication token is missing. Please log in.');
      setLoading(false);
      return;
    }

    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/updateMovie/${movie._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update response:', data);
        if (data.message === 'Movie updated successfully') {
          notyf.success('Movie updated successfully!');
          refreshMovies();
          setIsModalOpen(false);
        } else {
          notyf.error('Failed to update movie. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
        notyf.error('Failed to update movie. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Manually trigger modal opening */}
      <button className="btn btn-warning" onClick={() => setIsModalOpen(true)}>
        Update
      </button>

      {/* Modal for updating movie */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">Update Movie</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)} 
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="director" className="form-label">Director</label>
                    <input
                      type="text"
                      className="form-control"
                      id="director"
                      name="director"
                      value={director}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="year"
                      name="year"
                      value={year}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="genre"
                      name="genre"
                      value={genre}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
