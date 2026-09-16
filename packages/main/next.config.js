//@ts-check

const path = require("path");
const { withNx } = require("@nrwl/next/plugins/with-nx");

/** Mermaid 9.x imports a cytoscape subpath that newer cytoscape no longer exports. */
function cytoscapeUmdAlias() {
    const cytoscapeMain = require.resolve("cytoscape");
    return path.join(path.dirname(cytoscapeMain), "cytoscape.umd.js");
}

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    outputFileTracing: true,
    swcMinify: false,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "cytoscape/dist/cytoscape.umd.js": cytoscapeUmdAlias(),
        };
        return config;
    },
};

module.exports = withNx(nextConfig);
