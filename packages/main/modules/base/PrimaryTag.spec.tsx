import { render, screen } from "@testing-library/react";
import { PrimaryTag } from "./PrimaryTag";

describe("PrimaryTag", () => {
    it("renders children content", () => {
        const testContent = "Test Tag";
        render(<PrimaryTag>{testContent}</PrimaryTag>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders as a span element", () => {
        render(<PrimaryTag>Test Tag</PrimaryTag>);

        const tag = screen.getByText("Test Tag");
        expect(tag.tagName).toBe("SPAN");
    });

    it("renders complex children", () => {
        const complexContent = (
            <span>
                Tag with <em>emphasis</em>
            </span>
        );

        render(<PrimaryTag>{complexContent}</PrimaryTag>);

        expect(screen.getByText("Tag with")).toBeInTheDocument();
        expect(screen.getByText("emphasis")).toBeInTheDocument();
        expect(screen.getByText("emphasis")).toHaveStyle({
            fontStyle: "italic",
        });
    });

    it("renders multiple tags correctly", () => {
        render(
            <div>
                <PrimaryTag>Tag 1</PrimaryTag>
                <PrimaryTag>Tag 2</PrimaryTag>
            </div>
        );

        expect(screen.getByText("Tag 1")).toBeInTheDocument();
        expect(screen.getByText("Tag 2")).toBeInTheDocument();
    });
});
