import { render, screen } from "@testing-library/react";
import { AppLayout } from "./AppLayout";

// Mock the Nav and Footer components to simplify testing
jest.mock("./Nav", () => ({
    Nav: () => <nav data-testid="nav">Nav</nav>,
}));

jest.mock("./Footer", () => ({
    Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("AppLayout", () => {
    it("renders children content", () => {
        const testContent = "Test Content";
        render(
            <AppLayout>
                <div>{testContent}</div>
            </AppLayout>
        );

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("renders Nav component", () => {
        render(
            <AppLayout>
                <div>Test</div>
            </AppLayout>
        );

        expect(screen.getByTestId("nav")).toBeInTheDocument();
    });

    it("renders Footer component", () => {
        render(
            <AppLayout>
                <div>Test</div>
            </AppLayout>
        );

        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
