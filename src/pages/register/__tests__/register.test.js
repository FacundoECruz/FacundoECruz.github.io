/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../index";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { useAuth } from "../../../utils/AuthContext";
// eslint-disable-next-line no-unused-vars
import UploadWidget from "../../../components/UploadWidget";

// const localStorage = {};
// const register = () => {
//   localStorage.user = "usuario";
// };

// jest.doMock("../../edit/ImageWithChangeButton", () => {
//   const MockedUploadImage = "Upload Image Component";
//   return <MockedUploadImage />;
// });

// jest.mock("../../../components/UploadWidget", () => {
//   const MockedUploadWidget = "Upload Widget Component";
//   return <MockedUploadWidget setImageUrl={setImageUrl} cloudinary={jest.fn()} />;
// });
jest.mock("../../../utils/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const registerMock = jest.fn();

describe("Register Component", () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      user: null,
      register: registerMock,
      registerError: null,
    }));

    global.cloudinary = {
      createUploadWidget: jest.fn()
    };

    // eslint-disable-next-line no-unused-vars
    global.cloudinary.createUploadWidget.mockImplementation((options, callback) => {
      return {
        open: jest.fn() 
      };
    });
  });  

  it("renders correctly", () => {
    render(
      <Router>
        <Register useAuth={useAuth} />
      </Router>
    );

    // screen.debug(undefined, Infinity)
    
    const widget = screen.getByTestId("upload-widget")

    expect(
      screen.getByRole("textbox", { name: /usuario/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    // expect(ImageWithChangeButton.mock.calls).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
    expect(widget).toBeInTheDocument()
  });
});
