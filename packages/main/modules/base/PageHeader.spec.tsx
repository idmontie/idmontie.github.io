import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
    it("renders children content", () => {
        const testContent = "Test Page Header";
        render(<PageHeader>{testContent}</PageHeader>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders as an h1 element", () => {
        render(<PageHeader>Test Header</PageHeader>);

        const header = screen.getByRole("heading", { level: 1 });
        expect(header).toBeInTheDocument();
    });

    it("renders complex children", () => {
        const complexContent = (
            <span>
                Welcome to <strong>My Site</strong>
            </span>
        );

        render(<PageHeader>{complexContent}</PageHeader>);

        expect(screen.getByText("Welcome to")).toBeInTheDocument();
        expect(screen.getByText("My Site")).toBeInTheDocument();
        expect(screen.getByText("My Site")).toHaveStyle({ fontWeight: "bold" });
    });
});
