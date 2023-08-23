/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "..";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockUseAuth = () => {
  return {
    user: "mockUser",
    login: jest.fn(),
    loginError: null,
  };
};

describe("Login Component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <Login useAuth={mockUseAuth} />
      </Router>
    );

    expect(
      screen.getByRole("textbox", { name: /username/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ingresar" })
    ).toBeInTheDocument();
  });

  it("submitting the form calls onSubmit with username and password", async () => {
    // const useAuthMock = mockUseAuth();
    const user = "No importa";
    const login = jest.fn();
    const loginError = null;
    const userEventSetup = userEvent.setup();
    render(
      <Router>
        <Login user={user} login={login} loginError={loginError} />
      </Router>
    );

    const username = "Facu";
    const password = "noLaNecesito";

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    await userEventSetup.type(usernameInput, username);
    await userEventSetup.type(passwordInput, password);

    await userEventSetup.click(
      screen.getByRole("button", { name: "Ingresar" })
    );

    expect(login).toHaveBeenCalledWith({
      username,
      password,
    });
    expect(login).toHaveBeenCalledTimes(1);
  });
});
