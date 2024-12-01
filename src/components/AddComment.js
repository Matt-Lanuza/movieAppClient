import { useState } from 'react';
import { Notyf } from 'notyf';

export default function AddComment({ movieId }) {
  const [comment, setComment] = useState('');
  const notyf = new Notyf();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the comment is not empty
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

    fetch(`https://movie-catalog-systemapi-lanuza.onrender.com/comments/addComment/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentText: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
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
    <div className="add-comment">
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Write your comment here..."
          required
        ></textarea>
        <button type="submit" className="btn btn-primary">Submit Comment</button>
      </form>
    </div>
  );
}
