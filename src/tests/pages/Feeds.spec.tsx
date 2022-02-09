import { render, screen } from "@testing-library/react";
import axios from "axios";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Feeds, { getServerSideProps } from "../../pages/feeds";

jest.mock("next/router");
jest.mock("cookies");
jest.mock("cookie-cutter");
jest.mock("axios");

const data = {
  posts: [
    {
      id: 1,
      content: "mock",
      likes: 0,
      authorName: "",
    },
  ],
};

describe("Feeds page", () => {
  it("should render page correctly", () => {
    axios.get = jest.fn().mockResolvedValue({});

    render(<Feeds data={data} />);

    expect(screen.getByText("Feed")).toBeInTheDocument();
  });

  it("should redirect user to home page if not logged", async () => {
    const ctx = {
      req: {},
      res: {},
    };

    axios.get = jest.fn().mockResolvedValue({ data: data.posts });

    const response = await getServerSideProps(ctx as GetServerSidePropsContext);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
          permanent: false,
        }),
      })
    );
  });
});
