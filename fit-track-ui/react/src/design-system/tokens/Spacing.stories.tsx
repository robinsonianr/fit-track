import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta = {
    title: "Tokens / Spacing",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The FitTrack spacing system. 4px base unit with a moderately-tight scale optimized for daily-use application density. The scale is deliberately discrete — there is no 20px or 40px option — to force designers to pick from the system rather than splitting differences.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

/* ============================================================================
 * Shared building blocks
 * ============================================================================ */

/**
 * SpacingBar renders one spacing token as a horizontal bar at its actual
 * width, with the token name, value, and CSS variable labeled next to it.
 * The bar's actual pixel width is the visual proof of the value.
 */
type SpacingBarProps = {
    name: string;
    value: string;
    token: string;
};

const SpacingBar: React.FC<SpacingBarProps> = ({ name, value, token }) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 200px",
            gap: "var(--spacing-24)",
            alignItems: "center",
            padding: "var(--spacing-16) 0",
            borderBottom: "1px solid var(--color-linen-border)",
        }}
    >
        {/* Name */}
        <div
            style={{
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "var(--text-body)",
                fontWeight: 500,
                color: "var(--color-charcoal-ink)",
            }}
        >
            {name}
        </div>

        {/* Visual bar at actual width */}
        <div>
            <div
                style={{
                    height: "24px",
                    width: value,
                    backgroundColor: "var(--color-indigo-signal)",
                    borderRadius: "var(--radius-badges)",
                }}
                aria-label={`${name} bar at ${value}`}
            />
        </div>

        {/* Metadata */}
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-body)",
                    fontWeight: 500,
                    color: "var(--color-charcoal-ink)",
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                {value}
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
        </div>
    </div>
);

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
 * AllSpacing — the comprehensive view, default story
 * Every spacing token rendered as a bar at its actual width.
 * ---------------------------------------------------------------------------- */

export const AllSpacing: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Spacing Scale"
                description="4px base unit. Nine values total — note the deliberate gaps (no 20px between 16 and 24, no 40px between 32 and 48). The skipped values exist so designers pick from the discrete scale rather than reaching for arbitrary in-between values."
            />

            <SpacingBar name="4" value="4px" token="--spacing-4" />
            <SpacingBar name="8" value="8px" token="--spacing-8" />
            <SpacingBar name="12" value="12px" token="--spacing-12" />
            <SpacingBar name="16" value="16px" token="--spacing-16" />
            <SpacingBar name="24" value="24px" token="--spacing-24" />
            <SpacingBar name="32" value="32px" token="--spacing-32" />
            <SpacingBar name="48" value="48px" token="--spacing-48" />
            <SpacingBar name="64" value="64px" token="--spacing-64" />
            <SpacingBar name="96" value="96px" token="--spacing-96" />
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * UsageExamples — shows how spacing tokens are applied in realistic UI contexts
 * ----------------------------------------------------------------------------
 * Pairs the spacing token with the typical use case so designers and
 * engineers can see how each value functions in practice.
 * ---------------------------------------------------------------------------- */

export const UsageExamples: Story = {
    render: () => {
        const examples = [
            {
                token: "--spacing-4",
                value: "4px",
                usage: "Tightest gap — adjacent metadata lines, icon-to-label spacing in dense badges",
            },
            {
                token: "--spacing-8",
                value: "8px",
                usage: "Compact internal spacing — button vertical padding, badge horizontal padding",
            },
            {
                token: "--spacing-12",
                value: "12px",
                usage: "Tight rhythm — row spacing in dense tables, vertical gap between related elements",
            },
            {
                token: "--spacing-16",
                value: "16px",
                usage: "Default element gap — spacing between sibling elements inside a card, ExerciseRow vertical padding",
            },
            {
                token: "--spacing-24",
                value: "24px",
                usage: "Default card padding — internal padding of MetricCard, RoutineCard, and most card components",
            },
            {
                token: "--spacing-32",
                value: "32px",
                usage: "Hero card padding — internal padding of DuotoneCard and other hero surfaces",
            },
            {
                token: "--spacing-48",
                value: "48px",
                usage: "Section gap — vertical spacing between major dashboard sections",
            },
            {
                token: "--spacing-64",
                value: "64px",
                usage: "Major section break — vertical spacing between distinct page regions",
            },
            {
                token: "--spacing-96",
                value: "96px",
                usage: "Page-level breathing room — vertical spacing for narrative pages or sparse layouts",
            },
        ];

        return (
            <div>
                <SectionHeading
                    title="Spacing Usage"
                    description="How each spacing token is used in the FitTrack interface. The token name maps to a specific category of use — internal padding, element gaps, section breaks — so the scale is legible at the component level."
                />

                <div style={{ marginTop: "var(--spacing-32)" }}>
                    {examples.map((example) => (
                        <div
                            key={example.token}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "80px 1fr",
                                gap: "var(--spacing-24)",
                                alignItems: "start",
                                padding: "var(--spacing-16) 0",
                                borderBottom: "1px solid var(--color-linen-border)",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "var(--text-mono-body)",
                                    fontWeight: 500,
                                    color: "var(--color-indigo-signal)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {example.value}
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "var(--text-mono-label)",
                                        color: "var(--color-pewter-mute)",
                                        fontVariantNumeric: "tabular-nums",
                                        marginBottom: "var(--spacing-4)",
                                    }}
                                >
                                    {example.token}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "var(--text-body)",
                                        lineHeight: "var(--leading-normal)",
                                        color: "var(--color-charcoal-ink)",
                                        letterSpacing: "var(--tracking-body)",
                                    }}
                                >
                                    {example.usage}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};

/* ----------------------------------------------------------------------------
 * ComparisonGrid — visual side-by-side of all spacing values stacked vertically
 * ----------------------------------------------------------------------------
 * Useful for visual calibration — seeing all values together makes the scale's
 * progression legible at a glance.
 * ---------------------------------------------------------------------------- */

export const ComparisonGrid: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Scale Comparison"
                description="All spacing values stacked vertically at actual pixel width. Useful for visualizing how the scale progresses from compact internal spacing (4-12px) through component padding (16-32px) to page-level rhythm (48-96px)."
            />

            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-8)",
                }}
            >
                {[
                    { name: "4px", value: "4px" },
                    { name: "8px", value: "8px" },
                    { name: "12px", value: "12px" },
                    { name: "16px", value: "16px" },
                    { name: "24px", value: "24px" },
                    { name: "32px", value: "32px" },
                    { name: "48px", value: "48px" },
                    { name: "64px", value: "64px" },
                    { name: "96px", value: "96px" },
                ].map((item) => (
                    <div
                        key={item.name}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "60px 1fr",
                            gap: "var(--spacing-16)",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-mono-label)",
                                color: "var(--color-pewter-mute)",
                                fontVariantNumeric: "tabular-nums",
                                textAlign: "right",
                            }}
                        >
                            {item.name}
                        </div>
                        <div
                            style={{
                                height: "20px",
                                width: item.value,
                                backgroundColor: "var(--color-charcoal-ink)",
                                borderRadius: "var(--radius-badges)",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    ),
};