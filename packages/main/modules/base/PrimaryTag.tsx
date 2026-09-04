import { Tag, TagProps } from "./Tag";

export type PrimaryTagProps = Omit<TagProps, "variant">;

export function PrimaryTag<T>({ children, ...props }: PrimaryTagProps & T) {
    return (
        <Tag variant="primary" {...props}>
            {children}
        </Tag>
    );
}
