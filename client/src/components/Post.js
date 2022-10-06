import React, { useState } from "react";
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
}) {
  const newDate = new Date(date).toLocaleDateString();

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
        {content}
      </div>
      <div>
        <Comments comments={comments} postId={postId} />
      </div>
    </div>
  );
}

export default Post;
