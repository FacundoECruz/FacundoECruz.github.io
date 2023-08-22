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

  it("submitting the form calls onSubmit with username and password", () => {
    const useAuthMock = mockUseAuth();
    render(
      <Router>
        <Login useAuth={mockUseAuth} />
      </Router>
    );

    const username = "Facu";
    const password = "noLaNecesito";

    userEvent.type(
      screen.getByRole("textbox", { name: /username/i }),
      username
    );
    userEvent.type(screen.getByTestId("password"), password);
    userEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(useAuthMock.login).toHaveBeenCalledWith({
      username,
      password,
    });
    expect(useAuthMock.login).toHaveBeenCalledTimes(1);
  });
});
