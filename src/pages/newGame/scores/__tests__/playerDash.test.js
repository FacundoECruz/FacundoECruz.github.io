/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as React from "react";
import PlayerDash from "../components/PlayerDash";
import { render, screen } from "@testing-library/react";
import { types } from "../../../../utils/reducerTypes";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockedPlayer = {
  username: "mockedPlayer",
  score: 0,
  bid: 0,
  bidsLost: 0,
  image: "https://www.cloudinary.com/image",
};

describe("Register Component", () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockClear();
  });

  it("renders correctly", () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={dispatch}
        types={types}
      />
    );

    expect(screen.getByText(/mockedPlayer/i)).toBeInTheDocument();
    expect(screen.getByText(/apuesta/i)).toBeInTheDocument();
    expect(screen.getByText(/pierde/i)).toBeInTheDocument();

    const resetButtons = screen.getAllByText(/reset/i);

    expect(resetButtons).toHaveLength(2);
    resetButtons.forEach((button) => {
      expect(button).toHaveTextContent(/reset/i);
    });

    const bidButton = screen.getByTestId("bid-button");
    const lostButton = screen.getByTestId("lost-button");

    expect(bidButton).toBeInTheDocument();
    expect(bidButton).toHaveAttribute("id", "bid-button");
    expect(lostButton).toBeInTheDocument();
    expect(lostButton).toHaveAttribute("id", "lost-button");
  });

  it("bid button works correctly", async () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={dispatch}
        types={types}
      />
    );

    const user = userEvent.setup();
    const bidButton = screen.getByTestId("bid-button");

    expect(bidButton).toHaveTextContent("0");
    await user.click(bidButton);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: types.addBid, index: 0 });
  });

  it("lost button works correctly", async () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={dispatch}
        types={types}
      />
    );

    const user = userEvent.setup();
    const lostButton = screen.getByTestId("lost-button");

    expect(lostButton).toHaveTextContent("0");
    await user.click(lostButton);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: types.addLost, index: 0 });
  });

  it("reset bid button works correctly", async () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={dispatch}
        types={types}
      />
    );

    const user = userEvent.setup();

    const bidButton = screen.getByTestId("bid-button");
    const resetBidButton = screen.getByTestId("reset-bid");

    expect(bidButton).toHaveTextContent("0");

    await user.click(resetBidButton)

    expect(dispatch).toHaveBeenCalledWith({ type: types.resetBid, index: 0 })
  });

  it("reset lost button works correctly", async () => {
    render(
      <PlayerDash
        player={mockedPlayer}
        index={0}
        dispatch={dispatch}
        types={types}
      />
    );

    const user = userEvent.setup();

    const lostButton = screen.getByTestId("lost-button");
    const resetLostButton = screen.getByTestId("reset-lost");

    expect(lostButton).toHaveTextContent("0");

    await user.click(resetLostButton)

    expect(dispatch).toHaveBeenCalledWith({ type: types.resetLost, index: 0 })
  })
});
