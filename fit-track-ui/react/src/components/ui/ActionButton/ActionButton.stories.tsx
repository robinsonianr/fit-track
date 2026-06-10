import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionButton } from "./ActionButton";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta<typeof ActionButton> = {
    title: "Components / TopBar / ActionButton",
    component: ActionButton,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The system's interactive action primitive. Three variants — primary (filled indigo), secondary (outlined), ghost (text-only) — share one component because they differ only in their color treatment. Used for CTAs, form actions, and any interactive button across the app.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary", "ghost"],
            description: "Visual variant",
        },
        children: {
            control: "text",
            description: "Button label",
        },
        disabled: {
            control: "boolean",
            description: "Disabled state",
        },
        onClick: {
            action: "clicked",
        },
    },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

/* ----------------------------------------------------------------------------
 * Primary — the default CTA variant
 * ---------------------------------------------------------------------------- */

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Add workout",
    },
};

/* ----------------------------------------------------------------------------
 * Secondary — outlined companion variant
 * ---------------------------------------------------------------------------- */

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Cancel",
    },
};

/* ----------------------------------------------------------------------------
 * Ghost — text-only tertiary variant
 * ---------------------------------------------------------------------------- */

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "View details",
    },
};

/* ----------------------------------------------------------------------------
 * AllVariants — side-by-side comparison
 * ----------------------------------------------------------------------------
 * Shows the three variants in their default state. Hover each one to see
 * the hover treatment. Useful for visual calibration — do the three feel
 * like a coherent set?
 * ---------------------------------------------------------------------------- */

export const AllVariants: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
            }}
        >
            <ActionButton variant="primary">Add workout</ActionButton>
            <ActionButton variant="secondary">Cancel</ActionButton>
            <ActionButton variant="ghost">View details</ActionButton>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * Disabled — disabled state across all three variants
 * ----------------------------------------------------------------------------
 * Disabled buttons should all read as "not interactive" regardless of
 * variant. Pewter Mute text + reduced opacity is the consistent treatment.
 * ---------------------------------------------------------------------------- */

export const Disabled: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
            }}
        >
            <ActionButton variant="primary" disabled>
                Add workout
            </ActionButton>
            <ActionButton variant="secondary" disabled>
                Cancel
            </ActionButton>
            <ActionButton variant="ghost" disabled>
                View details
            </ActionButton>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * PrimarySecondaryPair — the most common form pattern
 * ----------------------------------------------------------------------------
 * Submit + Cancel pairs are everywhere — forms, modals, confirmations.
 * The primary action is on the right (matches macOS/web conventions where
 * the affirmative action is closest to the "natural" mouse path).
 * ---------------------------------------------------------------------------- */

export const PrimarySecondaryPair: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-12)",
                alignItems: "center",
            }}
        >
            <ActionButton variant="secondary">Cancel</ActionButton>
            <ActionButton variant="primary">Save workout</ActionButton>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — primary CTA in a mock TopBar's right region
 * ----------------------------------------------------------------------------
 * Shows the most common production usage: "Add workout" as the right-region
 * primary CTA, aligned with the avatar nearby.
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
            <ActionButton variant="primary">Add workout</ActionButton>
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
    },
};

/* ----------------------------------------------------------------------------
 * KeyboardFocus — verifies focus-visible ring on all three variants
 * ---------------------------------------------------------------------------- */

export const KeyboardFocus: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
            }}
        >
            <ActionButton variant="primary">Tab here first</ActionButton>
            <ActionButton variant="secondary">Then here</ActionButton>
            <ActionButton variant="ghost">Then here</ActionButton>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Tab through the three buttons via keyboard. Each focused button should show the indigo focus ring offset from the button. Mouse clicks should not show a ring. Press Enter or Space to fire the click handler.",
            },
        },
    },
};