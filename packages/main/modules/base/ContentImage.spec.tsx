import { render, screen } from "@testing-library/react";
import { ContentImage, ContentImageResponsive } from "./ContentImage";

jest.mock("next/image", () => {
    return function MockImage({
        src,
        alt,
        priority,
        loading,
        fill,
        width,
        height,
        className,
        style,
    }: {
        src: string;
        alt: string;
        priority?: boolean;
        loading?: string;
        fill?: boolean;
        width?: number;
        height?: number;
        className?: string;
        style?: React.CSSProperties;
    }) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={alt}
                data-priority={priority ? "true" : "false"}
                data-loading={loading ?? (priority ? "eager" : "lazy")}
                data-fill={fill ? "true" : "false"}
                width={width}
                height={height}
                className={className}
                style={style}
            />
        );
    };
});

describe("ContentImage", () => {
    it("lazy-loads by default", () => {
        render(
            <ContentImage src="/test.png" alt="Test" width={100} height={100} />
        );

        const img = screen.getByRole("img", { name: "Test" });
        expect(img).toHaveAttribute("data-priority", "false");
        expect(img).toHaveAttribute("data-loading", "lazy");
    });

    it("loads eagerly when priority is set", () => {
        render(
            <ContentImage
                src="/hero.png"
                alt="Hero"
                width={800}
                height={600}
                priority
            />
        );

        const img = screen.getByRole("img", { name: "Hero" });
        expect(img).toHaveAttribute("data-priority", "true");
        expect(img).toHaveAttribute("data-loading", "eager");
    });

    it("supports fill layout", () => {
        render(<ContentImage src="/card.png" alt="Card" fill sizes="50vw" />);

        const img = screen.getByRole("img", { name: "Card" });
        expect(img).toHaveAttribute("data-fill", "true");
    });
});

describe("ContentImageResponsive", () => {
    it("uses natural sizing without forcing full width", () => {
        render(
            <ContentImageResponsive src="/screenshot.png" alt="Screenshot" />
        );

        const img = screen.getByRole("img", { name: "Screenshot" });
        expect(img).toHaveAttribute("width", "1");
        expect(img).toHaveAttribute("height", "1");
        expect(img).toHaveStyle({
            width: "auto",
            height: "auto",
            maxWidth: "100%",
        });
    });
});
