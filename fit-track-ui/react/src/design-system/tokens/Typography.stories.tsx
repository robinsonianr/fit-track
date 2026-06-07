import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta = {
    title: "Tokens / Typography",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The FitTrack typography system. Two typefaces with non-overlapping roles: AeonikPro carries the companion voice (everything the app says), JetBrains Mono carries the tool voice (every measurement the app shows). The typographic split is how the system expresses its two voices.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

/* ============================================================================
 * Shared building blocks — used by every story in this file
 * ============================================================================ */

/**
 * TypeSample renders a single typography role with its sample text and a
 * sidebar of metadata (size, weight, line-height, letter-spacing, token name).
 * The sample text and the metadata sit side-by-side so the visual rendering
 * and the spec are visible together.
 */
type TypeSampleProps = {
    /** Display name of the role (e.g. "Hero", "Body") */
    name: string;
    /** Sample text rendered at this role's spec */
    sample: string;
    /** Font family CSS variable (e.g. "var(--font-aeonikpro)") */
    fontFamily: string;
    /** Font size in px or CSS variable */
    fontSize: string;
    /** Font weight numeric value */
    fontWeight: number;
    /** Line height (unitless or with em/px) */
    lineHeight: string | number;
    /** Letter spacing (em or px) */
    letterSpacing: string;
    /** Whether to apply tabular-nums + slashed-zero (for mono numeric samples) */
    numeric?: boolean;
    /** Token variable name(s) for the metadata sidebar */
    token: string;
};

const TypeSample: React.FC<TypeSampleProps> = ({
    name,
    sample,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    numeric = false,
    token,
}) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 240px",
            gap: "var(--spacing-32)",
            alignItems: "baseline",
            padding: "var(--spacing-24) 0",
            borderBottom: "1px solid var(--color-linen-border)",
        }}
    >
        {/* Sample text — renders at the actual role spec */}
        <div
            style={{
                fontFamily,
                fontSize,
                fontWeight,
                lineHeight,
                letterSpacing,
                color: "var(--color-charcoal-ink)",
                fontVariantNumeric: numeric ? "tabular-nums slashed-zero" : "normal",
            }}
        >
            {sample}
        </div>

        {/* Metadata sidebar — name, token, and spec values */}
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
                paddingTop: "var(--spacing-8)",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "var(--text-small)",
                    fontWeight: 500,
                    color: "var(--color-charcoal-ink)",
                    letterSpacing: "var(--tracking-small)",
                }}
            >
                {name}
            </div>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-label)",
                    color: "var(--color-pewter-mute)",
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                {token}
            </div>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-label)",
                    color: "var(--color-smoke-ink)",
                    fontVariantNumeric: "tabular-nums",
                    marginTop: "var(--spacing-4)",
                }}
            >
                {fontSize} · {fontWeight} · {lineHeight}
                <br />
                tracking {letterSpacing}
            </div>
        </div>
    </div>
);

/**
 * SectionHeading — same pattern as Colors.stories.tsx for visual consistency
 */
const SectionHeading: React.FC<{
    title: string;
    description?: string;
}> = ({ title, description }) => (
    <div style={{ marginBottom: "var(--spacing-16)" }}>
        <h2
            style={{
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "var(--text-subheading)",
                fontWeight: 500,
                lineHeight: "var(--leading-tight)",
                letterSpacing: "var(--tracking-heading)",
                color: "var(--color-charcoal-ink)",
                margin: 0,
            }}
        >
            {title}
        </h2>
        {description && (
            <p
                style={{
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--leading-normal)",
                    color: "var(--color-smoke-ink)",
                    marginTop: "var(--spacing-8)",
                    marginBottom: 0,
                    maxWidth: "60ch",
                }}
            >
                {description}
            </p>
        )}
    </div>
);

const SectionContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <section style={{ marginBottom: "var(--spacing-64)" }}>{children}</section>
);

/* ============================================================================
 * STORIES
 * ============================================================================ */

/* ----------------------------------------------------------------------------
 * AllTypography — comprehensive overview; the default story
 * Shows every role in both typefaces in their natural hierarchy.
 * ---------------------------------------------------------------------------- */

