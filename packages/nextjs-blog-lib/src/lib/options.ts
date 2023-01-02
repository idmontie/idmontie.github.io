import path from "path";
import { BlogOptions } from "./types";

export const defaultOptions: BlogOptions = {
    postsDirectory: path.join(process.cwd(), "main", "_posts"),
    rewriteMediaUrls: {
        mediaDirectory: path.join(process.cwd(), "main", "public", "media"),
    },
    truncateMarker: "<!--truncate-->",
    truncateLength: 100,
    mdx: {
        components: {},
    },
};
