import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActivityRow } from "./ActivityRow";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const meta: Meta<typeof ActivityRow> = {
    title: "Components / Dashboard / ActivityRow",
    component: ActivityRow,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Full-row-clickable activity entry. Two variants: `compact` for the Dashboard's Recent Activity list (single line, no highlight); `full` for the Activities page (two lines, highlight shown). The type dot color is derived from the workout type name — strength types glow saffron, cardio types go moss-positive.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "text",
            description: "Workout type label (e.g. \"Push\", \"Cardio\")",
        },
        timestamp: {
            control: "text",
            description: "Pre-formatted date/time string",
        },
        duration: {
            control: "text",
            description: "Pre-formatted duration string",
        },
        highlight: {
            control: "text",
            description: "Optional highlight text (PR, notable event)",
        },
        variant: {
            control: "radio",
            options: ["compact", "full"],
            description: "compact = Dashboard single-line · full = Activities two-line",
        },
    },
};

export default meta;

type Story = StoryObj<typeof ActivityRow>;

/* ----------------------------------------------------------------------------
 * CompactDefault — typical Dashboard row
 * ---------------------------------------------------------------------------- */

export const CompactDefault: Story = {
    args: {
        type: "Push",
        timestamp: "Mon, Jun 9",
        duration: "48 min",
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * CompactNoHighlight — no highlight prop in compact (not rendered anyway)
 * Shows that compact gracefully ignores the highlight prop.
 * ---------------------------------------------------------------------------- */

export const CompactNoHighlight: Story = {
    args: {
        type: "Cardio",
        timestamp: "Sat, Jun 7",
        duration: "32 min",
        highlight: "7.2 km", // ignored in compact
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * FullDefault — Activities page row, no highlight
 * ---------------------------------------------------------------------------- */

export const FullDefault: Story = {
    args: {
        type: "Pull",
        timestamp: "Tue, Jun 10",
        duration: "55 min",
        variant: "full",
    },
};

/* ----------------------------------------------------------------------------
 * FullWithHighlight — Activities page row with PR notation
 * ---------------------------------------------------------------------------- */

export const FullWithHighlight: Story = {
    args: {
        type: "Legs",
        timestamp: "Mon, Jun 9",
        duration: "1h 12min",
        highlight: "PR: 225 lbs squat",
        variant: "full",
    },
};

/* ----------------------------------------------------------------------------
 * DotColors — all three dot color categories side by side (compact)
 * ---------------------------------------------------------------------------- */

export const DotColors: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
            <ActivityRow type="Push" timestamp="Mon, Jun 9" duration="48 min" variant="compact" />
            <ActivityRow type="Run" timestamp="Sun, Jun 8" duration="32 min" variant="compact" />
            <ActivityRow type="Mobility" timestamp="Sat, Jun 7" duration="20 min" variant="compact" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * HoverState — wrapped in a list to make hover easy to test
 * ---------------------------------------------------------------------------- */

export const HoverState: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
            <ActivityRow
                type="Push"
                timestamp="Mon, Jun 9"
                duration="48 min"
                variant="compact"
                onClick={() => console.log("Push clicked")}
            />
            <ActivityRow
                type="Pull"
                timestamp="Sun, Jun 8"
                duration="52 min"
                variant="compact"
                onClick={() => console.log("Pull clicked")}
            />
            <ActivityRow
                type="Legs"
                timestamp="Fri, Jun 6"
                duration="1h 12min"
                variant="compact"
                onClick={() => console.log("Legs clicked")}
            />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * ListOfRows — compact list as it appears on Dashboard
 * ---------------------------------------------------------------------------- */

export const ListOfRows: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "480px" }}>
            <ActivityRow type="Push" timestamp="Mon, Jun 9" duration="48 min" variant="compact" />
            <ActivityRow type="Cardio" timestamp="Sun, Jun 8" duration="32 min" variant="compact" />
            <ActivityRow type="Pull" timestamp="Fri, Jun 6" duration="52 min" variant="compact" />
            <ActivityRow type="Legs" timestamp="Wed, Jun 4" duration="1h 12min" variant="compact" />
            <ActivityRow type="Upper Body" timestamp="Mon, Jun 2" duration="44 min" variant="compact" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * FullList — full variant as it appears on Activities page
 * ---------------------------------------------------------------------------- */

export const FullList: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
            <ActivityRow
                type="Push"
                timestamp="Mon, Jun 9"
                duration="48 min"
                highlight="PR: 225 lbs bench"
                variant="full"
            />
            <ActivityRow
                type="Cardio"
                timestamp="Sun, Jun 8"
                duration="32 min"
                highlight="7.2 km"
                variant="full"
            />
            <ActivityRow
                type="Pull"
                timestamp="Fri, Jun 6"
                duration="52 min"
                variant="full"
            />
            <ActivityRow
                type="Legs"
                timestamp="Wed, Jun 4"
                duration="1h 12min"
                highlight="PR: 315 lbs deadlift"
                variant="full"
            />
            <ActivityRow
                type="Mobility"
                timestamp="Mon, Jun 2"
                duration="20 min"
                variant="full"
            />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — SectionTitle + compact list (Dashboard-style)
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div style={{ maxWidth: "480px" }}>
            <SectionTitle>Recent activity</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ActivityRow
                    type="Push"
                    timestamp="Mon, Jun 9"
                    duration="48 min"
                    variant="compact"
                    onClick={() => console.log("Navigate to Push detail")}
                />
                <ActivityRow
                    type="Cardio"
                    timestamp="Sun, Jun 8"
                    duration="32 min"
                    variant="compact"
                    onClick={() => console.log("Navigate to Cardio detail")}
                />
                <ActivityRow
                    type="Pull"
                    timestamp="Fri, Jun 6"
                    duration="52 min"
                    variant="compact"
                    onClick={() => console.log("Navigate to Pull detail")}
                />
            </div>
        </div>
    ),
};