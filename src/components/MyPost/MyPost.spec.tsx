import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MyPost } from ".";

jest.mock("axios");

axios.post = jest.fn().mockResolvedValue({});
axios.post = jest.fn().mockRejectedValue(false);

describe("SignUp component", () => {
  it("should render component correctly", () => {
    render(<MyPost refreshPosts={0} setRefreshPosts={() => {}} />);

    expect(screen.getByText("Send post")).toBeTruthy();
  });

  it("should call Segware's API for posting a comment", () => {
    const bodyMock = {
      content: "1234",
    };

    const configMock = {
      headers: {
        authorization: "Bearer undefined",
      },
    };

    render(<MyPost refreshPosts={0} setRefreshPosts={() => {}} />);

    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "1234" } });

    const button = screen.getByTestId("btn-send");
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalledWith(
      "https://segware-book-api.segware.io/api/feed",
      bodyMock,
      configMock
    );
  });

  it("should show toast warn message if user typed less than 1 letters", async () => {
    render(<MyPost refreshPosts={0} setRefreshPosts={() => {}} />);

    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "" } });

    const button = screen.getByTestId("btn-send");
    fireEvent.click(button);

    expect(
      await screen.findByText("Please enter 1 letter at least!")
    ).toBeInTheDocument();
  });

  it("should show toast error message if user get bad response from Segware's API", async () => {
    axios.get = jest.fn().mockRejectedValue(false);
    render(<MyPost refreshPosts={0} setRefreshPosts={() => {}} />);

    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "aaa" } });

    const button = screen.getByTestId("btn-send");
    fireEvent.click(button);

    expect(
      await screen.findByText("something went wrong with posting!")
    ).toBeInTheDocument();
  });
});
