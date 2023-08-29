/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as React from "react";
import PlayerDash from "../components/PlayerDash";
import { render, screen } from "@testing-library/react";
import { types } from "../../../../utils/reducerTypes";
import '@testing-library/jest-dom'

const mockedPlayer = {
  username: "mockedPlayer",
  score: 0,
  bid: 0,
  bidsLost: 0,
  image: "https://www.cloudinary.com/image",
}

describe("Register Component", () => {
  it("renders correctly", () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={jest.fn()}
        types={types}
      />
    );

    expect(
      screen.getByText(/mockedPlayer/i)
    ).toBeInTheDocument();
  });
});
