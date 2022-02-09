import { screen, render, fireEvent, getByTestId } from "@testing-library/react";
import { Login } from ".";

describe("Login component", () => {
  it("should call function showSignIn()", () => {
    const showSignInMock = jest.fn();
    render(<Login />);

    const button = screen.getByTestId("btn-show-signin");
    button.addEventListener("click", showSignInMock);
    fireEvent.click(button);

    expect(showSignInMock).toBeCalled();
  });
});

describe("Login component - SignIn", () => {
  it("should render SignIn component correctly", () => {
    render(<Login />);

    expect(screen.getByTestId("btn-login")).toBeInTheDocument();
  });
});

describe("Login component - SignUp", () => {
  it("should render SignUn component correctly", () => {
    render(<Login />);

    const buttonSignUp = screen.getByTestId("btn-open-signup");

    fireEvent.click(buttonSignUp);

    expect(screen.getByTestId("btn-signup")).toBeInTheDocument();
  });
});

describe("Login component - ForgotPassword", () => {
  it("should render SignUn component correctly", () => {
    render(<Login />);

    const buttonSignUp = screen.getByTestId("btn-open-forgot-password");

    fireEvent.click(buttonSignUp);

    expect(screen.getByTestId("btn-recover")).toBeInTheDocument();
  });
});
