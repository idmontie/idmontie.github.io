import { getPreviewIllustration, previewByTag } from "./getPreviewIllustration";
import { DefaultPreview } from "./DefaultPreview";
import { ProgrammingPreview } from "./ProgrammingPreview";
import { TechnologyPreview } from "./TechnologyPreview";
import { TypescriptPreview } from "./TypescriptPreview";

describe("getPreviewIllustration", () => {
    it("uses the first tag that has an illustration", () => {
        expect(
            getPreviewIllustration(["technology", "programming", "react"])
        ).toBe(TechnologyPreview);
        expect(getPreviewIllustration(["typescript", "react"])).toBe(
            TypescriptPreview
        );
    });

    it("skips unknown tags until a matching illustration is found", () => {
        expect(
            getPreviewIllustration(["nlp", "machine learning", "programming"])
        ).toBe(ProgrammingPreview);
    });

    it("falls back to the default when no tag matches", () => {
        expect(getPreviewIllustration([])).toBe(DefaultPreview);
        expect(getPreviewIllustration(["nlp", "machine learning"])).toBe(
            DefaultPreview
        );
    });

    it("covers the remaining illustrated tags", () => {
        expect(Object.keys(previewByTag)).toEqual([
            "typescript",
            "programming",
            "technology",
            "mathematics",
            "react",
            "ai",
        ]);
    });
});
