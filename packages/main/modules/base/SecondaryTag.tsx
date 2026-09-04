import { Tag, TagProps } from "./Tag";

export type SecondaryTagProps = Omit<TagProps, "variant">;

export function SecondaryTag<T>({ children, ...props }: SecondaryTagProps & T) {
    return (
        <Tag variant="secondary" {...props}>
            {children}
        </Tag>
    );
}
