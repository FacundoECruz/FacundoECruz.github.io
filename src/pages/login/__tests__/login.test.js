/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "..";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
// import { AuthProvider } from "../../../utils/AuthContext";
import "@testing-library/jest-dom";

const mockUseAuth = () => {
  return {
    user: null,
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
      screen.getByRole("textbox", { name: /usuario/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ingresar" })
    ).toBeInTheDocument();
  });

  it("submitting the form calls onSubmit with username and password", async () => {
    // Sin usar el mockUseAuth
    // const user = null
    // const login = jest.fn()
    // const loginError = null
    // user={user} login={login} loginError={loginError}

    const _userEvent = userEvent.setup();
    render(
      <Router>
          <Login useAuth={mockUseAuth}/>
      </Router>
    );

    const username = "Facu";
    const password = "noLaNecesito";

    const usernameInput = screen.getByRole("textbox", { name: /usuario/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await _userEvent.type(usernameInput, username);
    await _userEvent.type(passwordInput, password);

    await _userEvent.click(
      screen.getByRole("button", { name: "Ingresar" })
    );

    expect(mockUseAuth().login).toHaveBeenCalledWith({
      username,
      password,
    });
    expect(mockUseAuth().login).toHaveBeenCalledTimes(1);
  });
});
