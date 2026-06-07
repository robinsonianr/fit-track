# FitTrack UI

React frontend for FitTrack, built with Vite, TypeScript, and Tailwind CSS v4.

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:5173](http://localhost:5173).

### `npm run build`

Builds the app for production into the `dist` folder.

### `npm test`

Runs the test suite with Vitest.

### `npm run lint`

Runs ESLint across all JS/TS source files.

### `npm run lint:css`

Runs Stylelint across all CSS files.

### `npm run storybook`

Launches the Storybook component explorer at [http://localhost:6006](http://localhost:6006).

Use Storybook to browse and visually verify design tokens and UI components
in isolation — without running the full app.

```bash
cd fit-track-ui/react
npm run storybook
```

Then open [http://localhost:6006](http://localhost:6006) in your browser.
The sidebar organizes stories by category (e.g. **Tokens**, **Components**).

### `npm run build-storybook`

Builds a static Storybook into `storybook-static`, suitable for deployment.
