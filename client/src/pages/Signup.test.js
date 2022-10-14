import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { UserProvider } from "../StateProvider";

// Fields that are going to render
const inputFields = [
  { type: "name", name: "name", placeholder: "Name..." },
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

// Wrapper over our Testing component
const SignupWrapper = ({ loggedIn, setLoggedIn }) => (
  <BrowserRouter>
    <UserProvider value={[loggedIn, setLoggedIn]}>
      <Signup />
    </UserProvider>
  </BrowserRouter>
);

// Testing if all fields are rendering correctly
it("Should Render Signup Form", () => {
  const setLoggedIn = jest.fn();
  render(<SignupWrapper loggedIn={false} setLoggedIn={setLoggedIn} />);
  const name = screen.getByPlaceholderText("Name...");
  const email = screen.getByPlaceholderText("Email Id...");
  const password = screen.getByPlaceholderText("Password...");
  const button = screen.getByDisplayValue("Submit");
  expect(screen.getByText("Signup")).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

// User should be able to edit the input fields
it("Should be able to change values", () => {
  const setLoggedIn = jest.fn();
  render(<SignupWrapper loggedIn={false} setLoggedIn={setLoggedIn} />);
  const name = screen.getByPlaceholderText("Name...");
  const email = screen.getByPlaceholderText("Email Id...");
  const password = screen.getByPlaceholderText("Password...");
  const button = screen.getByDisplayValue("Submit");
  fireEvent.change(name, { target: { value: "yolo" } });
  fireEvent.change(email, { target: { value: "a@a.a" } });
  fireEvent.change(password, { target: { value: "Ajdnsa@ds" } });

  expect(name.value).not.toBe("a@a.a");
  expect(email.value).toBe("a@a.a");
  expect(password.value).toBe("Ajdnsa@ds");
});

// User should not be able to submit form until the password is strong
it("Should show alert if password is not strong", () => {
  const setLoggedIn = jest.fn();
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  render(<SignupWrapper loggedIn={false} setLoggedIn={setLoggedIn} />);
  const name = screen.getByPlaceholderText("Name...");
  const email = screen.getByPlaceholderText("Email Id...");
  const password = screen.getByPlaceholderText("Password...");
  const button = screen.getByDisplayValue("Submit");
  fireEvent.change(name, { target: { value: "yolo" } });
  fireEvent.change(email, { target: { value: "a@a.a" } });
  fireEvent.change(password, { target: { value: "Ajdnsa @ds" } });
  fireEvent.click(button);
  expect(alertMock).toHaveBeenCalledTimes(1);
});
