import React, { useState } from "react";
import { addPost } from "../helpers/user";

function NewPost({ avatar, name, addNewPost }) {
  const today = new Date();
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const date =
    today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

  const textAreaChange = (e) => {
    setContentLength(e.target.value.length);
    setContent(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("lanUser"));
    addPost(user, content);
    addNewPost();
    setContent("");
    setContentLength(0);
  };
  return (
    <div className="post-box">
      <div className="post-header">
        <div className="post-header-left">
          <img src={avatar} alt="Avatar" className="post-avatar" />
        </div>
        <div className="post-header-mid">
          <span className="post-name">{name}</span>
          <br />
          <span className="post-time">{date}</span>
        </div>
        <div className="post-header-right">
          <button
            className="post-btn"
            disabled={contentLength < 10}
            onClick={handleButton}
          >
            Add Post
          </button>
        </div>
      </div>
      <div className="post-content">
        <textarea
          className="post-input"
          rows="5"
          placeholder="Share Your Thoughts..."
          maxLength="250"
          value={content}
          onChange={textAreaChange}
        />
      </div>
      <div className="post-footer">
        <p>{contentLength}/250</p>
      </div>
    </div>
  );
}

export default NewPost;
