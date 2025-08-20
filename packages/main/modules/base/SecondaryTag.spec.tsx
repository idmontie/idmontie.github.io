import { render, screen } from "@testing-library/react";
import { SecondaryTag } from "./SecondaryTag";

describe("SecondaryTag", () => {
    it("renders children content", () => {
        const testContent = "Test Secondary Tag";
        render(<SecondaryTag>{testContent}</SecondaryTag>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders as a span element", () => {
        render(<SecondaryTag>Test Tag</SecondaryTag>);

        const tag = screen.getByText("Test Tag");
        expect(tag.tagName).toBe("SPAN");
    });

    it("renders complex children", () => {
        const complexContent = (
            <span>
                Secondary with <strong>bold</strong>
            </span>
        );

        render(<SecondaryTag>{complexContent}</SecondaryTag>);

        expect(screen.getByText("Secondary with")).toBeInTheDocument();
        expect(screen.getByText("bold")).toBeInTheDocument();
        expect(screen.getByText("bold")).toHaveStyle({ fontWeight: "bold" });
    });

    it("renders multiple tags correctly", () => {
        render(
            <div>
                <SecondaryTag>Secondary 1</SecondaryTag>
                <SecondaryTag>Secondary 2</SecondaryTag>
            </div>
        );

        expect(screen.getByText("Secondary 1")).toBeInTheDocument();
        expect(screen.getByText("Secondary 2")).toBeInTheDocument();
    });
});
