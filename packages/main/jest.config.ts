export default {
    displayName: "main",
    preset: "../../jest.preset.js",
    transform: {
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
        "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nrwl/next/babel"] }],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../../coverage/packages/main",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    // Include un-coveraged files in the coverage report
    collectCoverageFrom: [
        "**/*.{ts,tsx,js,jsx}",
        "!**/*.spec.{ts,tsx,js,jsx}",
        "!index.d.ts",
        "!jest.config.ts",
        "!next-env.d.ts",
        "!next.config.js",
        "!postcss.config.js",
        "!tailwind.config.js",
        "!**/.next/**",
        "!**/node_modules/**",
        "!**/dist/**",
        "!**/build/**",
        "!**/coverage/**",
        "!**/public/**",
        "!**/styles/**",
    ],
    coverageReporters: ["json", "lcov", "text", "clover"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
