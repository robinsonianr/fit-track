import type { Meta, StoryObj } from "@storybook/react-vite";
import { InsightCard } from "./InsightCard";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const meta: Meta<typeof InsightCard> = {
    title: "Components / Dashboard / InsightCard",
    component: InsightCard,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Observation-only card for the Dashboard's Noticed section. Renders one sentence. No actions, no links — the companion voice observes, it does not prescribe. `body` is typed as `string` to enforce this at the API level.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        body: {
            control: "text",
            description: "Observational sentence. Plain string — no rich content.",
        },
        eyebrow: {
            control: "text",
            description: "Optional monospace eyebrow label (e.g. \"NOTICED\")",
        },
    },
};

export default meta;

type Story = StoryObj<typeof InsightCard>;

/* ----------------------------------------------------------------------------
 * Default
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    args: {
        body: "You trained 3 times this week, up from 2 last week.",
    },
};

/* ----------------------------------------------------------------------------
 * WithEyebrow — the intended full treatment
 * ---------------------------------------------------------------------------- */

export const WithEyebrow: Story = {
    args: {
        eyebrow: "Noticed",
        body: "You trained 3 times this week, up from 2 last week.",
    },
};

/* ----------------------------------------------------------------------------
 * LongBody — verify line-break handling
 * ---------------------------------------------------------------------------- */

export const LongBody: Story = {
    args: {
        eyebrow: "Noticed",
        body: "Your average session duration has increased by 8 minutes over the past three weeks, which suggests your work capacity is growing without a corresponding drop in workout frequency.",
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "480px" }}>
                <Story />
            </div>
        ),
    ],
};

/* ----------------------------------------------------------------------------
 * CompanionVoiceExamples — three cards showing right vs. wrong copy
 * The right kind: observational. The wrong kind: prescriptive.
 * ---------------------------------------------------------------------------- */

export const CompanionVoiceExamples: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
            {/* Good examples — observational, present-tense, no prescription */}
            <InsightCard
                eyebrow="Noticed"
                body="You trained 3 times this week, up from 2 last week."
            />
            <InsightCard
                eyebrow="Noticed"
                body="Your push sessions have been averaging 48 minutes this month."
            />
            <InsightCard
                eyebrow="Noticed"
                body="Tuesday is your most consistent training day — you&apos;ve hit it 8 of the last 9 weeks."
            />
            {/*
             * Companion voice rules for InsightCard copy:
             *   ✓ Factual, present-tense, past-tense observation
             *   ✓ References the user's own data
             *   ✓ No imperative verbs ("try", "consider", "add", "reduce")
             *   ✓ No editorial framing ("great job", "you need to", "you should")
             *   ✗ Avoid: "Try adding a rest day this week."
             *   ✗ Avoid: "You should consider reducing volume."
             *   ✗ Avoid: "Great job hitting your target!"
             */}
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * InContext — preceded by SectionTitle("Noticed")
 * Verifies rhythm: SectionTitle 12px gap → InsightCard
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => (
        <div style={{ maxWidth: "480px" }}>
            {/* SectionTitle already labels the section — eyebrow omitted to avoid
                reading "NOTICED" twice. Pass eyebrow only when InsightCard
                appears without a parent SectionTitle. */}
            <SectionTitle>Noticed</SectionTitle>
            <InsightCard
                body="You trained 3 times this week, up from 2 last week."
            />
        </div>
    ),
};