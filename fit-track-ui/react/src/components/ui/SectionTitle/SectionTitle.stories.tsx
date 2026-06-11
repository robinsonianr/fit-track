import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionTitle } from "./SectionTitle";

const meta: Meta<typeof SectionTitle> = {
    title: "Components / Dashboard / SectionTitle",
    component: SectionTitle,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Quiet label above each Dashboard section. Establishes vertical rhythm with a 12px bottom margin. Small, muted, uppercase — a reference point, not a heading. Optional eyebrow (monospace) and right-side action slot.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        children: {
            control: "text",
            description: "Section label text",
        },
        eyebrow: {
            control: "text",
            description: "Optional monospace eyebrow above the title",
        },
        action: {
            control: false,
            description: "Optional right-side action (ReactNode)",
        },
    },
};

export default meta;

type Story = StoryObj<typeof SectionTitle>;

/* ----------------------------------------------------------------------------
 * Default — bare title, no action, no eyebrow
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    args: {
        children: "This week",
    },
};

/* ----------------------------------------------------------------------------
 * WithAction — title + right-aligned "View all" link
 * ---------------------------------------------------------------------------- */

export const WithAction: Story = {
    args: {
        children: "Recent activity",
    },
    render: (args) => (
        <SectionTitle
            {...args}
            action={
                <button
                    type="button"
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "var(--color-indigo-signal)",
                        letterSpacing: "var(--tracking-small)",
                    }}
                >
                    View all
                </button>
            }
        />
    ),
};

/* ----------------------------------------------------------------------------
 * WithEyebrow — title with a small monospace eyebrow above
 * ---------------------------------------------------------------------------- */

export const WithEyebrow: Story = {
    args: {
        children: "Volume",
        eyebrow: "Weekly",
    },
};

/* ----------------------------------------------------------------------------
 * FullExample — title + eyebrow + action together
 * ---------------------------------------------------------------------------- */

export const FullExample: Story = {
    args: {
        children: "This week",
        eyebrow: "Progress",
    },
    render: (args) => (
        <SectionTitle
            {...args}
            action={
                <button
                    type="button"
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "var(--color-indigo-signal)",
                        letterSpacing: "var(--tracking-small)",
                    }}
                >
                    View all
                </button>
            }
        />
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — SectionTitle followed by a mock content region
 * Verifies the 12px bottom-margin rhythm before content begins.
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    args: {
        children: "This week",
    },
    render: (args) => (
        <div style={{ maxWidth: "480px" }}>
            <SectionTitle {...args} />
            <div
                style={{
                    height: "80px",
                    backgroundColor: "var(--color-vellum-surface)",
                    borderRadius: "var(--radius-cards)",
                    border: "1px solid var(--color-linen-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "13px",
                    color: "var(--color-pewter-mute)",
                }}
            >
                Content follows here
            </div>
        </div>
    ),
};