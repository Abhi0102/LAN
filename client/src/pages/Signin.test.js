import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Signin from "./Signin";
import { UserProvider } from "../StateProvider";

// Fields that are going to render
const inputFields = [
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

// Wrapper over our Testing component
const SigninWrapper = ({ loggedIn, setLoggedIn }) => (
  <BrowserRouter>
    <UserProvider value={[loggedIn, setLoggedIn]}>
      <Signin />
    </UserProvider>
  </BrowserRouter>
);

// Testing if all fields are rendering correctly
it("Should Render Signin Form", () => {
  const setLoggedIn = jest.fn();
  render(<SigninWrapper loggedIn={false} setLoggedIn={setLoggedIn} />);
  const email = screen.getByPlaceholderText("Email Id...");
  const password = screen.getByPlaceholderText("Password...");
  const button = screen.getByDisplayValue("Submit");
  expect(screen.getByText("Signin")).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  fireEvent.change(email, { target: { value: "s" } });
  fireEvent.change(password, { target: { value: "sd" } });
  fireEvent.click(button);
  expect(email.value).toBe("s");
  expect(screen.getByText("Signin")).toBeInTheDocument();
});

// User should be able to edit the input fields
it("Should be able to change values", () => {
  const setLoggedIn = jest.fn();
  render(<SigninWrapper loggedIn={false} setLoggedIn={setLoggedIn} />);
  const email = screen.getByPlaceholderText("Email Id...");
  const password = screen.getByPlaceholderText("Password...");
  const button = screen.getByDisplayValue("Submit");
  fireEvent.change(email, { target: { value: "a@a.a" } });
  fireEvent.change(password, { target: { value: "Ajdnsa@ds" } });
  fireEvent.click(button);
  expect(email.value).toBe("a@a.a");
  expect(password.value).toBe("Ajdnsa@ds");
  expect(screen.getByText("Signin")).toBeInTheDocument();
});
