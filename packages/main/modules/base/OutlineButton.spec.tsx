import { render, screen, fireEvent } from "@testing-library/react";
import { OutlineButton } from "./OutlineButton";

describe("OutlineButton", () => {
    it("renders children content", () => {
        const testContent = "Test Outline Button";
        render(<OutlineButton>{testContent}</OutlineButton>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders as a button by default", () => {
        render(<OutlineButton>Test Button</OutlineButton>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("handles click events", () => {
        const handleClick = jest.fn();
        render(<OutlineButton onClick={handleClick}>Click Me</OutlineButton>);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a different element when 'as' prop is provided", () => {
        render(
            <OutlineButton as="a" href="/test">
                Link Button
            </OutlineButton>
        );

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");
    });

    it("passes through additional props", () => {
        render(
            <OutlineButton
                data-testid="test-button"
                aria-label="Test button"
                disabled
            >
                Test Button
            </OutlineButton>
        );

        const button = screen.getByTestId("test-button");
        expect(button).toHaveAttribute("aria-label", "Test button");
        expect(button).toBeDisabled();
    });

    it("renders complex children", () => {
        const complexContent = (
            <span>
                Outline with <code>code</code> text
            </span>
        );

        render(<OutlineButton>{complexContent}</OutlineButton>);

        expect(screen.getByText(/Outline with/iu)).toBeInTheDocument();
        expect(screen.getByText(/code/iu)).toBeInTheDocument();
    });

    it("works with form elements", () => {
        render(
            <form>
                <OutlineButton type="button">Button</OutlineButton>
            </form>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "button");
    });
});
