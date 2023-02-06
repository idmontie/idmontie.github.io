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

// Mock mdx-js
jest.mock("@mdx-js/mdx", () => ({
    compile: function () {
        return;
    },
    run: function () {
        return;
    },
}));

// Mock remark-gfm
jest.mock("remark-gfm", () => ({
    remarkGfm: function () {
        return;
    },
}));

describe("Index", () => {
    it("should render successfully", () => {
        const { baseElement } = render(
            <AppProviders>
                <Index posts={[]} projects={[]} />
            </AppProviders>
        );
        expect(baseElement).toBeTruthy();
    });
});
