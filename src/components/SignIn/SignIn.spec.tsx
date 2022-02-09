import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { SignIn } from ".";

jest.mock("next/router");
jest.mock("axios");

axios.post = jest.fn().mockResolvedValue({});
axios.post = jest.fn().mockRejectedValue(false);

describe("SigIn component", () => {
  it("should call Segware's API", async () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<SignIn showForgotPassword={() => {}} showSignup={() => {}} />);

    const button = screen.getByTestId("btn-login");
    fireEvent.click(button);

    await expect(axios.post).toHaveBeenCalledWith(
      "https://segware-book-api.segware.io/api/sign-in",
      { password: "", username: "" }
    );
  });

  it("should call function showForgotPassword", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    const forgotPasswordMock = jest.fn();

    render(
      <SignIn showForgotPassword={forgotPasswordMock} showSignup={() => {}} />
    );

    const button = screen.getByTestId("btn-open-forgot-password");
    fireEvent.click(button);

    expect(forgotPasswordMock).toHaveBeenCalled();
  });

  it("should call function showSignup", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    const signUpMock = jest.fn();

    render(<SignIn showForgotPassword={() => {}} showSignup={signUpMock} />);

    const button = screen.getByTestId("btn-open-signup");
    fireEvent.click(button);

    expect(signUpMock).toHaveBeenCalled();
  });

  it("should show toast error message if user get bad response from Segware's API", async () => {
    const pushMock = jest.fn();
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<SignIn showForgotPassword={() => {}} showSignup={() => {}} />);

    const button = screen.getByTestId("btn-open-signup");
    fireEvent.click(button);

    expect(
      await screen.findByText("The username or password is incorrect!")
    ).toBeInTheDocument();
  });
});
