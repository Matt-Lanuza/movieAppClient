import { Notyf } from 'notyf';

export default function DeleteMovie({ movieId, movies, setMovies }) {
  const notyf = new Notyf();

  const handleDeleteMovie = () => {
    console.log("Deleting movie with ID:", movieId); // Log movie ID for debugging

    if (window.confirm('Are you sure you want to delete this movie?')) {
      fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/deleteMovie/${movieId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete movie');
          }
          return response.json();
        })
        .then(() => {
          // Use filter() to remove the deleted movie from the local state
          const updatedMovies = movies.filter((movie) => movie._id !== movieId);
          setMovies(updatedMovies);
          notyf.success('Movie deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
          notyf.error('Failed to delete the movie. Please try again later.');
        });
    }
  };

  return (
    <button onClick={handleDeleteMovie} className="btn btn-danger">
      Delete
    </button>
  );
}
