import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta = {
    title: "Tokens / Radius",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The FitTrack border-radius system. 'Soft but disciplined' — every surface has softened corners, no element is sharp, but the radii are tight enough to feel engineered rather than friendly. Buttons at 8px, cards at 12px, hero surfaces at 20px, full pills (9999px) only for navigation and avatars.",
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
 * RadiusSample renders one radius token applied to a sample card. The
 * sample is large enough that the radius is visible without being so
 * large that it dominates the page.
 */
type RadiusSampleProps = {
    name: string;
    value: string;
    token: string;
    usage: string;
};

const RadiusSample: React.FC<RadiusSampleProps> = ({
    name,
    value,
    token,
    usage,
}) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
        }}
    >
        {/* Visual sample */}
        <div
            style={{
                height: "120px",
                width: "100%",
                backgroundColor: "var(--color-vellum-surface)",
                border: "1px solid var(--color-linen-border)",
                borderRadius: value,
            }}
            aria-label={`${name} radius sample at ${value}`}
        />

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
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--spacing-12)",
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
            </div>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-mono-label)",
                    color: "var(--color-pewter-mute)",
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
                    marginTop: "var(--spacing-4)",
                }}
            >
                {usage}
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
 * AllRadii — comprehensive view; default story
 * Every radius token applied to an identical-sized sample for direct comparison.
 * ---------------------------------------------------------------------------- */

export const AllRadii: Story = {
    name: "All Radius",
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Border Radius"
                description="Eight named radius values. The progression — 4, 8, 12, 16, 20, then jumping to 9999 for full pills — reflects the principle that softness should be *deliberate*: every component category has a specific radius, never an arbitrary value."
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "var(--spacing-32)",
                    marginTop: "var(--spacing-32)",
                }}
            >
                <RadiusSample
                    name="Badges"
                    value="4px"
                    token="--radius-badges"
                    usage="Small pill badges, muscle-group tags. The tightest radius in the system; just enough to soften without reading as rounded."
                />
                <RadiusSample
                    name="Inputs"
                    value="8px"
                    token="--radius-inputs"
                    usage="Input fields, dropdowns, search boxes. Pairs with button radius for visual consistency in form contexts."
                />
                <RadiusSample
                    name="Buttons"
                    value="8px"
                    token="--radius-buttons"
                    usage="Primary, secondary, and ghost buttons. The shape language for interactive elements that aren't pill-shaped (nav, avatars)."
                />
                <RadiusSample
                    name="Cards"
                    value="12px"
                    token="--radius-cards"
                    usage="MetricCard, RoutineCard, ExerciseRow, standard surface containers. The default card radius across the system."
                />
                <RadiusSample
                    name="Modals"
                    value="16px"
                    token="--radius-modals"
                    usage="Modal sheet top corners, dialog containers. Slightly larger than cards to differentiate transient surfaces from persistent ones."
                />
                <RadiusSample
                    name="Hero Cards"
                    value="20px"
                    token="--radius-hero-cards"
                    usage="DuotoneCard, hero surfaces, signature components. The largest non-pill radius — reserved for surfaces that anchor a layout."
                />
            </div>

            {/* Pills section — separated because the scale jumps */}
            <div style={{ marginTop: "var(--spacing-64)" }}>
                <SectionHeading
                    title="Full Pills"
                    description="9999px (or 50%) creates fully rounded shapes — capsules and circles. The system uses these only for navigation items and avatars, where the shape is structurally meaningful."
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "var(--spacing-32)",
                        marginTop: "var(--spacing-32)",
                    }}
                >
                    <RadiusSample
                        name="Pills"
                        value="9999px"
                        token="--radius-pills"
                        usage="TopBar navigation items, segmented controls, capsule buttons. Full-pill shape signals 'navigational' or 'capsule-shaped control.'"
                    />
                    <RadiusSample
                        name="Avatar"
                        value="9999px"
                        token="--radius-avatar"
                        usage="User avatar circles. Same value as pills but semantically distinct — separates 'capsule shape' from 'circular shape' in the design system."
                    />
                </div>
            </div>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * AppliedInContext — radii applied to realistic component shapes
 * ----------------------------------------------------------------------------
 * Shows each radius value applied to a sample that matches its real use case
 * (button-sized for button radius, card-sized for card radius, etc.) instead
 * of all-identical samples. Makes the "soft but disciplined" feel legible.
 * ---------------------------------------------------------------------------- */