export const AllTypography: Story = {
    render: () => (
        <div>
            <SectionContainer>
                <SectionHeading
                    title="AeonikPro — Companion Voice"
                    description="Everything the app says. Body copy, navigation, labels, headings, hero display. Geometric proportions with ss02 and ss08 stylistic alternates enabled."
                />

                <TypeSample
                    name="Display"
                    token="--text-display"
                    sample="Welcome back, Long"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-display)"
                    fontWeight={400}
                    lineHeight="var(--leading-hero)"
                    letterSpacing="var(--tracking-hero)"
                />
                <TypeSample
                    name="Hero"
                    token="--text-hero"
                    sample="Welcome back, Long"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-hero)"
                    fontWeight={400}
                    lineHeight="var(--leading-hero)"
                    letterSpacing="var(--tracking-hero)"
                />
                <TypeSample
                    name="Heading"
                    token="--text-heading"
                    sample="This week"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-heading)"
                    fontWeight={500}
                    lineHeight="var(--leading-tight)"
                    letterSpacing="var(--tracking-heading)"
                />
                <TypeSample
                    name="Subheading"
                    token="--text-subheading"
                    sample="Recent workouts"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-subheading)"
                    fontWeight={500}
                    lineHeight="var(--leading-tight)"
                    letterSpacing="var(--tracking-heading)"
                />
                <TypeSample
                    name="Card Title"
                    token="--text-card-title"
                    sample="Pull Day 2"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-card-title)"
                    fontWeight={500}
                    lineHeight="var(--leading-card)"
                    letterSpacing="var(--tracking-card)"
                />
                <TypeSample
                    name="Body Large"
                    token="--text-body-lg"
                    sample="Tuesday is usually Pull Day 2."
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-body-lg)"
                    fontWeight={400}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-normal)"
                />
                <TypeSample
                    name="Body"
                    token="--text-body"
                    sample="The quiet companion that remembers what you've been doing."
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-body)"
                    fontWeight={400}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-body)"
                />
                <TypeSample
                    name="Small"
                    token="--text-small"
                    sample="Last logged 4 days ago"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-small)"
                    fontWeight={400}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-small)"
                />
                <TypeSample
                    name="Label"
                    token="--text-label"
                    sample="THIS WEEK"
                    fontFamily="var(--font-aeonikpro)"
                    fontSize="var(--text-label)"
                    fontWeight={500}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-small)"
                />
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="JetBrains Mono — Tool Voice"
                    description="Every measurement the app shows. Numbers, sets, reps, weights, timers, dates. Tabular figures and slashed zero enabled. Never used for prose."
                />

                <TypeSample
                    name="Readout XL"
                    token="--text-mono-readout-xl"
                    sample="225 lb"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-readout-xl)"
                    fontWeight={700}
                    lineHeight="var(--leading-hero)"
                    letterSpacing="var(--tracking-mono-hero)"
                    numeric
                />
                <TypeSample
                    name="Readout Large"
                    token="--text-mono-readout-lg"
                    sample="2,368"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-readout-lg)"
                    fontWeight={500}
                    lineHeight="var(--leading-hero)"
                    letterSpacing="var(--tracking-mono-hero)"
                    numeric
                />
                <TypeSample
                    name="Readout"
                    token="--text-mono-readout"
                    sample="3 of 4"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-readout)"
                    fontWeight={500}
                    lineHeight="var(--leading-hero)"
                    letterSpacing="var(--tracking-mono-hero)"
                    numeric
                />
                <TypeSample
                    name="Data XL"
                    token="--text-mono-xl"
                    sample="48m 12s"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-xl)"
                    fontWeight={500}
                    lineHeight="var(--leading-tight)"
                    letterSpacing="var(--tracking-mono-large)"
                    numeric
                />
                <TypeSample
                    name="Data Large"
                    token="--text-mono-large"
                    sample="135 × 5 × 3"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-large)"
                    fontWeight={500}
                    lineHeight="var(--leading-tight)"
                    letterSpacing="var(--tracking-mono-large)"
                    numeric
                />
                <TypeSample
                    name="Data Medium"
                    token="--text-mono-medium"
                    sample="00:47"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-medium)"
                    fontWeight={500}
                    lineHeight="var(--leading-snug)"
                    letterSpacing="var(--tracking-mono-normal)"
                    numeric
                />
                <TypeSample
                    name="Data Body"
                    token="--text-mono-body"
                    sample="Wed, 27 May 2026"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-body)"
                    fontWeight={400}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-mono-normal)"
                    numeric
                />
                <TypeSample
                    name="Table"
                    token="--text-mono-table"
                    sample="3 sets × 135 lb"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-table)"
                    fontWeight={400}
                    lineHeight="var(--leading-table)"
                    letterSpacing="var(--tracking-mono-small)"
                    numeric
                />
                <TypeSample
                    name="Data Label"
                    token="--text-mono-label"
                    sample="JAN APR JUL OCT"
                    fontFamily="var(--font-mono)"
                    fontSize="var(--text-mono-label)"
                    fontWeight={400}
                    lineHeight="var(--leading-normal)"
                    letterSpacing="var(--tracking-mono-small)"
                    numeric
                />
            </SectionContainer>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * AeonikProScale — focused view of just the companion voice
 * ---------------------------------------------------------------------------- */

