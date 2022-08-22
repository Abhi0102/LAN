import React, { useState } from "react";

function Post({
  avatar,
  name,
  date,
  content,
  postId,
  showDelete,
  handleDelete,
}) {
  const newDate = new Date(date).toLocaleDateString();
  console.log(showDelete);
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
              onClick={() => handleDelete(postId)}
            />
          </div>
        )}
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
}

export default Post;
