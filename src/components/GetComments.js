import { useState, useEffect } from 'react';

export default function GetComments({ movieId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Or get token from another source like Context API

    if (!token) {
      setError('You must be logged in to view comments.');
      setLoading(false);
      return;
    }

    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/getComments/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched comments:", data);
        setComments(data.comments); // Assuming comments array is directly available
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError('Failed to load comments. Please try again later.');
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div className="get-comments">
      <h4 className="comments-title">Comments:</h4>
      {loading ? (
        <p className="loading-message">Loading comments...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <span className="comment-user"><strong>{comment.userId}</strong></span>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-comments">No comments yet.</p>
      )}
    </div>
  );
}
