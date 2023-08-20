/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "..";
import { AuthProvider } from "../../../utils/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

const mockAuthContext = {
  user: "mockUser",
  login: jest.fn(),
  loginError: null,
};

describe("Login Component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <AuthProvider value={mockAuthContext}>
          <Login />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ingresar" })
    ).toBeInTheDocument();
  });
});
