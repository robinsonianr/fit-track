import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarButton } from "./AvatarButton";

/* ============================================================================
 * Storybook metadata
 * ----------------------------------------------------------------------------
 * AvatarButton stories cover the three meaningful display modes (initials,
 * image, image-fallback), plus a focus state demonstration and an
 * in-context view inside a mock TopBar region.
 * ============================================================================ */

const meta: Meta<typeof AvatarButton> = {
    title: "Components / TopBar / AvatarButton",
    component: AvatarButton,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Circular 40px avatar button that triggers the user menu in the TopBar. Displays the user's profile image when available, falls back to initials in Indigo Signal on Indigo Wash background. Uses Radix's Avatar primitive for image-with-fallback behavior.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        name: {
            control: "text",
            description: "User's full name — used to compute initials and aria-label",
        },
        imageUrl: {
            control: "text",
            description: "Optional profile image URL",
        },
        onClick: {
            action: "clicked",
            description: "Fired when the avatar is clicked",
        },
    },
};

export default meta;

type Story = StoryObj<typeof AvatarButton>;

/* ----------------------------------------------------------------------------
 * WithInitials — the default state when no profile image is set
 * ---------------------------------------------------------------------------- */

export const WithInitials: Story = {
    args: {
        name: "Long Tang",
    },
};

/* ----------------------------------------------------------------------------
 * WithImage — when a profile image URL is provided
 * ----------------------------------------------------------------------------
 * Uses a stable placeholder URL. If your team has real avatars, swap this
 * for a representative test image.
 * ---------------------------------------------------------------------------- */

export const WithImage: Story = {
    args: {
        name: "Long Tang",
        imageUrl: "https://i.pravatar.cc/80?img=12",
    },
};

/* ----------------------------------------------------------------------------
 * ImageFallback — image URL provided but fails to load
 * ----------------------------------------------------------------------------
 * Demonstrates Radix's fallback behavior: invalid URL → initials render
 * after the 600ms delay. Useful for catching the "image broken, initials
 * never showed up" edge case.
 * ---------------------------------------------------------------------------- */

export const ImageFallback: Story = {
    args: {
        name: "Long Tang",
        imageUrl: "https://this-domain-does-not-exist.example/avatar.jpg",
    },
};

/* ----------------------------------------------------------------------------
 * SingleName — verifies the initials logic for one-word names
 * ---------------------------------------------------------------------------- */

export const SingleName: Story = {
    args: {
        name: "Madonna",
    },
};

/* ----------------------------------------------------------------------------
 * LongName — verifies first-and-last logic for multi-word names
 * ---------------------------------------------------------------------------- */

export const LongName: Story = {
    args: {
        name: "Maria del Carmen Rodriguez Sanchez",
    },
};

/* ----------------------------------------------------------------------------
 * InContext — inside a mock TopBar region
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div
            style={{
                height: "72px",
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "var(--spacing-16)",
                backgroundColor: "var(--color-paper-canvas)",
                borderBottom: "1px solid var(--color-linen-border)",
            }}
        >
            <AvatarButton name="Long Tang" />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
    },
};

/* ----------------------------------------------------------------------------
 * KeyboardFocus — verifies the focus-visible ring
 * ----------------------------------------------------------------------------
 * Click the avatar with mouse — no ring should appear. Then Tab to it via
 * keyboard — the indigo focus ring should be visible. This story doesn't
 * automate the verification; it's a visual reminder to check both paths.
 * ---------------------------------------------------------------------------- */

export const KeyboardFocus: Story = {
    args: {
        name: "Long Tang",
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Verify focus-visible behavior: clicking with mouse should not show a ring; tabbing via keyboard should show an indigo ring offset from the avatar by 2px of Paper Canvas. This is the standard 'no mouse ring, yes keyboard ring' pattern.",
            },
        },
    },
};