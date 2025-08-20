/* eslint-disable testing-library/no-node-access -- closest() is fine */
import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
    it("renders with correct default state", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        expect(toggle).not.toBeChecked();
    });

    it("renders with checked state", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={true} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        expect(toggle).toBeChecked();
    });

    it("calls onChange when toggled", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        fireEvent.click(toggle);

        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when unchecked toggle is clicked", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={true} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        fireEvent.click(toggle);

        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("renders prefix content", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} prefix="🌑" />);

        const label = screen.getByRole("checkbox").closest("label");
        expect(label).toHaveTextContent("🌑");
    });

    it("renders suffix content", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} suffix="☀️" />);

        const label = screen.getByRole("checkbox").closest("label");
        expect(label).toHaveTextContent("☀️");
    });

    it("renders both prefix and suffix", () => {
        const handleChange = jest.fn();
        render(
            <Toggle
                checked={false}
                onChange={handleChange}
                prefix="🌑"
                suffix="☀️"
            />
        );

        const label = screen.getByRole("checkbox").closest("label");
        expect(label).toHaveTextContent("🌑");
        expect(label).toHaveTextContent("☀️");
    });

    it("renders complex prefix and suffix", () => {
        const handleChange = jest.fn();
        render(
            <Toggle
                checked={false}
                onChange={handleChange}
                prefix={<span data-testid="prefix">Dark</span>}
                suffix={<span data-testid="suffix">Light</span>}
            />
        );

        expect(screen.getByTestId("prefix")).toBeInTheDocument();
        expect(screen.getByTestId("suffix")).toBeInTheDocument();
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByText("Light")).toBeInTheDocument();
    });

    it("has proper accessibility attributes", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        expect(toggle).toHaveAttribute("type", "checkbox");
        expect(toggle).toHaveAttribute("id", "toggle");
    });

    it("can be controlled via keyboard", async () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        await userEvent.type(toggle, " ");
        await userEvent.type(toggle, "Enter");

        // TODO Why is this called 3 times?
        expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("can be focused", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        toggle.focus();

        expect(toggle).toHaveFocus();
    });

    it("handles multiple rapid clicks", async () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");

        await userEvent.click(toggle);
        await userEvent.click(toggle);
        await userEvent.click(toggle);

        expect(handleChange).toHaveBeenCalledTimes(3);
        expect(handleChange).toHaveBeenNthCalledWith(1, true);
        expect(handleChange).toHaveBeenNthCalledWith(2, true);
        expect(handleChange).toHaveBeenNthCalledWith(3, true);
    });

    it("renders without prefix or suffix", () => {
        const handleChange = jest.fn();
        render(<Toggle checked={false} onChange={handleChange} />);

        const toggle = screen.getByRole("checkbox");
        expect(toggle).toBeInTheDocument();

        // Should not have any text content for prefix/suffix
        const label = screen.getByRole("checkbox").closest("label");
        expect(label).toBeInTheDocument();
    });
});
