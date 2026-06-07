import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta = {
    title: "Tokens / Surfaces",
    parameters: {
        layout: "padded",
        parameters: {
            backgrounds: {
                default: "Paper Canvas",
            },
        },
        docs: {
            description: {
                component:
                    "The FitTrack surface system. Five tonal levels carry the visual hierarchy that other systems would carry with shadows. Surfaces step from Paper Canvas (page) through Vellum Surface (cards) to Ash Inset (nested), with two accent-adjacent surfaces (Indigo Wash, Saffron Wash) for interactive and celebratory contexts.",
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
 * SurfaceCard renders one surface level as a substantial colored block with
 * label, value, token, and role description below.
 */
type SurfaceCardProps = {
    level: number;
    name: string;
    value: string;
    token: string;
    role: string;
};

const SurfaceCard: React.FC<SurfaceCardProps> = ({
    level,
    name,
    value,
    token,
    role,
}) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "var(--radius-cards)",
            overflow: "hidden",
            border: "1px solid var(--color-linen-border)",
        }}
    >
        {/* Surface preview — substantial size to demonstrate tonal character */}
        <div
            style={{
                height: "200px",
                backgroundColor: value,
                display: "flex",
                alignItems: "flex-end",
                padding: "var(--spacing-16)",
            }}
            aria-label={`${name} surface preview`}
        >
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-label)",
                    color: "var(--color-pewter-mute)",
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                LEVEL {level}
            </div>
        </div>

        {/* Metadata block on Paper Canvas for legibility */}
        <div
            style={{
                padding: "var(--spacing-16)",
                backgroundColor: "var(--color-paper-canvas)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
            }}
        >
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
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-table)",
                    color: "var(--color-smoke-ink)",
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
                    marginTop: "var(--spacing-4)",
                }}
            >
                {token}
            </div>
            <div
                style={{
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "var(--text-small)",
                    lineHeight: 1.4,
                    color: "var(--color-smoke-ink)",
                    marginTop: "var(--spacing-8)",
                }}
            >
                {role}
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
 * AllSurfaces — comprehensive view; default story
 * Five surface levels in their tonal order with role descriptions.
 * ---------------------------------------------------------------------------- */

export const AllSurfaces: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Surface Levels"
                description="Five tonal levels that carry the visual hierarchy. The system is border-driven and tone-driven; elevation never comes from shadows. Each level signals a specific kind of surface — page, card, nested element, interactive context, celebratory context."
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "var(--spacing-24)",
                    marginTop: "var(--spacing-32)",
                }}
            >
                <SurfaceCard
                    level={0}
                    name="Paper Canvas"
                    value="#FAFAF8"
                    token="--color-paper-canvas"
                    role="Page background, default surface — the dominant tone across the entire interface. Reads as paper, not screen."
                />
                <SurfaceCard
                    level={1}
                    name="Vellum Surface"
                    value="#F2F1ED"
                    token="--color-vellum-surface"
                    role="Elevated card backgrounds, modal surfaces, dashboard panels lifted off the canvas. The home of most card components."
                />
                <SurfaceCard
                    level={2}
                    name="Ash Inset"
                    value="#E8E7E2"
                    token="--color-ash-inset"
                    role="Nested surfaces inside cards, alternating table rows, deeper tonal moments where a third level is needed."
                />
                <SurfaceCard
                    level={3}
                    name="Indigo Wash"
                    value="#EEEEFB"
                    token="--color-indigo-wash"
                    role="Selected-row and active-state backgrounds for interactive surfaces. Carries the cool accent into background washes."
                />
                <SurfaceCard
                    level={4}
                    name="Saffron Wash"
                    value="#FEF9C3"
                    token="--color-saffron-wash"
                    role="Celebration-adjacent surfaces — PR rows, milestone backgrounds, achievement contexts. The rarest surface in the system."
                />
            </div>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * Hierarchy — demonstrates the tonal progression with nested surfaces
 * ----------------------------------------------------------------------------
 * Shows surfaces nested inside each other to demonstrate how the tonal
 * hierarchy works in practice — Paper Canvas at the page level, Vellum
 * Surface for cards, Ash Inset for nested elements.
 * ---------------------------------------------------------------------------- */

