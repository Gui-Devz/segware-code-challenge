import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home page - index", () => {
  it("should render correctly", () => {
    render(<Home />);

    expect(
      screen.getByText(
        "Share all your thoughts, feelings and breakthroughs with our community."
      )
    ).toBeInTheDocument();
  });
});
