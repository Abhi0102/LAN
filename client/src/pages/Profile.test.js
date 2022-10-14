import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import { UserProvider } from "../StateProvider";

// Wrapper over our Testing component
const ProfileWrapper = ({ loggedIn, setLoggedIn }) => (
  <BrowserRouter>
    <UserProvider value={[loggedIn, setLoggedIn]}>
      <Profile />
    </UserProvider>
  </BrowserRouter>
);

const testUser = {
  id: 4,
  name: "Akg",
  email: "a@a.a",
  joinedOn: "2022-09-24T17:48:31.000Z",
  avatar: "/avatar.png",
  createdAt: "2022-09-24T17:48:31.000Z",
  updatedAt: "2022-09-25T12:46:48.000Z",
};

describe("Test", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => JSON.stringify(testUser)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });
  it("Should Render Profile Correctly", () => {
    const setLoggedIn = jest.fn();
    render(<ProfileWrapper loggedIn={true} setLoggedIn={setLoggedIn} />);
    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByText(testUser.email)).toBeInTheDocument();
  });

  it("Should be able to edit name when clicked on edit button", () => {
    const setLoggedIn = jest.fn();
    render(<ProfileWrapper loggedIn={true} setLoggedIn={setLoggedIn} />);
    const editButton = screen.getAllByAltText("edit")[0];
    expect(editButton).toBeInTheDocument();
    expect(screen.queryByTestId("hidden-input")).toBeFalsy();
    fireEvent.click(editButton);
    expect(screen.queryByTestId("hidden-input")).toBeTruthy();
  });
});
