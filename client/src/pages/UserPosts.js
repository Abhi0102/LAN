import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Post from "../components/Post";
function UserPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/v1/post/get-user-post/${id}`)
      .then((res) => setPosts(res.data.posts))
      .catch((err) => {
        toast.error(err.response.data.error);
        navigate("/posts");
      });
  }, [posts]);

  const handleDelete = (postId, imageId) => {
    const ans = window.confirm("Do you want to delete the post permanently?");
    if (ans) {
      axios
        .post("/api/v1/post/delete-post", { postId, imageId })
        .then((res) => {
          const newPosts = posts.filter((ele) => ele.id !== postId);
          setPosts(newPosts);
        })
        .catch((error) => toast.error("Some error occured."));
      // const posts = deletePost(postId);
      // setPosts(posts);
    }
  };
  return (
    <div className="posts-container">
      <div className="posts">
        {posts.length ? (
          posts.map((post) => {
            return (
              <Post
                key={post.id}
                name={post.user.name}
                date={post.date}
                content={post.content}
                avatar={post.user.avatar}
                showDelete={true}
                postId={post.id}
                handleDelete={handleDelete}
                comments={post.comments}
                image={post.image}
                imageId={post.imageId}
              />
            );
          })
        ) : (
          <div className="no-post-div">No Posts to show.</div>
        )}
      </div>
    </div>
  );
}

export default UserPosts;
