import Image, { ImageProps } from "next/image";
import { ComponentPropsWithoutRef } from "react";

interface ContentImageFillProps {
    fill: true;
    width?: never;
    height?: never;
}

interface ContentImageSizedProps {
    fill?: false;
    width: number;
    height: number;
}

export type ContentImageProps = Omit<
    ImageProps,
    "src" | "alt" | "width" | "height" | "fill" | "priority"
> &
    (ContentImageFillProps | ContentImageSizedProps) & {
        src: string;
        alt: string;
        priority?: boolean;
        className?: string;
        style?: ComponentPropsWithoutRef<"img">["style"];
    };

export function ContentImage({
    src,
    alt,
    priority = false,
    className,
    style,
    sizes,
    ...rest
}: ContentImageProps) {
    if ("fill" in rest && rest.fill) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                className={className}
                style={style}
                sizes={sizes}
            />
        );
    }

    const { width, height } = rest as ContentImageSizedProps;

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={className}
            style={style}
            sizes={sizes}
        />
    );
}

const mdxImageClassName =
    "mx-auto block !h-auto !w-auto max-h-[500px] max-w-full";

/** Responsive in-content image (e.g. MDX) when width/height are unknown. */
export function ContentImageResponsive({
    src,
    alt,
    width,
    height,
    className,
    style,
    ...props
}: Omit<ContentImageProps, "fill"> & {
    width?: number | string;
    height?: number | string;
}) {
    const parsedWidth = width != null ? Number(width) : undefined;
    const parsedHeight = height != null ? Number(height) : undefined;
    const hasDimensions =
        parsedWidth != null &&
        parsedHeight != null &&
        !Number.isNaN(parsedWidth) &&
        !Number.isNaN(parsedHeight);

    const mergedClassName = [mdxImageClassName, className]
        .filter(Boolean)
        .join(" ");

    const mergedStyle = {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: 500,
        margin: "auto",
        ...style,
    };

    if (hasDimensions) {
        return (
            <ContentImage
                src={src}
                alt={alt}
                width={parsedWidth}
                height={parsedHeight}
                className={mergedClassName}
                style={mergedStyle}
                {...props}
            />
        );
    }

    // Placeholder dimensions satisfy next/image; CSS keeps natural aspect ratio.
    return (
        <ContentImage
            src={src}
            alt={alt}
            width={1}
            height={1}
            sizes="100vw"
            className={mergedClassName}
            style={mergedStyle}
            {...props}
        />
    );
}
