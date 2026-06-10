# How to install PostCSS using Vite

- If we were using PostCSS as a standalone without Vite, the steps would be longer.
- Since you pull the latest changes, look at what each plugin does

Install the dependencies:

```sh
npm i -D postcss autoprefixer postcss-preset-env postcss-nested postcss-import \
  postcss-mixins cssnano postcss-custom-properties postcss-custom-media \
  postcss-utilities postcss-reporter postcss-browser-reporter
```

- Create a package.json file (if you don't already have) — `npm init -y`

- Create a `postcss.config.js` file in the project root and it should look like this:

```js
export default {
    plugins: {
        // Import handling
        "postcss-import": {},

        // Features and organization
        "postcss-mixins": {},
        "postcss-nested": {},
        "postcss-custom-properties": {},
        "postcss-custom-media": {},

        // Modern CSS features
        "postcss-preset-env": {
            features: {
                "nesting-rules": false,
                "custom-properties": false,
                "custom-media-queries": false,
            },
            browsers: ["> 1%", "last 2 versions", "not dead"],
        },

        // Vendor prefixes
        "autoprefixer": {},

        // Debug and reporting (development only)
        "postcss-browser-reporter": import.meta.env.DEV
            ? {
                selector: "body:before",
                styles: {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    "z-index": "1000",
                    padding: "10px",
                    background: "#fff3cd",
                    color: "#856404",
                    "border-bottom": "1px solid #ffeeba",
                    "white-space": "pre-wrap",
                },
                filterRules: message => {
                    const ignoredWarnings = ["some-warning-to-ignore"];
                    return !ignoredWarnings.includes(message.plugin);
                }
            }
            : false,

        "postcss-reporter": {
            clearReportedMessages: true,
            throwError: false,
            filter: message => {
                return message.type === "warning" || message.type === "error";
            },
            formatter: input => {
                return `${input.type.toUpperCase()}: ${input.plugin} - ${input.text} (${input.file}:${input.line}:${input.column})`;
            },
            noPlugins: false,
            sortByPosition: true,
            positionless: "last",
        },

        // Optimization (production only)
        "cssnano": import.meta.env.PROD
            ? {
                preset: ["default", {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            }
            : false
    }
};
```

## What does each plugin do?

- `autoprefixer`: Automatically adds vendor prefixes for browser compatibility
- `postcss-preset-env`: Converts modern CSS into something browsers understand
- `postcss-nested`: Enables CSS nesting like Sass
- `postcss-import`: Enables @import to inline other CSS files
- `postcss-mixins`: Adds support for CSS mixins
- `cssnano`: Minifies and optimizes CSS
- `postcss-custom-properties`: Better CSS variables support
- `postcss-custom-media`: Custom media queries
- `postcss-utilities`: Adds helpful utility functions
- `postcss-reporter`: Better error reporting
- `postcss-browser-reporter`: Shows CSS warnings in the browser

## For more in-depth plugin info

Look at the `Plugins` section ONLY.

Notion link: <https://vigorous-carriage-bb4.notion.site/PostCSS-4a975fa096bf42e5ae09311a64e791a8?pvs=4>
