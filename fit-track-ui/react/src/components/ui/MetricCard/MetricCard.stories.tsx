import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricCard } from "./MetricCard";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const meta: Meta<typeof MetricCard> = {
    title: "Components / Dashboard / MetricCard",
    component: MetricCard,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Stat tile for the Dashboard's Quick Stats row. Value dominates at 36px — glanceable in under a second. Optional secondary text supports a +/- prefix convention: '+' renders in moss-positive, '-' in rust-negative (prefix only, not the full string). Loading state renders pulsing skeleton blocks.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
            description: "Metric label — rendered uppercase, muted",
        },
        value: {
            control: "text",
            description: "Primary value — caller formats it (commas, units, decimals)",
        },
        secondary: {
            control: "text",
            description: "Secondary line — prefix '+' = green, '-' = rust",
        },
        loading: {
            control: "boolean",
            description: "Renders skeleton placeholders",
        },
    },
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

/* ----------------------------------------------------------------------------
 * Default
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    args: {
        label: "Sessions this week",
        value: 3,
    },
};

/* ----------------------------------------------------------------------------
 * WithSecondary — target context
 * ---------------------------------------------------------------------------- */

export const WithSecondary: Story = {
    args: {
        label: "Sessions this week",
        value: 3,
        secondary: "/ 4 target",
    },
};

/* ----------------------------------------------------------------------------
 * WithPositiveDelta — "+" prefix in moss-positive
 * ---------------------------------------------------------------------------- */

export const WithPositiveDelta: Story = {
    args: {
        label: "Sessions this week",
        value: 3,
        secondary: "+1 from last week",
    },
};

/* ----------------------------------------------------------------------------
 * WithNegativeDelta — "-" prefix in rust-negative
 * ---------------------------------------------------------------------------- */

export const WithNegativeDelta: Story = {
    args: {
        label: "Sessions this week",
        value: 2,
        secondary: "-1 from last week",
    },
};

/* ----------------------------------------------------------------------------
 * ZeroState — value=0 renders plainly, no special treatment
 * ---------------------------------------------------------------------------- */

export const ZeroState: Story = {
    args: {
        label: "Sessions this week",
        value: 0,
    },
};

/* ----------------------------------------------------------------------------
 * LoadingState — skeleton placeholders
 * ---------------------------------------------------------------------------- */

export const LoadingState: Story = {
    args: {
        label: "Sessions this week",
        value: "",
        loading: true,
    },
};

/* ----------------------------------------------------------------------------
 * ThreeColumn — the actual Dashboard usage pattern
 * ---------------------------------------------------------------------------- */

export const ThreeColumn: Story = {
    render: () => (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                maxWidth: "720px",
            }}
        >
            <MetricCard label="Sessions this week" value={3} secondary="+1 from last week" />
            <MetricCard label="Total volume" value="12,450 lbs" secondary="+8% from last week" />
            <MetricCard label="Avg duration" value="52 min" secondary="/ 60 min target" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * LargeValue — verify long values don't break layout
 * ---------------------------------------------------------------------------- */

export const LargeValue: Story = {
    render: () => (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                maxWidth: "720px",
            }}
        >
            <MetricCard label="Total volume" value={12500} />
            <MetricCard label="Longest session" value="2:45:30" />
            <MetricCard label="Best lift" value="125 lbs" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — SectionTitle("This week") + three MetricCards in a row
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div style={{ maxWidth: "720px" }}>
            <SectionTitle>This week</SectionTitle>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                }}
            >
                <MetricCard label="Sessions" value={3} secondary="+1 from last week" />
                <MetricCard label="Volume" value="12,450 lbs" secondary="+8% from last week" />
                <MetricCard label="Avg duration" value="52 min" secondary="/ 60 min target" />
            </div>
        </div>
    ),
};