import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { addComment, deleteComment } from "../helpers/user";
import UserContext from "../StateProvider";

// Single Comment
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

// All Comments
function Comments({ comments, postId }) {
  const [allComments, setAllComments] = useState(comments);
  //   console.log(allComments);
  const user = JSON.parse(localStorage.getItem("lanUser"));
  const [comment, setComment] = useState("");
  const [loggedIn] = useContext(UserContext);
  const handleSubmit = () => {
    axios
      .post("/api/v1/post/add-comment", { postId, user, comment })
      .then((resp) => {
        setAllComments([resp.data.comment, ...allComments]);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Some error occured.");
      });
    // setAllComments(addComment(postId, user, comment));
    // setComment("");
  };

  //   Delete Comment by commentId
  const handleDelete = (postId, commentId) => {
    const ans = window.confirm("Do you want to delete the comment?");
    if (ans) {
      axios
        .post("/api/v1/post/delete-comment", { postId, commentId })
        .then((response) => {
          const newComments = comments.filter(
            (ele) => ele.commentId !== commentId
          );
          setAllComments(newComments);
        });
      // setAllComments(deleteComment(postId, commentId));
    }
  };

  //   If not logged in and there are no comments then show nothing else show comment section
  return !loggedIn && comments.length === 0 ? (
    <></>
  ) : (
    <div className="comment-section">
      {/* If Logged in then show comment input else nothing */}
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
              // Single Comment
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
