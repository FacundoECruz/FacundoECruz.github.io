/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../index";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { useAuth } from "../../../utils/AuthContext";
import ImageWithChangeButton from "../../edit/ImageWithChangeButton";

// const localStorage = {};
// const register = () => {
//   localStorage.user = "usuario";
// };

jest.mock("../../edit/ImageWithChangeButton", () => {
  const MockedUploadImage = "Upload Image Component";
  return <MockedUploadImage />;
});

jest.mock("../../../utils/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const registerMock = jest.fn();

describe("Register Component", () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      user: null,
      login: registerMock,
      loginError: null,
    }));
  });

  it("renders correctly", () => {
    render(
      <Router>
        <Register useAuth={useAuth} />
      </Router>
    );

    expect(
      screen.getByRole("textbox", { name: /usuario/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /email/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(ImageWithChangeButton.mock.calls).toHaveLength(1)
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
  });
});
