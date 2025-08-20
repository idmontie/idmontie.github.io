import { render, screen } from "@testing-library/react";
import { Card, CardLink } from "./Card";

describe("Card", () => {
    it("renders children content", () => {
        const testContent = "Test Card Content";
        render(<Card>{testContent}</Card>);

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders complex children", () => {
        const complexContent = (
            <div>
                <h2>Title</h2>
                <p>Description</p>
                <button>Click me</button>
            </div>
        );

        render(<Card>{complexContent}</Card>);

        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Click me" })
        ).toBeInTheDocument();
    });
});

describe("CardLink", () => {
    it("renders as a link with correct href", () => {
        const testHref = "/test-page";
        render(<CardLink href={testHref}>Link Content</CardLink>);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", testHref);
        expect(link).toHaveTextContent("Link Content");
    });

    it("renders complex children in link", () => {
        const complexContent = (
            <div>
                <h2>Link Title</h2>
                <p>Link Description</p>
            </div>
        );

        render(<CardLink href="/test">{complexContent}</CardLink>);

        expect(screen.getByText("Link Title")).toBeInTheDocument();
        expect(screen.getByText("Link Description")).toBeInTheDocument();
    });

    it("passes through additional props to link", () => {
        render(
            <CardLink href="/test" aria-label="Test link">
                Test Content
            </CardLink>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "Test link");
    });
});
