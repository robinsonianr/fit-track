import config from "../../eslint.config.mjs";

export default [
    {
        ignores: [
            "src/api/generated/**",
            "dist/**",
            "build/**",
            "node_modules/**",
        ],
    },
    ...config,
];
