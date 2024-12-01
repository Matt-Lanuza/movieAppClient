import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Notyf } from 'notyf';
import GetComments from '../components/GetComments';
import AddComment from '../components/AddComment';

const notyf = new Notyf();

export default function MovieDetails() {
  const { id } = useParams();  // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // Track comments here

  // Fetch movie details and comments
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

    // Fetch comments for the movie
    const fetchComments = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/getComments/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.comments) {
            setComments(data.comments); 
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    };

    fetchComments();
  }, [id]); // No need to include fetchComments in the dependency array

  // Callback to handle adding a new comment and updating the list
  const handleNewComment = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/getComments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.comments) {
          setComments(data.comments); // Update comments
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

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

          {/* Add Comment Form */}
          <AddComment movieId={id} movieTitle={movie.title} onNewComment={handleNewComment} />

          {/* Display Comments */}
          <GetComments comments={comments} /> {/* Pass comments as prop */}

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
