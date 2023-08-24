/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "..";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../../utils/AuthContext";
import "@testing-library/jest-dom";

const localStorage = {};
const login = () => {
  localStorage.user = "usuario"
}

jest.mock("../../../utils/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const loginMock = jest.fn();

describe("Login Component", () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      user: null,
      login: loginMock,
      loginError: null,
    }));
  });

  it("renders correctly", () => {
    render(
      <Router>
        <Login useAuth={useAuth} />
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
    loginMock.mockImplementation(login)
    const _userEvent = userEvent.setup();
    render(
      <Router>
        <Login useAuth={useAuth} />
      </Router>
    );
    const username = "Facu";
    const password = "noLaNecesito";

    const usernameInput = screen.getByRole("textbox", { name: /usuario/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await _userEvent.type(usernameInput, username);
    await _userEvent.type(passwordInput, password);

    await _userEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(loginMock).toHaveBeenCalledWith({
      username,
      password,
    });
    expect(loginMock).toHaveBeenCalledTimes(1);
  });
});
