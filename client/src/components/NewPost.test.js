import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NewPost from "./NewPost";
import { UserProvider } from "../StateProvider";

// Wrapper over our Testing component
const NewPostWrapper = ({ loggedIn, setLoggedIn, name }) => (
  <BrowserRouter>
    <UserProvider value={[loggedIn, setLoggedIn]}>
      <NewPost name={name} />
    </UserProvider>
  </BrowserRouter>
);

// Testing if all fields are rendering correctly
it("Should Render New Post Correctly", () => {
  const setLoggedIn = jest.fn();
  render(
    <NewPostWrapper loggedIn={false} setLoggedIn={setLoggedIn} name={"AKG"} />
  );
  expect(screen.getByText("Add Post")).toBeInTheDocument();
  expect(screen.getByText("AKG")).toBeInTheDocument();
  expect(screen.getByText("camera.svg")).toBeInTheDocument();
  const post = screen.getByPlaceholderText("Share Your Thoughts...");
  fireEvent.change(post, {
    target: { value: "Testing post content by random sentence" },
  });
  expect(post.value).toBe("Testing post content by random sentence");
  const button = screen.getByTestId("button");
  fireEvent.click(button);
});
