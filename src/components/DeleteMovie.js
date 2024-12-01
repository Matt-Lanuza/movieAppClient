import { useState } from 'react';
import { Notyf } from 'notyf';

export default function DeleteMovie({ movieId, removeMovieFromList, refreshMovies }) {
  const [loading, setLoading] = useState(false);
  const notyf = new Notyf();

  const token = localStorage.getItem('token'); 

  // Handle the delete operation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setLoading(true);
      fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/deleteMovie/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Delete response:', data);
          if (data.message === 'Movie deleted successfully') {
            notyf.success('Movie deleted successfully!');
            removeMovieFromList(movieId);
            refreshMovies();
          } else {
            notyf.error('Failed to delete movie. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
          notyf.error('Failed to delete movie. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <button 
      className="btn btn-danger" 
      onClick={handleDelete} 
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
