import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { Feed } from ".";

jest.mock("axios");

axios.post = jest.fn().mockResolvedValue({});
axios.post = jest.fn().mockRejectedValue(false);

describe("SignUp component", () => {
  const post = {
    id: 1,
    content: "mock",
    likes: 0,
    authorName: "fake",
  };

  it("should render component correctly", () => {
    render(<Feed post={post} refreshPosts={0} setRefreshPosts={() => {}} />);

    expect(screen.getByText("mock")).toBeTruthy();
  });

  it("should call Segware's API for up voting a comment", () => {
    const bodyMock = {
      feedId: 1,
      like: true,
      love: true,
    };

    const configMock = {
      headers: {
        authorization: "Bearer undefined",
      },
    };

    render(<Feed post={post} refreshPosts={0} setRefreshPosts={() => {}} />);

    const button = screen.getByTestId("btn-upvote");
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalledWith(
      "https://segware-book-api.segware.io/api/reaction",
      bodyMock,
      configMock
    );
  });

  it("should show toast error message if user get bad response from Segware's API", async () => {
    render(<Feed post={post} refreshPosts={0} setRefreshPosts={() => {}} />);

    const button = screen.getByTestId("btn-upvote");
    fireEvent.click(button);

    expect(
      await screen.findByText("something went wrong with up voting!")
    ).toBeInTheDocument();
  });
});