export const AeonikProScale: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="AeonikPro Scale"
                description="The complete role hierarchy for the companion voice. Used by everything the app says — body, navigation, labels, headings, hero display."
            />
            <TypeSample
                name="Display · 101px / 400"
                token="--text-display"
                sample="Welcome back, Long"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-display)"
                fontWeight={400}
                lineHeight="var(--leading-hero)"
                letterSpacing="var(--tracking-hero)"
            />
            <TypeSample
                name="Hero · 72px / 400"
                token="--text-hero"
                sample="Welcome back, Long"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-hero)"
                fontWeight={400}
                lineHeight="var(--leading-hero)"
                letterSpacing="var(--tracking-hero)"
            />
            <TypeSample
                name="Heading · 36px / 500"
                token="--text-heading"
                sample="This week"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-heading)"
                fontWeight={500}
                lineHeight="var(--leading-tight)"
                letterSpacing="var(--tracking-heading)"
            />
            <TypeSample
                name="Subheading · 32px / 500"
                token="--text-subheading"
                sample="Recent workouts"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-subheading)"
                fontWeight={500}
                lineHeight="var(--leading-tight)"
                letterSpacing="var(--tracking-heading)"
            />
            <TypeSample
                name="Card Title · 24px / 500"
                token="--text-card-title"
                sample="Pull Day 2"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-card-title)"
                fontWeight={500}
                lineHeight="var(--leading-card)"
                letterSpacing="var(--tracking-card)"
            />
            <TypeSample
                name="Body Large · 18px / 400"
                token="--text-body-lg"
                sample="Tuesday is usually Pull Day 2."
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-body-lg)"
                fontWeight={400}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-normal)"
            />
            <TypeSample
                name="Body · 16px / 400"
                token="--text-body"
                sample="The quiet companion that remembers what you've been doing."
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-body)"
                fontWeight={400}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-body)"
            />
            <TypeSample
                name="Small · 14px / 400"
                token="--text-small"
                sample="Last logged 4 days ago"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-small)"
                fontWeight={400}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-small)"
            />
            <TypeSample
                name="Label · 12px / 500"
                token="--text-label"
                sample="THIS WEEK"
                fontFamily="var(--font-aeonikpro)"
                fontSize="var(--text-label)"
                fontWeight={500}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-small)"
            />
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * MonoScale — focused view of just the tool voice
 * ---------------------------------------------------------------------------- */

