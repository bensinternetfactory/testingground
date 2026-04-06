// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AmountSlider } from "../AmountSlider";

afterEach(cleanup);

// Mock framer-motion (AmountSlider doesn't use it directly, but may be
// pulled in transitively if the CSS import triggers issues)
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: object, tag: string) => {
        const MotionComponent = React.forwardRef(function MockMotionComponent(
          props: Record<string, unknown>,
          ref: React.ForwardedRef<unknown>,
        ) {
          const {
            variants,
            initial,
            animate,
            exit,
            transition,
            whileTap,
            drag,
            dragControls,
            dragConstraints,
            dragElastic,
            dragListener,
            onDragEnd,
            ...domProps
          } = props;
          return React.createElement(tag, { ...domProps, ref });
        });
        MotionComponent.displayName = `motion.${tag}`;
        return MotionComponent;
      },
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useDragControls: () => ({ start: vi.fn() }),
  useReducedMotion: () => false,
}));

describe("AmountSlider", () => {
  it("renders the formatted currency value", () => {
    render(<AmountSlider value={100_000} />);
    expect(screen.getByText("$100,000")).toBeInTheDocument();
  });

  it("calls onChange with numeric value", () => {
    const onChange = vi.fn();
    render(<AmountSlider value={100_000} onChange={onChange} />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "150000" } });

    expect(onChange).toHaveBeenCalledWith(150_000);
  });

  it("displays plus sign at max value", () => {
    render(<AmountSlider value={500_000} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuetext", "$500,000+");
  });

  it("has accessible aria attributes", () => {
    render(<AmountSlider value={200_000} />);

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-label", "Estimated financing amount");
    expect(slider).toHaveAttribute("aria-valuetext", "$200,000");
  });

  it("shows min and max labels", () => {
    render(<AmountSlider value={100_000} />);
    expect(screen.getByText("$20,000")).toBeInTheDocument();
    expect(screen.getByText("$500,000+")).toBeInTheDocument();
  });
});
