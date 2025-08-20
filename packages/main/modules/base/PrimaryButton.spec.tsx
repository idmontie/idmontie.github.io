import { render, screen, fireEvent } from "@testing-library/react";
import { PrimaryButton } from "./PrimaryButton";

describe("PrimaryButton", () => {
    it("renders children content", () => {
        const testContent = "Test Button";
        render(<PrimaryButton>{testContent}</PrimaryButton>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders as a button by default", () => {
        render(<PrimaryButton>Test Button</PrimaryButton>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("handles click events", () => {
        const handleClick = jest.fn();
        render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a different element when 'as' prop is provided", () => {
        render(
            <PrimaryButton as="a" href="/test">
                Link Button
            </PrimaryButton>
        );

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");
    });

    it("passes through additional props", () => {
        render(
            <PrimaryButton
                data-testid="test-button"
                aria-label="Test button"
                disabled
            >
                Test Button
            </PrimaryButton>
        );

        const button = screen.getByTestId("test-button");
        expect(button).toHaveAttribute("aria-label", "Test button");
        expect(button).toBeDisabled();
    });

    it("renders complex children", () => {
        const complexContent = (
            <span>
                Button with <strong>bold</strong> text
            </span>
        );

        render(<PrimaryButton>{complexContent}</PrimaryButton>);

        expect(screen.getByText(/Button with/iu)).toBeInTheDocument();
        expect(screen.getByText(/bold/)).toBeInTheDocument();
    });

    it("works with form elements", () => {
        render(
            <form>
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
    });
});
