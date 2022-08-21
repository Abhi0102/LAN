import React, { useState } from "react";
import { getPosts } from "../helpers/user";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

function Home() {
  const [posts, setPosts] = useState(getPosts());
  const user = JSON.parse(localStorage.getItem("lanUser"));
  const addNewPost = () => {
    setPosts(getPosts());
  };
  return (
    <div className="posts">
      {user && (
        <NewPost
          avatar={user.avatar}
          name={user.name}
          addNewPost={addNewPost}
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
          />
        );
      })}
    </div>
  );
}

export default Home;
