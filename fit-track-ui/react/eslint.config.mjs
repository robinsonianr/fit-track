// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import config from "../../eslint.config.mjs";

export default [{
    ignores: [
        "src/api/generated/**",
        "dist/**",
        "build/**",
        "node_modules/**",
    ],
}, ...config, ...storybook.configs["flat/recommended"]];
