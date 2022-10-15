import React, { useRef, useState } from "react";
// import Camera from "/camera.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  const reactQuillRef = useRef();
  // Handle text input changes
  const textAreaChange = (e) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    setContentLength(unprivilegedEditor.getLength());
    setContent(e);
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
    // console.log(content);
  };

  //   handle image input
  const handleInputImage = (e) => {
    // console.log(e.target.files[0].name);
    setImageName(e.target.files[0].name);
    setImage(e.currentTarget.files[0]);
  };

  const checkCharacterCount = (event) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    if (unprivilegedEditor.getLength() > 600 && event.key !== "Backspace")
      event.preventDefault();
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
            data-testid="button"
          >
            Add Post
          </button>
        </div>
      </div>
      <div className="post-content">
        <ReactQuill
          theme="snow"
          value={content}
          ref={reactQuillRef}
          placeholder={"Share Your Thoughts..."}
          onChange={textAreaChange}
          onKeyDown={checkCharacterCount}
          style={{
            height: "180px",
          }}
        />
        {/* <textarea
          className="post-input"
          rows="5"
          placeholder="Share Your Thoughts..."
          maxLength="600"
          value={content}
          onChange={textAreaChange}
        /> */}
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
