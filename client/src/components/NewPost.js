import React, { useState } from "react";
import { addPost } from "../helpers/user";
// import Camera from "/camera.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";
import axios from "axios";
import { toast } from "react-toastify";

function NewPost({ avatar, name, addNewPost }) {
  const today = new Date();
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const date = today.toLocaleDateString();

  // Handle text input changes
  const textAreaChange = (e) => {
    setContentLength(e.target.value.length);
    setContent(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "/api/v1/post/add-post",
        {
          content,
          image,
        },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((response) => {
        addNewPost(response.data.post);
        setContent("");
        setContentLength(0);
        setImage("");
        setImageName("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error Occured");
        setIsLoading(false);
      });
    // const user = JSON.parse(localStorage.getItem("lanUser"));
    // addPost(user, content, image);
    // addNewPost();
    // setContent("");
    // setContentLength(0);
    // setImage("");
    // setImageName("");
  };

  //   handle image input
  const handleInputImage = (e) => {
    // console.log(e.target.files[0].name);
    setImageName(e.target.files[0].name);
    setImage(e.currentTarget.files[0]);
    // const data = new FormData(e.currentTarget);
    // console.log(e.currentTarget.files[0]);
    // let reader = new FileReader();
    // reader.onload = function (event) {
    //   setImage(event.target.result);
    // };
    // reader.readAsDataURL(e.target.files[0]);
    // const name = e.target.value.split("\\");
    // setImageName(e.target.files[0].name);
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
            disabled={contentLength < 10 || isLoading}
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
          maxLength="600"
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
        <p>{contentLength}/600</p>
      </div>
    </div>
  );
}

export default NewPost;