export const AppliedInContext: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Radii in Context"
                description="Each radius value applied to a component approximating its real-world dimensions. The card radius rendered at card scale; the button radius at button scale; the pill radius on a nav-item-shaped element. Reveals how each radius reads at its intended size."
            />

            <div
                style={{
                    marginTop: "var(--spacing-32)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-32)",
                }}
            >
                {/* Badge example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        badges · 4px
                    </div>
                    <div style={{ display: "flex", gap: "var(--spacing-8)" }}>
                        <div
                            style={{
                                padding: "4px 8px",
                                backgroundColor: "var(--color-vellum-surface)",
                                border: "1px solid var(--color-linen-border)",
                                borderRadius: "var(--radius-badges)",
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-label)",
                                fontWeight: 500,
                                color: "var(--color-smoke-ink)",
                                letterSpacing: "var(--tracking-small)",
                            }}
                        >
                            CHEST
                        </div>
                        <div
                            style={{
                                padding: "4px 8px",
                                backgroundColor: "var(--color-indigo-wash)",
                                borderRadius: "var(--radius-badges)",
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-label)",
                                fontWeight: 500,
                                color: "var(--color-indigo-press)",
                                letterSpacing: "var(--tracking-small)",
                            }}
                        >
                            STRENGTH
                        </div>
                    </div>
                </div>

                {/* Button example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        buttons · 8px
                    </div>
                    <div style={{ display: "flex", gap: "var(--spacing-12)" }}>
                        <button
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "var(--color-indigo-signal)",
                                color: "var(--color-paper-canvas)",
                                border: "none",
                                borderRadius: "var(--radius-buttons)",
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-body)",
                                fontWeight: 500,
                                letterSpacing: "var(--tracking-body)",
                                cursor: "pointer",
                            }}
                        >
                            Start workout
                        </button>
                        <button
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "transparent",
                                color: "var(--color-charcoal-ink)",
                                border: "1px solid var(--color-linen-border)",
                                borderRadius: "var(--radius-buttons)",
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "var(--text-body)",
                                fontWeight: 500,
                                letterSpacing: "var(--tracking-body)",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Card example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        cards · 12px
                    </div>
                    <div
                        style={{
                            padding: "var(--spacing-24)",
                            backgroundColor: "var(--color-vellum-surface)",
                            borderRadius: "var(--radius-cards)",
                            maxWidth: "320px",
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
                                marginBottom: "var(--spacing-8)",
                            }}
                        >
                            This week
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-mono-large)",
                                fontWeight: 500,
                                color: "var(--color-charcoal-ink)",
                                fontVariantNumeric: "tabular-nums slashed-zero",
                            }}
                        >
                            3 of 4
                        </div>
                    </div>
                </div>

                {/* Hero card example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        hero-cards · 20px
                    </div>
                    <div
                        style={{
                            padding: "var(--spacing-32)",
                            backgroundColor: "var(--color-vellum-surface)",
                            borderRadius: "var(--radius-hero-cards)",
                            maxWidth: "480px",
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
                            Weekly adherence
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-mono-readout)",
                                fontWeight: 500,
                                color: "var(--color-indigo-signal)",
                                fontVariantNumeric: "tabular-nums slashed-zero",
                                lineHeight: "var(--leading-hero)",
                                letterSpacing: "var(--tracking-mono-hero)",
                            }}
                        >
                            3 of 4
                        </div>
                    </div>
                </div>

                {/* Pill example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        pills · 9999px
                    </div>
                    <div
                        style={{
                            display: "inline-flex",
                            gap: "var(--spacing-4)",
                            padding: "4px",
                            backgroundColor: "var(--color-vellum-surface)",
                            borderRadius: "var(--radius-pills)",
                        }}
                    >
                        {["Dashboard", "Workouts", "History", "Profile"].map(
                            (item, index) => (
                                <div
                                    key={item}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "var(--radius-pills)",
                                        backgroundColor:
                                            index === 0
                                                ? "var(--color-indigo-wash)"
                                                : "transparent",
                                        color:
                                            index === 0
                                                ? "var(--color-indigo-signal)"
                                                : "var(--color-smoke-ink)",
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "var(--text-body)",
                                        fontWeight: 500,
                                        letterSpacing: "var(--tracking-body)",
                                        cursor: "pointer",
                                    }}
                                >
                                    {item}
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* Avatar example */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "200px 1fr",
                        gap: "var(--spacing-24)",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-label)",
                            color: "var(--color-pewter-mute)",
                        }}
                    >
                        avatar · 9999px
                    </div>
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--color-indigo-wash)",
                            borderRadius: "var(--radius-avatar)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-body)",
                            fontWeight: 500,
                            color: "var(--color-indigo-signal)",
                            letterSpacing: "var(--tracking-body)",
                        }}
                    >
                        LT
                    </div>
                </div>
            </div>
        </div>
    ),
};