export const MonoScale: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="JetBrains Mono Scale"
                description="The complete role hierarchy for the tool voice. Used by every measurement — numbers, sets, reps, weights, timers, dates. Tabular-figures and slashed-zero enabled throughout."
            />
            <TypeSample
                name="Readout XL · 101px / 700"
                token="--text-mono-readout-xl"
                sample="225 lb"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-readout-xl)"
                fontWeight={700}
                lineHeight="var(--leading-hero)"
                letterSpacing="var(--tracking-mono-hero)"
                numeric
            />
            <TypeSample
                name="Readout Large · 72px / 500"
                token="--text-mono-readout-lg"
                sample="2,368"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-readout-lg)"
                fontWeight={500}
                lineHeight="var(--leading-hero)"
                letterSpacing="var(--tracking-mono-hero)"
                numeric
            />
            <TypeSample
                name="Readout · 56px / 500"
                token="--text-mono-readout"
                sample="3 of 4"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-readout)"
                fontWeight={500}
                lineHeight="var(--leading-hero)"
                letterSpacing="var(--tracking-mono-hero)"
                numeric
            />
            <TypeSample
                name="Data XL · 48px / 500"
                token="--text-mono-xl"
                sample="48m 12s"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-xl)"
                fontWeight={500}
                lineHeight="var(--leading-tight)"
                letterSpacing="var(--tracking-mono-large)"
                numeric
            />
            <TypeSample
                name="Data Large · 32px / 500"
                token="--text-mono-large"
                sample="135 × 5 × 3"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-large)"
                fontWeight={500}
                lineHeight="var(--leading-tight)"
                letterSpacing="var(--tracking-mono-large)"
                numeric
            />
            <TypeSample
                name="Data Medium · 24px / 500"
                token="--text-mono-medium"
                sample="00:47"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-medium)"
                fontWeight={500}
                lineHeight="var(--leading-snug)"
                letterSpacing="var(--tracking-mono-normal)"
                numeric
            />
            <TypeSample
                name="Data Body · 16px / 400"
                token="--text-mono-body"
                sample="Wed, 27 May 2026"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-body)"
                fontWeight={400}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-mono-normal)"
                numeric
            />
            <TypeSample
                name="Table · 14px / 400"
                token="--text-mono-table"
                sample="3 sets × 135 lb"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-table)"
                fontWeight={400}
                lineHeight="var(--leading-table)"
                letterSpacing="var(--tracking-mono-small)"
                numeric
            />
            <TypeSample
                name="Data Label · 12px / 400"
                token="--text-mono-label"
                sample="JAN APR JUL OCT"
                fontFamily="var(--font-mono)"
                fontSize="var(--text-mono-label)"
                fontWeight={400}
                lineHeight="var(--leading-normal)"
                letterSpacing="var(--tracking-mono-small)"
                numeric
            />
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * TwoVoices — the teaching story
 * ----------------------------------------------------------------------------
 * Side-by-side comparison of AeonikPro and JetBrains Mono in a realistic
 * FitTrack context. Demonstrates the "companion voice / tool voice" split
 * as users would actually encounter it on the dashboard.
 * ---------------------------------------------------------------------------- */

