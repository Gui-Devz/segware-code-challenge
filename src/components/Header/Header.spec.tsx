import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { Header } from ".";

jest.mock("next/router");

describe("SignUp component", () => {
  it("should redirect to home page if user clicks in logout button", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<Header />);

    const button = screen.getByTestId("btn-logout");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
