import { ComponentType } from "react";
import { AiPreview } from "./AiPreview";
import { DefaultPreview } from "./DefaultPreview";
import { MathematicsPreview } from "./MathematicsPreview";
import { ProgrammingPreview } from "./ProgrammingPreview";
import { ReactPreview } from "./ReactPreview";
import { TechnologyPreview } from "./TechnologyPreview";
import { TypescriptPreview } from "./TypescriptPreview";

export const previewByTag: Record<string, ComponentType> = {
    typescript: TypescriptPreview,
    programming: ProgrammingPreview,
    technology: TechnologyPreview,
    mathematics: MathematicsPreview,
    react: ReactPreview,
    ai: AiPreview,
};

export function getPreviewIllustration(tags: string[]): ComponentType {
    for (const tag of tags) {
        const Illustration = previewByTag[tag];
        if (Illustration) {
            return Illustration;
        }
    }

    return DefaultPreview;
}