export const TwoVoices: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Two Voices"
                description="The typographic split that defines the system. AeonikPro carries what the app says; JetBrains Mono carries what the app shows. Each typeface has a non-overlapping role."
            />

            {/* Realistic dashboard hero composition */}
            <div
                style={{
                    marginTop: "var(--spacing-48)",
                    padding: "var(--spacing-32)",
                    backgroundColor: "var(--color-vellum-surface)",
                    borderRadius: "var(--radius-hero-cards)",
                    maxWidth: "560px",
                }}
            >
                {/* Eyebrow — AeonikPro Label */}
                <div
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "var(--text-label)",
                        fontWeight: 500,
                        letterSpacing: "var(--tracking-small)",
                        color: "var(--color-pewter-mute)",
                        textTransform: "uppercase",
                        marginBottom: "var(--spacing-12)",
                    }}
                >
                    This week
                </div>

                {/* Hero number — JetBrains Mono Readout */}
                <div
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-mono-readout)",
                        fontWeight: 500,
                        lineHeight: "var(--leading-hero)",
                        letterSpacing: "var(--tracking-mono-hero)",
                        color: "var(--color-indigo-signal)",
                        fontVariantNumeric: "tabular-nums slashed-zero",
                        marginBottom: "var(--spacing-16)",
                    }}
                >
                    3 of 4
                </div>

                {/* Secondary line — AeonikPro Body */}
                <div
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "var(--text-body)",
                        lineHeight: "var(--leading-normal)",
                        color: "var(--color-smoke-ink)",
                        letterSpacing: "var(--tracking-body)",
                    }}
                >
                    Tuesday is usually Pull Day 2.
                </div>
            </div>

            {/* Annotation */}
            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    maxWidth: "60ch",
                }}
            >
                <p
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "var(--text-body)",
                        lineHeight: "var(--leading-normal)",
                        color: "var(--color-smoke-ink)",
                    }}
                >
                    The label ("This week"), the secondary line ("Tuesday is usually
                    Pull Day 2"), and any prose render in AeonikPro. The measurement
                    ("3 of 4") renders in JetBrains Mono. The user reads the words; the
                    data reads as data. The split is non-negotiable.
                </p>
            </div>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * NumericDisplay — pure data examples showcasing mono's number rendering
 * ---------------------------------------------------------------------------- */

export const NumericDisplay: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Numeric Display"
                description="JetBrains Mono at every size that data appears in the app. Note tabular figures (every digit the same width), slashed zero (distinguishable from O), and consistent rendering across sizes."
            />

            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: "var(--spacing-24)",
                }}
            >
                {[
                    {
                        label: "PR readout",
                        value: "225 lb",
                        size: "var(--text-mono-readout-lg)",
                        weight: 700,
                        color: "var(--color-saffron-mark)",
                    },
                    {
                        label: "Volume lifted",
                        value: "2,368",
                        size: "var(--text-mono-readout)",
                        weight: 500,
                        color: "var(--color-charcoal-ink)",
                    },
                    {
                        label: "Adherence",
                        value: "3 of 4",
                        size: "var(--text-mono-readout)",
                        weight: 500,
                        color: "var(--color-indigo-signal)",
                    },
                    {
                        label: "Session timer",
                        value: "00:47",
                        size: "var(--text-mono-xl)",
                        weight: 500,
                        color: "var(--color-charcoal-ink)",
                    },
                    {
                        label: "Set readout",
                        value: "135 × 5 × 3",
                        size: "var(--text-mono-large)",
                        weight: 500,
                        color: "var(--color-charcoal-ink)",
                    },
                    {
                        label: "1RM estimate",
                        value: "24.5 lb",
                        size: "var(--text-mono-medium)",
                        weight: 500,
                        color: "var(--color-charcoal-ink)",
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        style={{
                            padding: "var(--spacing-24)",
                            backgroundColor: "var(--color-vellum-surface)",
                            borderRadius: "var(--radius-cards)",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-label)",
                                fontWeight: 500,
                                letterSpacing: "var(--tracking-small)",
                                color: "var(--color-pewter-mute)",
                                textTransform: "uppercase",
                                marginBottom: "var(--spacing-12)",
                            }}
                        >
                            {item.label}
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: item.size,
                                fontWeight: item.weight,
                                lineHeight: "var(--leading-hero)",
                                letterSpacing: "var(--tracking-mono-hero)",
                                color: item.color,
                                fontVariantNumeric: "tabular-nums slashed-zero",
                            }}
                        >
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * OpenTypeFeatures — verifies stylistic alternates and tabular numerics
 * ----------------------------------------------------------------------------
 * Side-by-side comparison of typography with/without OpenType features enabled.
 * Lets you visually confirm that ss02, ss08, dlig, tnum, and zero are active.
 * ---------------------------------------------------------------------------- */

