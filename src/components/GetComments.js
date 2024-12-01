export default function GetComments({ comments }) {
  if (!comments) {
    return null;
  }

  return (
    <div className="get-comments">
      <h4 className="comments-title">Comments:</h4>
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet.</p>
      ) : (
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
      )}
    </div>
  );
}
