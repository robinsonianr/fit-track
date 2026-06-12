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
                    "Full-row-clickable activity entry. Two variants: `compact` for the Dashboard's Recent Activity list (single inline row: type · highlight (routineContext) PR · duration · timestamp); `full` for the Activities page (two lines). Type dot color is driven by a TYPE_COLOR_MAP — Strength → saffron, Run → moss-positive, others → pewter.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: { control: "text", description: "Workout type label" },
        timestamp: { control: "text", description: "Pre-formatted date/time string" },
        duration: { control: "text", description: "Pre-formatted duration string" },
        highlight: { control: "text", description: "Exercise or event highlight" },
        routineContext: { control: "text", description: "Routine day context — shown in parens after highlight" },
        highlightIsPR: { control: "boolean", description: "True renders saffron PR badge" },
        variant: { control: "radio", options: ["compact", "full"] },
    },
};

export default meta;

type Story = StoryObj<typeof ActivityRow>;

/* ----------------------------------------------------------------------------
 * CompactDefault — Strength row, no PR, no routineContext
 * ---------------------------------------------------------------------------- */

export const CompactDefault: Story = {
    args: {
        type: "Strength",
        timestamp: "Mon, Jun 9",
        duration: "48m",
        highlight: "Squat 225×5",
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * CompactWithContext — Strength row with routineContext
 * ---------------------------------------------------------------------------- */

export const CompactWithContext: Story = {
    args: {
        type: "Strength",
        timestamp: "Mon, Jun 9",
        duration: "52m",
        highlight: "Bench 185×5",
        routineContext: "Push Day 1",
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * CompactWithPR — highlight + routineContext + PR badge
 * ---------------------------------------------------------------------------- */

export const CompactWithPR: Story = {
    args: {
        type: "Strength",
        timestamp: "2h ago",
        duration: "52m",
        highlight: "Bench 185×5",
        routineContext: "Push Day 1",
        highlightIsPR: true,
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * CompactRun — no routineContext (Run type), moss-positive dot
 * ---------------------------------------------------------------------------- */

export const CompactRun: Story = {
    args: {
        type: "Run",
        timestamp: "Sun",
        duration: "32m",
        highlight: "3.1 mi",
        variant: "compact",
    },
};

/* ----------------------------------------------------------------------------
 * FullDefault — two-line layout, no highlight
 * ---------------------------------------------------------------------------- */

export const FullDefault: Story = {
    args: {
        type: "Pull",
        timestamp: "Tue, Jun 10",
        duration: "55m",
        variant: "full",
    },
};

/* ----------------------------------------------------------------------------
 * FullWithPR — full variant with PR badge prefix
 * ---------------------------------------------------------------------------- */

export const FullWithPR: Story = {
    args: {
        type: "Strength",
        timestamp: "Mon, Jun 9",
        duration: "1h 12m",
        highlight: "225 lbs squat",
        highlightIsPR: true,
        variant: "full",
    },
};

/* ----------------------------------------------------------------------------
 * DotColors — saffron / moss-positive / pewter-mute side by side
 * ---------------------------------------------------------------------------- */

export const DotColors: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "480px" }}>
            <ActivityRow type="Strength" timestamp="Mon, Jun 9" duration="48m" highlight="Bench 185×5" routineContext="Push Day 1" variant="compact" />
            <ActivityRow type="Run"      timestamp="Sun, Jun 8" duration="32m" highlight="3.1 mi"      variant="compact" />
            <ActivityRow type="Mobility" timestamp="Sat, Jun 7" duration="20m" highlight="Hip mobility" variant="compact" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * HoverState — hover any row to see pill background
 * ---------------------------------------------------------------------------- */

export const HoverState: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "540px" }}>
            <ActivityRow type="Strength" timestamp="2h ago"     duration="52m" highlight="Bench 185×5"    routineContext="Push Day 1" highlightIsPR={true}  variant="compact" onClick={() => {}} />
            <ActivityRow type="Strength" timestamp="Yesterday"  duration="48m" highlight="Squat 225×5"    routineContext="Legs Day 1"                        variant="compact" onClick={() => {}} />
            <ActivityRow type="Run"      timestamp="Sun"        duration="32m" highlight="3.1 mi"                                                             variant="compact" onClick={() => {}} />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * ListOfRows — compact list as on Dashboard (activeUserData equivalent)
 * ---------------------------------------------------------------------------- */

export const ListOfRows: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "540px",
                border: "1px solid var(--color-linen-border)",
                borderRadius: "var(--radius-cards)",
                overflow: "hidden",
            }}
        >
            <ActivityRow type="Strength" timestamp="2h ago"    duration="52m" highlight="Bench 185×5"    routineContext="Push Day 1" highlightIsPR={true}  variant="compact" />
            <ActivityRow type="Strength" timestamp="Yesterday" duration="48m" highlight="Squat 225×5"    routineContext="Legs Day 1"                        variant="compact" />
            <ActivityRow type="Strength" timestamp="Mon"       duration="1h 5m" highlight="Deadlift 315×3" routineContext="Pull Day 1" highlightIsPR={true} variant="compact" />
            <ActivityRow type="Run"      timestamp="Sun"       duration="32m" highlight="3.1 mi"                                                            variant="compact" />
            <ActivityRow type="Strength" timestamp="Sat"       duration="55m" highlight="Pull 12 sets"   routineContext="Pull Day 2"                        variant="compact" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * FullList — full variant with mixed highlight/PR/no-highlight
 * ---------------------------------------------------------------------------- */

export const FullList: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
            <ActivityRow type="Strength" timestamp="Mon, Jun 9" duration="52m"   highlight="Bench 185×5"    highlightIsPR={true}  variant="full" />
            <ActivityRow type="Run"      timestamp="Sun, Jun 8" duration="32m"   highlight="3.1 mi"                               variant="full" />
            <ActivityRow type="Strength" timestamp="Fri, Jun 6" duration="55m"                                                    variant="full" />
            <ActivityRow type="Strength" timestamp="Wed, Jun 4" duration="1h 12m" highlight="Deadlift 315×3" highlightIsPR={true} variant="full" />
            <ActivityRow type="Mobility" timestamp="Mon, Jun 2" duration="20m"                                                    variant="full" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — SectionTitle("Recent activity") + compact list
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div style={{ maxWidth: "540px" }}>
            <SectionTitle>Recent activity</SectionTitle>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid var(--color-linen-border)",
                    borderRadius: "var(--radius-cards)",
                    overflow: "hidden",
                }}
            >
                <ActivityRow type="Strength" timestamp="2h ago"    duration="52m"   highlight="Bench 185×5" routineContext="Push Day 1" highlightIsPR={true} variant="compact" onClick={() => {}} />
                <ActivityRow type="Strength" timestamp="Yesterday" duration="48m"   highlight="Squat 225×5" routineContext="Legs Day 1"                      variant="compact" onClick={() => {}} />
                <ActivityRow type="Run"      timestamp="Sun"       duration="32m"   highlight="3.1 mi"                                                       variant="compact" onClick={() => {}} />
            </div>
        </div>
    ),
};
