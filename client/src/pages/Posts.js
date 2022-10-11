import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../helpers/user";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import axios from "axios";
import { toast } from "react-toastify";
import User from "../components/User";

function Posts() {
  // Get all post from the data structure
  const [posts, setPosts] = useState();
  // Logged in user Detail
  const user = JSON.parse(localStorage.getItem("lanUser"));

  const addCurrentUserReaction = (posts) => {
    posts.map((post) => {
      if (user) {
        if (!post.reactions.length) {
          post.currentUserReaction = 0;
        }
        for (let reaction of post.reactions) {
          // console.log(reaction);
          if (reaction.userId === user.id) {
            post.currentUserReaction = reaction.reaction;
            break;
          } else {
            post.currentUserReaction = 0;
          }
        }
      }
    });
    setPosts([...posts]);
  };

  useEffect(() => {
    axios.get("/api/v1/post/get-posts").then((response) => {
      addCurrentUserReaction(response.data.posts);
    });
  }, []);
  const addNewPost = (post) => {
    const newPosts = [{ ...post, reactionSum: 0 }, ...posts];
    setPosts(newPosts);
  };

  // Delete post by postId and update the component state
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

  const handleUpVote = (postId) => {
    axios
      .post("/api/v1/post/upvote", { postId })
      .then((res) => {
        let reactionValue = res.data.sumReaction;
        const newPost = posts;
        newPost.map((post) => {
          if (post.id === postId) {
            post.reactionSum = reactionValue;
            post.reactions = res.data.newReactions;
          }
        });
        // setPosts([...newPost]);
        addCurrentUserReaction(newPost);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Something went wrong..");
      });
  };

  const handleDownVote = (postId) => {
    axios
      .post("/api/v1/post/downvote", { postId })
      .then((res) => {
        let reactionValue = res.data.sumReaction;
        const newPost = posts;
        newPost.map((post) => {
          if (post.id === postId) {
            post.reactionSum = reactionValue;
            post.reactions = res.data.newReactions;
          }
        });
        // setPosts([...newPost]);
        addCurrentUserReaction(newPost);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong..");
      });
  };
  // console.log(posts);
  return (
    <div className="posts-container">
      <div className={user ? "posts-login" : "posts"}>
        {/* Conditional rendering if user is logged in then show New Post */}
        {user && (
          <NewPost
            avatar={user.avatar}
            name={user.name}
            addNewPost={addNewPost}
            showDelete
          />
        )}
        {posts &&
          posts.map((post) => {
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
                imageId={post.imageId}
                reactionSum={post.reactionSum}
                handleUpVote={handleUpVote}
                handleDownVote={handleDownVote}
                currentUserReaction={post.currentUserReaction}
              />
            );
          })}
      </div>
      {user && (
        // <div>
        <User />
        // </div>
      )}
    </div>
  );
}

export default Posts;
