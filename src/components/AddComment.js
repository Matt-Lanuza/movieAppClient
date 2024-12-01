import { useState } from 'react';
import { Notyf } from 'notyf';

export default function AddComment({ movieId, movieTitle }) {
  const [comment, setComment] = useState('');
  const notyf = new Notyf();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      notyf.error('Comment cannot be empty.');
      return;
    }

    // Assume the user is authenticated and we have their token
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You need to be logged in to add a comment.');
      return;
    }

    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/movies/addComment/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          notyf.success('Comment added successfully.');
          setComment('');
        } else {
          notyf.error('Failed to add comment. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
        notyf.error('Failed to add comment. Please try again later.');
      });
  };

  return (
    <div className="add-comment mt-5" style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '15px' }}>{`Add a Comment for ${movieTitle || 'this Movie'}`}</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Your feedback about the movie"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'vertical',
          }}
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
