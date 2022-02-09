import { render, screen } from "@testing-library/react";
import { Footer } from ".";

describe("Footer component", () => {
  it("should render correctly", () => {
    render(<Footer />);

    expect(screen.getByText("Made by Guilherme with")).toBeInTheDocument();
  });
});
