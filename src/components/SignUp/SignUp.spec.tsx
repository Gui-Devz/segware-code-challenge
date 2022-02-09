import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { SignUp } from ".";

jest.mock("axios");
axios.post = jest.fn().mockResolvedValue({});
axios.post = jest.fn().mockRejectedValue(false);

describe("SignUp component", () => {
  it("should call Segware's API for signing up user", async () => {
    const signInMock = jest.fn();
    render(<SignUp showSignIn={signInMock} />);

    const button = screen.getByTestId("btn-signup");
    fireEvent.click(button);

    await expect(axios.post).toHaveBeenCalledWith(
      "https://segware-book-api.segware.io/api/sign-up",
      { password: "", username: "" }
    );
  });

  it("should call function showSignIn()", () => {
    const signInMock = jest.fn();
    render(<SignUp showSignIn={signInMock} />);

    const button = screen.getByTestId("btn-show-signin");
    fireEvent.click(button);

    expect(signInMock).toHaveBeenCalled();
  });

  it("should show toast error message if passwords are different from each other", async () => {
    render(<SignUp showSignIn={() => {}} />);

    const password = screen.getByTestId("password");
    fireEvent.change(password, { target: { value: "ab" } });
    const passwordConfirm = screen.getByTestId("password-confirm");
    fireEvent.change(passwordConfirm, { target: { value: "a" } });

    const button = screen.getByTestId("btn-signup");
    fireEvent.click(button);

    expect(
      await screen.findByText("Passwords do not match!")
    ).toBeInTheDocument();
  });

  it("should show toast success message if creating account was successful", async () => {
    axios.post = jest.fn().mockResolvedValue(true);
    render(<SignUp showSignIn={() => {}} />);

    const username = screen.getByTestId("username");
    fireEvent.change(username, { target: { value: "abc" } });
    const password = screen.getByTestId("password");
    fireEvent.change(password, { target: { value: "ab" } });
    const passwordConfirm = screen.getByTestId("password-confirm");
    fireEvent.change(passwordConfirm, { target: { value: "ab" } });

    const button = screen.getByTestId("btn-signup");
    fireEvent.click(button);

    expect(await screen.findByText("Account registered!")).toBeInTheDocument();
  });
});
