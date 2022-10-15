import React, { useContext, useState } from "react";
import UserContext from "../StateProvider";
import Comments from "./Comments";
// import { Buffer } from "buffer";

function Post({
  avatar,
  name,
  date,
  content,
  postId,
  showDelete,
  handleDelete,
  comments,
  image,
  imageId,
  reactionSum,
  handleUpVote,
  handleDownVote,
  currentUserReaction,
}) {
  const newDate = new Date(date).toLocaleDateString();
  const [loggedIn] = useContext(UserContext);
  return (
    <div className="post-box">
      <div className="post-header">
        <div className="post-header-left">
          <img src={avatar} alt="Avatar" className="post-avatar" />
        </div>
        <div className="post-header-mid">
          <span className="post-name">{name}</span>
          <br />
          <span className="post-time">{newDate}</span>
        </div>
        {showDelete && (
          <div className="post-header-right">
            <img
              src="/delete.png"
              alt="Delete"
              className="post-delete-btn"
              onClick={() => handleDelete(postId, imageId)}
            />
          </div>
        )}
      </div>
      <div className="post-content">
        {image && <img src={image} className="post-image" />}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      {loggedIn && (
        <div className="post-reactions">
          <div
            className={`material-symbols-outlined post-reaction-item ${
              currentUserReaction === 1 && "reaction-red"
            }`}
            onClick={() => handleUpVote(postId)}
          >
            arrow_upward
          </div>
          <div
            className={`post-reaction-item ${
              currentUserReaction && "reaction-red"
            }`}
          >
            {reactionSum}
          </div>
          <div
            className={`material-symbols-outlined post-reaction-item ${
              currentUserReaction === -1 && "reaction-red"
            }`}
            onClick={() => handleDownVote(postId)}
          >
            arrow_downward
          </div>
        </div>
      )}
      <div>
        <Comments comments={comments} postId={postId} />
      </div>
    </div>
  );
}

export default Post;
