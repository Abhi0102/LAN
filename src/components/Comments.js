import React, { useContext, useState } from "react";
import { addComment, deleteComment } from "../helpers/user";
import UserContext from "../StateProvider";

function Comment({
  avatar,
  userName,
  comment,
  showDelete,
  postId,
  commentId,
  handleDelete,
}) {
  return (
    <div className="single-comment">
      <div className="single-comment-header">
        <img src={avatar} alt="Avatar" className="comment-avatar" />
        <span>{userName}</span> &nbsp; &nbsp;
        {showDelete && (
          <img
            src="/delete.png"
            alt="Delete"
            className="comment-delete-btn"
            onClick={() => handleDelete(postId, commentId)}
          />
        )}
      </div>
      <div className="comment-content">
        <span>{comment}</span>
      </div>
    </div>
  );
}

function Comments({ comments, postId }) {
  const [allComments, setAllComments] = useState(comments);
  //   console.log(allComments);
  const user = JSON.parse(localStorage.getItem("lanUser"));
  const [comment, setComment] = useState("");
  const [loggedIn] = useContext(UserContext);
  const handleSubmit = () => {
    setAllComments(addComment(postId, user, comment));
    setComment("");
  };

  const handleDelete = (postId, commentId) => {
    const ans = window.confirm("Do you want to delete the comment?");
    if (ans) {
      setAllComments(deleteComment(postId, commentId));
    }
  };
  return (
    <div className="comment-section">
      {loggedIn ? (
        <div className="comment-header">
          <input
            className="comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="100"
          />
          <button
            className="comment-btn"
            disabled={!comment.length}
            onClick={handleSubmit}
          >
            Comment
          </button>
        </div>
      ) : null}
      <div className="comment-content-section">
        {allComments.length ? (
          allComments.map((comment) => {
            let showDelete = false;
            if (loggedIn) {
              showDelete = comment.user.id === user.id;
            }
            return (
              <Comment
                key={comment.commentId}
                avatar={comment.user.avatar}
                userName={comment.user.name}
                comment={comment.content}
                postId={postId}
                commentId={comment.commentId}
                showDelete={showDelete}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Comments;
