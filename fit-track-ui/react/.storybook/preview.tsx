import type { Preview, Decorator } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import React from "react";

// IMPORTANT: This loads your design tokens, Tailwind utilities, and @font-face
// declarations into every story. Without this import, your tokens won't apply
// and your fonts won't render.
import "../src/global.css";

const preview: Preview = {
  parameters: {

    // Controls config — better defaults for the auto-generated panel.
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true, // Show description and default value columns by default
    },

    // Custom canvas backgrounds. These let you preview components against
    // different surface tones using the Storybook toolbar dropdown.
    backgrounds: {
      default: "Paper Canvas",
      values: [
        { name: "Paper Canvas", value: "#FAFAF8" },
        { name: "Vellum Surface", value: "#F2F1ED" },
        { name: "Ash Inset", value: "#E8E7E2" },
        { name: "White", value: "#FFFFFF" }, // For contrast testing
      ],
    },

    // Layout default — most token stories look better centered with padding
    // than full-width. Individual stories can override this.
    layout: "padded",

    // Viewport presets for testing responsive behavior.
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "812px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1360px", height: "900px" },
        },
        desktopWide: {
          name: "Desktop Wide",
          styles: { width: "1600px", height: "900px" },
        },
      },
    },

    // Documentation defaults.
    docs: {
      toc: true, // Auto-generated table of contents on docs pages
    },
  },

  // Global decorators wrap every story. These run for every story unless
  // explicitly disabled at the story level.
  decorators: [
    // Theme decorator — sets [data-theme="light"] on the root element.
    // When you add dark mode later, add `dark: "dark"` to the themes object
    // and a theme toggle appears in the Storybook toolbar automatically.
    withThemeByDataAttribute({
      themes: {
        light: "light",
        // dark: "dark",  // Uncomment when dark mode tokens exist
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),

    // Wrap every story in a container that applies your design system's
    // baseline typography and spacing. This ensures stories render in the
    // same typographic context as the real app.
    (Story) => (
        <div
            style={{
              fontFamily: "var(--font-aeonikpro)",
              color: "var(--color-charcoal-ink)",
              minHeight: "100vh",
              padding: "16px",
            }}
        >
          <Story />
        </div>
    ),
  ],

  // Story sorting in the sidebar. Tokens come first, then components,
  // then features. This matches how a designer would explore the system.
  tags: ["autodocs"],
};

export default preview;