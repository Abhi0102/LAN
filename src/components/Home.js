import React from "react";
import { getPosts } from "../helpers/user";
import Post from "./Post";

function Home() {
  const posts = getPosts();
  return (
    <div className="posts">
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
