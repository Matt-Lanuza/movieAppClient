import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function MovieDetails() {
  const { id } = useParams();  // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const notyf = new Notyf();

  useEffect(() => {
    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/getMovie/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMovie(data); 
        } else {
          console.error("Movie data is missing:", data);
          notyf.error('Failed to load movie details. Please try again later.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
        notyf.error('Failed to load movie details. Please try again later.');
      });
  }, [id]);

  return (
    <div className="movie-details">
      {loading ? (
        <p>Loading movie details...</p>
      ) : movie ? (
        <>
          <h3>{movie.title}</h3>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </>
      ) : (
        <p>Movie not found.</p>
      )}
      <div className="text-center mt-3">
        <p>
          <a href="/movies">Return to movie list</a>
        </p>
      </div>
    </div>


  );
}
