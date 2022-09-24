import React, { useState } from "react";
import { addPost } from "../helpers/user";
// import Camera from "/camera.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";

function NewPost({ avatar, name, addNewPost }) {
  const today = new Date();
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState("");
  const date = today.toLocaleDateString();

  // Handle text input changes
  const textAreaChange = (e) => {
    setContentLength(e.target.value.length);
    setContent(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("lanUser"));
    addPost(user, content, image);
    addNewPost();
    setContent("");
    setContentLength(0);
    setImage("");
    setImageName("");
  };

  //   handle image input
  const handleInputImage = (e) => {
    let reader = new FileReader();
    reader.onload = function (event) {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    const name = e.target.value.split("\\");
    setImageName(e.target.files[0].name);
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
        <p className="add-image-area">
          <label htmlFor="image-input">
            <Camera className="add-image-icon" />
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleInputImage}
          />
        </p>
        <p>{imageName}</p>
        <p>{contentLength}/250</p>
      </div>
    </div>
  );
}

export default NewPost;
