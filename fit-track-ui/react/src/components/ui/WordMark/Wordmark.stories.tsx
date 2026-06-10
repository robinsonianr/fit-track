import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wordmark } from "./Wordmark";

/* ============================================================================
 * Storybook metadata
 * ----------------------------------------------------------------------------
 * Wordmark is the simplest TopBar primitive — single typographic gesture,
 * no states, no variants. The stories here verify the AeonikPro font is
 * applied correctly and the size matches DESIGN.md spec.
 * ============================================================================ */

const meta: Meta<typeof Wordmark> = {
    title: "Components / TopBar / Wordmark",
    component: Wordmark,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "FitTrack's wordmark — AeonikPro 18px weight 500 in Charcoal Ink. The brand identity in the TopBar's left region. Single typographic gesture, no icon mark in v1.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Wordmark>;

/* ----------------------------------------------------------------------------
 * Default — the wordmark as it appears in production
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    render: () => <Wordmark />,
};

/* ----------------------------------------------------------------------------
 * InContext — the wordmark inside a mock TopBar region
 * ----------------------------------------------------------------------------
 * Shows how the wordmark sits within the chrome it's designed for. The
 * mock TopBar region uses the actual layout tokens from DESIGN.md so the
 * visual rhythm matches the real component.
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div
            style={{
                height: "72px",
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--color-paper-canvas)",
                borderBottom: "1px solid var(--color-linen-border)",
            }}
        >
            <Wordmark />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
    },
};

/* ----------------------------------------------------------------------------
 * AgainstSurfaces — verifies legibility across the surface hierarchy
 * ----------------------------------------------------------------------------
 * The wordmark should hold its character against Paper Canvas, Vellum
 * Surface, and Ash Inset. Useful for catching contrast issues early.
 * ---------------------------------------------------------------------------- */

export const AgainstSurfaces: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-16)",
            }}
        >
            {[
                { name: "Paper Canvas", value: "var(--color-paper-canvas)" },
                { name: "Vellum Surface", value: "var(--color-vellum-surface)" },
                { name: "Ash Inset", value: "var(--color-ash-inset)" },
            ].map((surface) => (
                <div
                    key={surface.name}
                    style={{
                        padding: "var(--spacing-24)",
                        backgroundColor: surface.value,
                        borderRadius: "var(--radius-cards)",
                        border: "1px solid var(--color-linen-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Wordmark />
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {surface.name}
                    </span>
                </div>
            ))}
        </div>
    ),
};