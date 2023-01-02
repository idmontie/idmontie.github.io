import React from "react";
import { render } from "@testing-library/react";

import { AppProviders } from "modules/app/components/AppProviders";
import Index from "pages/index";

// Mock next/router
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

describe("Index", () => {
    it("should render successfully", () => {
        const { baseElement } = render(
            <AppProviders>
                <Index />
            </AppProviders>
        );
        expect(baseElement).toBeTruthy();
    });
});
