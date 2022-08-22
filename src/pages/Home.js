import React, { useState } from "react";
import { deletePost, getPosts } from "../helpers/user";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

function Home() {
  const [posts, setPosts] = useState(getPosts());
  // const [showDelete, setShowDelete] = useState(false);
  const user = JSON.parse(localStorage.getItem("lanUser"));

  const addNewPost = () => {
    setPosts(getPosts());
  };

  const handleDelete = (postId) => {
    const ans = window.confirm("Do you want to delete the post permanently?");
    if (ans) {
      const posts = deletePost(postId);
      setPosts(posts);
    }
  };
  return (
    <div className="posts">
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
          />
        );
      })}
    </div>
  );
}

export default Home;
