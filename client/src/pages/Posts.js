import React, { useState } from "react";
import { deletePost, getPosts } from "../helpers/user";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

function Posts() {
  // Get all post from the data structure
  const [posts, setPosts] = useState(getPosts());
  // Logged in user Detail
  const user = JSON.parse(localStorage.getItem("lanUser"));

  // On adding the post update the component state 
  const addNewPost = () => {
    setPosts(getPosts());
  };

  // Delete post by postId and update the component state
  const handleDelete = (postId) => {
    const ans = window.confirm("Do you want to delete the post permanently?");
    if (ans) {
      const posts = deletePost(postId);
      setPosts(posts);
    }
  };
  return (
    <div className="posts">

      {/* Conditional rendering if user is logged in then show New Post */}
      {user && (
        <NewPost
          avatar={user.avatar}
          name={user.name}
          addNewPost={addNewPost}
          showDelete
        />
      )}
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={post.user.name}
            date={post.date}
            content={post.content}
            avatar={post.user.avatar}
            showDelete={user && user.id === post.user.id ? true : false}
            postId={post.id}
            handleDelete={handleDelete}
            comments={post.comments}
            image={post.image}
          />
        );
      })}
    </div>
  );
}

export default Posts;
