// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TermLengthSlider } from "../TermLengthSlider";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

afterEach(cleanup);

const config = {
  headline: "Find your term",
  subheading: "See your max term by model year",
  body: "Model year affects the maximum financing term.",
  iconSrc: "/icon.png",
  iconAlt: "Tow truck",
  defaultYear: 2020,
  lookupTable: [
    { minYear: 2000, maxYear: 2010, maxTermMonths: 36 },
    { minYear: 2011, maxYear: 2020, maxTermMonths: 60 },
    { minYear: 2021, maxYear: 2030, maxTermMonths: 72 },
  ],
};

describe("TermLengthSlider", () => {
  it("renders the shared slider class and updates the announced term", () => {
    render(<TermLengthSlider config={config} />);

    const slider = screen.getByRole("slider", {
      name: "Select truck model year",
    });

    expect(slider).toHaveClass("slider-thumb");
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "2020 model year, up to 60 month term",
    );
    expect(screen.getByText("60 months")).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: "2024" } });

    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "2024 model year, up to 72 month term",
    );
    expect(screen.getByText("72 months")).toBeInTheDocument();
  });
});
