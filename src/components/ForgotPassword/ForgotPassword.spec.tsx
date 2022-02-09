import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { toast } from "react-toastify";
import { ForgotPassword } from ".";

jest.mock("axios");
axios.get = jest.fn().mockRejectedValue({});

describe("SignUp component", () => {
  it("should call Segware's API for signing up user", () => {
    const signInMock = jest.fn();
    render(<ForgotPassword showSignIn={signInMock} />);

    const input = screen.getByTestId("input-username");
    fireEvent.change(input, { target: { value: "mock" } });

    const button = screen.getByTestId("btn-recover");
    fireEvent.click(button);

    expect(axios.get).toHaveBeenCalledWith(
      "https://segware-book-api.segware.io/api/forgot-password/mock"
    );
  });

  it("should show toast warn message if user typed less than 2 letters", async () => {
    const signInMock = jest.fn();
    render(<ForgotPassword showSignIn={signInMock} />);

    const input = screen.getByTestId("input-username");
    fireEvent.change(input, { target: { value: "m" } });

    const button = screen.getByTestId("btn-recover");
    fireEvent.click(button);

    expect(
      await screen.findByText("Please enter 2 letters at least!")
    ).toBeInTheDocument();
  });

  it("should call function showSignIn()", () => {
    const signInMock = jest.fn();
    render(<ForgotPassword showSignIn={signInMock} />);

    const button = screen.getByTestId("btn-show-signin");
    fireEvent.click(button);

    expect(signInMock).toHaveBeenCalled();
  });
});