export const OpenTypeFeatures: Story = {
    render: () => {
        /** Pairs of (label, off-style, on-style) for visual comparison */
        const aeonikFeatures = [
            {
                label: "Default vs ss02 + ss08 + dlig",
                sample: "Going to the gym again",
                offFeatures: "normal",
                onFeatures: '"ss02" on, "ss08" on, "dlig" on',
            },
        ];

        const monoFeatures = [
            {
                label: "Default vs tabular-nums + slashed-zero",
                sample: "0123456789",
                offFeatures: "normal",
                onFeatures: '"tnum" on, "zero" on',
            },
        ];

        return (
            <div>
                <SectionHeading
                    title="OpenType Features"
                    description="The stylistic alternates and numeric features that give each typeface its FitTrack-specific voice. Enabled globally via tokens.css base layer."
                />

                {/* AeonikPro feature comparison */}
                <div style={{ marginTop: "var(--spacing-48)" }}>
                    <h3
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-card-title)",
                            fontWeight: 500,
                            color: "var(--color-charcoal-ink)",
                            marginBottom: "var(--spacing-16)",
                        }}
                    >
                        AeonikPro stylistic alternates
                    </h3>

                    {aeonikFeatures.map((feature) => (
                        <div
                            key={feature.label}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "var(--spacing-32)",
                                padding: "var(--spacing-24) 0",
                                borderBottom: "1px solid var(--color-linen-border)",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-label)",
                                        color: "var(--color-pewter-mute)",
                                        marginBottom: "var(--spacing-8)",
                                    }}
                                >
                                    Default
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "var(--text-subheading)",
                                        fontWeight: 400,
                                        color: "var(--color-charcoal-ink)",
                                        fontFeatureSettings: feature.offFeatures,
                                    }}
                                >
                                    {feature.sample}
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-label)",
                                        color: "var(--color-pewter-mute)",
                                        marginBottom: "var(--spacing-8)",
                                    }}
                                >
                                    ss02 + ss08 + dlig
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "var(--text-subheading)",
                                        fontWeight: 400,
                                        color: "var(--color-charcoal-ink)",
                                        fontFeatureSettings: feature.onFeatures,
                                    }}
                                >
                                    {feature.sample}
                                </div>
                            </div>
                        </div>
                    ))}

                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: "var(--leading-normal)",
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                            maxWidth: "60ch",
                        }}
                    >
                        ss08 opens the 'a' and 'e'; ss02 alters the 'g'; dlig enables
                        discretionary ligatures. The differences are subtle but cumulative
                        — they're what give AeonikPro its engineering-precise voice in
                        FitTrack rather than reading as generic geometric sans.
                    </p>
                </div>

                {/* JetBrains Mono feature comparison */}
                <div style={{ marginTop: "var(--spacing-48)" }}>
                    <h3
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-card-title)",
                            fontWeight: 500,
                            color: "var(--color-charcoal-ink)",
                            marginBottom: "var(--spacing-16)",
                        }}
                    >
                        JetBrains Mono numeric features
                    </h3>

                    {monoFeatures.map((feature) => (
                        <div
                            key={feature.label}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "var(--spacing-32)",
                                padding: "var(--spacing-24) 0",
                                borderBottom: "1px solid var(--color-linen-border)",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-label)",
                                        color: "var(--color-pewter-mute)",
                                        marginBottom: "var(--spacing-8)",
                                    }}
                                >
                                    Default
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-large)",
                                        fontWeight: 500,
                                        color: "var(--color-charcoal-ink)",
                                        fontFeatureSettings: feature.offFeatures,
                                    }}
                                >
                                    {feature.sample}
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-label)",
                                        color: "var(--color-pewter-mute)",
                                        marginBottom: "var(--spacing-8)",
                                    }}
                                >
                                    tnum + zero
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-large)",
                                        fontWeight: 500,
                                        color: "var(--color-charcoal-ink)",
                                        fontFeatureSettings: feature.onFeatures,
                                    }}
                                >
                                    {feature.sample}
                                </div>
                            </div>
                        </div>
                    ))}

                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: "var(--leading-normal)",
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                            maxWidth: "60ch",
                        }}
                    >
                        tnum enforces tabular figures — every digit is the same width, so
                        numbers don't jitter when they animate or update. zero adds a slash
                        through the zero to distinguish it from capital O. Both features
                        are non-negotiable for a data-display typeface in a tracking app.
                    </p>
                </div>
            </div>
        );
    },
};