export const Hierarchy: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Tonal Hierarchy"
                description="The five surface levels nested as they would appear in a real interface. Paper Canvas at the page level. Vellum Surface as a card. Ash Inset as a nested element inside the card. Indigo Wash and Saffron Wash as state-specific surfaces."
            />

            {/* Page level — Paper Canvas */}
            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    padding: "var(--spacing-32)",
                    backgroundColor: "var(--color-paper-canvas)",
                    border: "1px solid var(--color-linen-border)",
                    borderRadius: "var(--radius-cards)",
                }}
            >
                <div
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-mono-label)",
                        color: "var(--color-pewter-mute)",
                        marginBottom: "var(--spacing-16)",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    LEVEL 0 · PAPER CANVAS · #FAFAF8
                </div>

                {/* Card level — Vellum Surface */}
                <div
                    style={{
                        padding: "var(--spacing-24)",
                        backgroundColor: "var(--color-vellum-surface)",
                        borderRadius: "var(--radius-cards)",
                        marginBottom: "var(--spacing-16)",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                            marginBottom: "var(--spacing-16)",
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        LEVEL 1 · VELLUM SURFACE · #F2F1ED
                    </div>

                    {/* Nested level — Ash Inset */}
                    <div
                        style={{
                            padding: "var(--spacing-16)",
                            backgroundColor: "var(--color-ash-inset)",
                            borderRadius: "var(--radius-inputs)",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-mono-label)",
                                color: "var(--color-pewter-mute)",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            LEVEL 2 · ASH INSET · #E8E7E2
                        </div>
                    </div>
                </div>

                {/* Interactive state — Indigo Wash */}
                <div
                    style={{
                        padding: "var(--spacing-24)",
                        backgroundColor: "var(--color-indigo-wash)",
                        borderRadius: "var(--radius-cards)",
                        marginBottom: "var(--spacing-16)",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-smoke-ink)",
                            fontVariantNumeric: "tabular-nums",
                            marginBottom: "var(--spacing-8)",
                        }}
                    >
                        LEVEL 3 · INDIGO WASH · #EEEEFB
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            color: "var(--color-smoke-ink)",
                        }}
                    >
                        Used for selected rows, active states, and accent-adjacent backgrounds.
                    </div>
                </div>

                {/* Celebration state — Saffron Wash */}
                <div
                    style={{
                        padding: "var(--spacing-24)",
                        backgroundColor: "var(--color-saffron-wash)",
                        borderRadius: "var(--radius-cards)",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-smoke-ink)",
                            fontVariantNumeric: "tabular-nums",
                            marginBottom: "var(--spacing-8)",
                        }}
                    >
                        LEVEL 4 · SAFFRON WASH · #FEF9C3
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            color: "var(--color-smoke-ink)",
                        }}
                    >
                        Reserved for celebration moments — PRs, milestones, earned goals.
                    </div>
                </div>
            </div>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * ElevationRefusal — the teaching story; documents what the system *won't* do
 * ----------------------------------------------------------------------------
 * Important counter-example. The system's philosophy is "no shadows, tonal
 * hierarchy only." This story shows what *would* be wrong by exception.
 * ---------------------------------------------------------------------------- */

export const ElevationRefusal: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Elevation Refusal"
                description="The system explicitly refuses traditional shadow-based elevation. Hierarchy comes from tonal surface shifts, not lit drop shadows. This story documents the philosophy by comparing the system's approach (left) to the rejected approach (right)."
            />

            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--spacing-32)",
                }}
            >
                {/* The system way — tonal */}
                <div>
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-moss-success)",
                            fontVariantNumeric: "tabular-nums",
                            marginBottom: "var(--spacing-12)",
                            letterSpacing: "var(--tracking-small)",
                        }}
                    >
                        ✓ THE SYSTEM WAY — TONAL
                    </div>
                    <div
                        style={{
                            padding: "var(--spacing-24)",
                            backgroundColor: "var(--color-vellum-surface)",
                            borderRadius: "var(--radius-cards)",
                            border: "1px solid var(--color-linen-border)",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-card-title)",
                                fontWeight: 500,
                                color: "var(--color-charcoal-ink)",
                                marginBottom: "var(--spacing-8)",
                            }}
                        >
                            Pull Day 2
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-body)",
                                color: "var(--color-smoke-ink)",
                            }}
                        >
                            Card elevates through Vellum Surface tone against the Paper Canvas page background. Hairline border carries structural definition.
                        </div>
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: "var(--leading-normal)",
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                        }}
                    >
                        The tonal shift from #FAFAF8 (canvas) to #F2F1ED (card) is subtle but legible. The card *feels* lifted without any shadow.
                    </p>
                </div>

                {/* The rejected way — shadows */}
                <div>
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-rust-warning)",
                            fontVariantNumeric: "tabular-nums",
                            marginBottom: "var(--spacing-12)",
                            letterSpacing: "var(--tracking-small)",
                        }}
                    >
                        ✗ NOT THIS — SHADOWS
                    </div>
                    <div
                        style={{
                            padding: "var(--spacing-24)",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "var(--radius-cards)",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-card-title)",
                                fontWeight: 500,
                                color: "var(--color-charcoal-ink)",
                                marginBottom: "var(--spacing-8)",
                            }}
                        >
                            Pull Day 2
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-body)",
                                color: "var(--color-smoke-ink)",
                            }}
                        >
                            Pure white card with drop shadow against page. Conventional &quot;material&quot; elevation.
                        </div>
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: "var(--leading-normal)",
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                        }}
                    >
                        The pure-white-and-shadow approach signals &quot;tech product material design.&quot; It works but it&apos;s the *wrong* aesthetic for FitTrack&apos;s warm-paper identity. The system explicitly refuses this.
                    </p>
                </div>
            </div>
        </div>
    ),
};