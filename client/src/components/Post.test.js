import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Post from "./Post";
import { UserProvider } from "../StateProvider";

// Wrapper over our Testing component
const PostWrapper = ({
  loggedIn,
  setLoggedIn,
  handleDownVote,
  handleUpVote,
  postId,
}) => (
  <BrowserRouter>
    <UserProvider value={[loggedIn, setLoggedIn]}>
      <Post
        comments={[]}
        handleUpVote={handleUpVote}
        handleDownVote={handleDownVote}
      />
    </UserProvider>
  </BrowserRouter>
);

// Testing if upvote and downvote calling correct functions
it("Should Render Post Correctly", () => {
  const setLoggedIn = jest.fn();
  const handleUpVote = jest.fn();
  const handleDownVote = jest.fn();
  render(
    <PostWrapper
      loggedIn={true}
      setLoggedIn={setLoggedIn}
      name={"AKG"}
      handleUpVote={handleUpVote}
      handleDownVote={handleDownVote}
      postId={1234}
    />
  );
  fireEvent.click(screen.getByText("arrow_upward"));
  expect(handleUpVote).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByText("arrow_downward"));
  expect(handleDownVote).toHaveBeenCalledTimes(1);
});
