module.exports = {
    apps: [
        {
            name: "main",
            script: "npm run start:ui",
            watch: true,
            instances: 1,
            env: {
                NODE_ENV: "production",
                PORT: 4200,
            },
            ignore_watch: ["node_modules"],
        },
    ],
};
