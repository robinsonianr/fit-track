import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

/* ============================================================================
 * Storybook metadata
 * ----------------------------------------------------------------------------
 * The `title` controls where the story appears in the Storybook sidebar.
 * "Tokens / Colors" puts it under a "Tokens" group with "Colors" as the page.
 * When you add Typography.stories.tsx with title "Tokens / Typography", it
 * appears as a sibling page in the same group.
 *
 * `tags: ["autodocs"]` enables automatic documentation generation, so each
 * story also gets a "Docs" tab showing source code and prop tables.
 * ============================================================================ */

const meta: Meta = {
    title: "Tokens / Colors",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The FitTrack color system. Warm neutrals form the dominant tonal foundation; Indigo Signal punctuates interactive moments; Saffron Mark appears only when something is earned. All colors are defined as CSS custom properties in `src/design-system/tokens.css` and exposed as Tailwind utilities.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

/* ============================================================================
 * Swatch — the atomic visual unit of this story file
 * ----------------------------------------------------------------------------
 * Renders one color token as a card showing the color, name, hex value, token
 * variable, and role description. Used by every story in this file. Kept as a
 * local component because it's specific to color-token display.
 * ============================================================================ */

type SwatchProps = {
    name: string;
    value: string;
    token: string;
    role: string;
    /** When true, the swatch has a hairline border for visibility against the
     *  canvas (used for very light colors that would otherwise be invisible). */
    bordered?: boolean;
};

const Swatch: React.FC<SwatchProps> = ({
    name,
    value,
    token,
    role,
    bordered = false,
}) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--color-vellum-surface)",
            borderRadius: "var(--radius-cards)",
            overflow: "hidden",
        }}
    >
        {/* Color preview block */}
        <div
            style={{
                height: "120px",
                backgroundColor: value,
                border: bordered ? "1px solid var(--color-linen-border)" : "none",
                borderBottom: "1px solid var(--color-linen-border)",
            }}
            aria-label={`${name} color swatch`}
        />

        {/* Metadata block */}
        <div
            style={{
                padding: "var(--spacing-16)",
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

/* ============================================================================
 * SwatchGrid — layout wrapper for displaying a set of swatches
 * ----------------------------------------------------------------------------
 * Uses CSS Grid with auto-fill columns so the layout adapts to the Storybook
 * viewport size. Each swatch occupies a minimum of 280px; columns expand to
 * fill available space.
 * ============================================================================ */

const SwatchGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--spacing-24)",
        }}
    >
        {children}
    </div>
);

/* ============================================================================
 * SectionHeading — used to group swatches by color family within stories
 * ----------------------------------------------------------------------------
 * Renders a section title in AeonikPro Medium with an optional description.
 * ============================================================================ */

const SectionHeading: React.FC<{
    title: string;
    description?: string;
}> = ({ title, description }) => (
    <div style={{ marginBottom: "var(--spacing-24)" }}>
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

/* ============================================================================
 * SectionContainer — vertical spacing wrapper for grouped sections within a story
 * ============================================================================ */

const SectionContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <section style={{ marginBottom: "var(--spacing-64)" }}>{children}</section>
);

/* ============================================================================
 * STORIES
 * ----------------------------------------------------------------------------
 * Each export is a named story that appears in the Storybook sidebar under
 * "Tokens / Colors". Use `AllColors` for the full overview; use the grouped
 * stories (Neutrals, Indigo, etc.) when you want to focus on one family.
 * ============================================================================ */

/* ----------------------------------------------------------------------------
 * AllColors — the comprehensive view, used as the default story
 * ---------------------------------------------------------------------------- */

export const AllColors: Story = {
    render: () => (
        <div>
            <SectionContainer>
                <SectionHeading
                    title="Warm Neutrals"
                    description="The dominant tonal foundation. Surfaces sit on Paper Canvas; cards elevate to Vellum Surface; nested elements drop to Ash Inset. The temperature is deliberately warm — these reads as paper, not screen."
                />
                <SwatchGrid>
                    <Swatch
                        name="Paper Canvas"
                        value="#FAFAF8"
                        token="--color-paper-canvas"
                        role="Page background, default surface — warm off-white that reads as paper rather than screen"
                        bordered
                    />
                    <Swatch
                        name="Vellum Surface"
                        value="#F2F1ED"
                        token="--color-vellum-surface"
                        role="Elevated card backgrounds, modal surfaces, dashboard panels lifted off the canvas"
                    />
                    <Swatch
                        name="Ash Inset"
                        value="#E8E7E2"
                        token="--color-ash-inset"
                        role="Nested surfaces within cards, table row alternation, subtle surface differentiation"
                    />
                </SwatchGrid>
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="Ink Hierarchy"
                    description="Text and emphasis. Each step has a slight cool-green undertone that distinguishes it from pure black-and-gray and harmonizes with the warm canvas."
                />
                <SwatchGrid>
                    <Swatch
                        name="Charcoal Ink"
                        value="#0F1411"
                        token="--color-charcoal-ink"
                        role="Primary text, headings, navigation, dominant borders, primary action fills"
                    />
                    <Swatch
                        name="Smoke Ink"
                        value="#3F4441"
                        token="--color-smoke-ink"
                        role="Secondary text, body emphasis, subdued labels"
                    />
                    <Swatch
                        name="Pewter Mute"
                        value="#6B6F6A"
                        token="--color-pewter-mute"
                        role="Tertiary text, de-emphasized metadata, placeholder copy, inactive states"
                    />
                </SwatchGrid>
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="Borders"
                    description="Hairline structural lines. The system is border-driven rather than shadow-driven."
                />
                <SwatchGrid>
                    <Swatch
                        name="Linen Border"
                        value="#D4D6D2"
                        token="--color-linen-border"
                        role="Hairline borders, dividers, section separators — barely visible 1px structural lines"
                    />
                    <Swatch
                        name="Pewter Border"
                        value="#B4B6B2"
                        token="--color-pewter-border"
                        role="Emphasized borders, hover-state outlines, focus-adjacent structures"
                    />
                </SwatchGrid>
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="Indigo Signal — Primary Accent"
                    description="The single cool chromatic gesture for interactive elements. Used for primary actions, focus rings, active states. Never decorative."
                />
                <SwatchGrid>
                    <Swatch
                        name="Indigo Signal"
                        value="#5B5BD6"
                        token="--color-indigo-signal"
                        role="Primary accent — interactive elements, active states, focus rings, primary action fills"
                    />
                    <Swatch
                        name="Indigo Press"
                        value="#4747C2"
                        token="--color-indigo-press"
                        role="Hover and pressed states for primary actions"
                    />
                    <Swatch
                        name="Indigo Wash"
                        value="#EEEEFB"
                        token="--color-indigo-wash"
                        role="Pale indigo backgrounds for accent-adjacent surfaces — selected rows, hover washes"
                        bordered
                    />
                    <Swatch
                        name="Indigo Veil"
                        value="#C7C7F2"
                        token="--color-indigo-veil"
                        role="Mid-tone indigo for de-emphasized accent uses, disabled primary buttons"
                    />
                </SwatchGrid>
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="Saffron Mark — Celebration Accent"
                    description="Reserved entirely for moments the user has earned: PRs, milestones, completed weekly goals. Used less than 5% of the time. Never for ordinary interactions."
                />
                <SwatchGrid>
                    <Swatch
                        name="Saffron Mark"
                        value="#EAB308"
                        token="--color-saffron-mark"
                        role="Celebration accent — PR moments, milestone surfaces, completion of earned goals"
                    />
                    <Swatch
                        name="Saffron Press"
                        value="#CA8A04"
                        token="--color-saffron-press"
                        role="Darker saffron for interactive celebration surfaces (rare)"
                    />
                    <Swatch
                        name="Saffron Wash"
                        value="#FEF9C3"
                        token="--color-saffron-wash"
                        role="Pale saffron backgrounds for celebration-adjacent surfaces"
                        bordered
                    />
                </SwatchGrid>
            </SectionContainer>

            <SectionContainer>
                <SectionHeading
                    title="Semantic Colors"
                    description="Routine completion, warnings, and destructive actions. Moss Success is deliberately differentiated from Saffron Mark to keep 'the workout saved' distinct from 'you earned a PR.'"
                />
                <SwatchGrid>
                    <Swatch
                        name="Moss Success"
                        value="#4F7A3E"
                        token="--color-moss-positive"
                        role="Semantic success — routine completion (workout saved, sync done)"
                    />
                    <Swatch
                        name="Rust Warning"
                        value="#C2410C"
                        token="--color-rust-negative"
                        role="Semantic warning — overload signals, deload prompts, recovery alerts"
                    />
                    <Swatch
                        name="Brick Danger"
                        value="#991B1B"
                        token="--color-brick-danger"
                        role="Semantic danger — destructive actions, injury flags, irreversible warnings"
                    />
                </SwatchGrid>
            </SectionContainer>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * Neutrals — focused view of the warm-neutral foundation
 * Useful when reviewing the tonal hierarchy in isolation.
 * ---------------------------------------------------------------------------- */

export const Neutrals: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Warm Neutrals"
                description="The dominant tonal foundation. Three surfaces (Paper Canvas, Vellum Surface, Ash Inset) plus three ink tones (Charcoal Ink, Smoke Ink, Pewter Mute) plus two borders (Linen Border, Pewter Border) carry 90% of the interface."
            />
            <SwatchGrid>
                <Swatch
                    name="Paper Canvas"
                    value="#FAFAF8"
                    token="--color-paper-canvas"
                    role="Page background, default surface"
                    bordered
                />
                <Swatch
                    name="Vellum Surface"
                    value="#F2F1ED"
                    token="--color-vellum-surface"
                    role="Elevated card backgrounds"
                />
                <Swatch
                    name="Ash Inset"
                    value="#E8E7E2"
                    token="--color-ash-inset"
                    role="Nested surfaces"
                />
                <Swatch
                    name="Charcoal Ink"
                    value="#0F1411"
                    token="--color-charcoal-ink"
                    role="Primary text and emphasis"
                />
                <Swatch
                    name="Smoke Ink"
                    value="#3F4441"
                    token="--color-smoke-ink"
                    role="Secondary text"
                />
                <Swatch
                    name="Pewter Mute"
                    value="#6B6F6A"
                    token="--color-pewter-mute"
                    role="Tertiary text"
                />
                <Swatch
                    name="Linen Border"
                    value="#D4D6D2"
                    token="--color-linen-border"
                    role="Default hairline borders"
                />
                <Swatch
                    name="Pewter Border"
                    value="#B4B6B2"
                    token="--color-pewter-border"
                    role="Emphasized borders"
                />
            </SwatchGrid>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * Indigo — focused view of the interactive accent
 * ---------------------------------------------------------------------------- */

export const Indigo: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Indigo Signal — Primary Accent"
                description="The single cool chromatic gesture in the system. Four tokens covering interactive states from default to disabled."
            />
            <SwatchGrid>
                <Swatch
                    name="Indigo Signal"
                    value="#5B5BD6"
                    token="--color-indigo-signal"
                    role="Primary action fills, active states, focus rings"
                />
                <Swatch
                    name="Indigo Press"
                    value="#4747C2"
                    token="--color-indigo-press"
                    role="Hover and pressed states"
                />
                <Swatch
                    name="Indigo Wash"
                    value="#EEEEFB"
                    token="--color-indigo-wash"
                    role="Selected-row backgrounds, hover washes"
                    bordered
                />
                <Swatch
                    name="Indigo Veil"
                    value="#C7C7F2"
                    token="--color-indigo-veil"
                    role="Disabled and de-emphasized accent uses"
                />
            </SwatchGrid>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * Saffron — focused view of the celebration accent
 * ---------------------------------------------------------------------------- */

export const Saffron: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Saffron Mark — Celebration Accent"
                description="Reserved for moments the user has earned. Three tokens — Mark for the moment itself, Press for the rare interactive celebration surface, Wash for soft celebration backgrounds. Used less than 5% of the time."
            />
            <SwatchGrid>
                <Swatch
                    name="Saffron Mark"
                    value="#EAB308"
                    token="--color-saffron-mark"
                    role="PRs, milestones, completed weekly goals"
                />
                <Swatch
                    name="Saffron Press"
                    value="#CA8A04"
                    token="--color-saffron-press"
                    role="Interactive celebration surfaces (rare)"
                />
                <Swatch
                    name="Saffron Wash"
                    value="#FEF9C3"
                    token="--color-saffron-wash"
                    role="Celebration-adjacent backgrounds"
                    bordered
                />
            </SwatchGrid>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * Semantic — focused view of success/warning/danger
 * ---------------------------------------------------------------------------- */

export const Semantic: Story = {
    render: () => (
        <SectionContainer>
            <SectionHeading
                title="Semantic Colors"
                description="Functional colors that signal meaning. Moss Success for routine completion. Rust Warning for overload/deload signals. Brick Danger for destructive actions only."
            />
            <SwatchGrid>
                <Swatch
                    name="Moss Success"
                    value="#4F7A3E"
                    token="--color-moss-positive"
                    role="Workout saved, sync complete, routine confirmation"
                />
                <Swatch
                    name="Rust Warning"
                    value="#C2410C"
                    token="--color-rust-negative"
                    role="Overload signals, deload prompts, recovery alerts"
                />
                <Swatch
                    name="Brick Danger"
                    value="#991B1B"
                    token="--color-brick-danger"
                    role="Destructive actions, injury flags, irreversible warnings"
                />
            </SwatchGrid>
        </SectionContainer>
    ),
};

/* ----------------------------------------------------------------------------
 * AccentDiscipline — a teaching story showing the chromatic grammar
 * ----------------------------------------------------------------------------
 * This story exists specifically to make the rule legible: indigo for actions,
 * saffron for celebration, never the reverse. Visual examples > written rules.
 * ---------------------------------------------------------------------------- */

export const AccentDiscipline: Story = {
    render: () => (
        <div>
            <SectionHeading
                title="Accent Discipline"
                description="The chromatic grammar of the system. Indigo Signal punctuates interactive moments. Saffron Mark celebrates earned achievements. The two accents have non-overlapping roles."
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--spacing-24)",
                    marginTop: "var(--spacing-32)",
                }}
            >
                {/* Indigo example */}
                <div
                    style={{
                        padding: "var(--spacing-32)",
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
                            marginBottom: "var(--spacing-8)",
                        }}
                    >
                        Action
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-card-title)",
                            fontWeight: 500,
                            color: "var(--color-charcoal-ink)",
                            marginBottom: "var(--spacing-16)",
                        }}
                    >
                        Start workout
                    </div>
                    <button
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-body)",
                            fontWeight: 500,
                            letterSpacing: "var(--tracking-body)",
                            padding: "10px 20px",
                            backgroundColor: "var(--color-indigo-signal)",
                            color: "var(--color-paper-canvas)",
                            border: "none",
                            borderRadius: "var(--radius-buttons)",
                            cursor: "pointer",
                        }}
                    >
                        Begin
                    </button>
                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: 1.5,
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                            marginBottom: 0,
                        }}
                    >
                        Indigo Signal carries every interactive moment in the system —
                        buttons, focus, active routines. It never signals achievement.
                    </p>
                </div>

                {/* Saffron example */}
                <div
                    style={{
                        padding: "var(--spacing-32)",
                        backgroundColor: "var(--color-saffron-wash)",
                        borderRadius: "var(--radius-cards)",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-label)",
                            fontWeight: 500,
                            letterSpacing: "var(--tracking-small)",
                            color: "var(--color-smoke-ink)",
                            textTransform: "uppercase",
                            marginBottom: "var(--spacing-8)",
                        }}
                    >
                        Earned
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-mono-large)",
                            fontWeight: 700,
                            lineHeight: "var(--leading-hero)",
                            letterSpacing: "var(--tracking-mono-large)",
                            color: "var(--color-saffron-mark)",
                            fontVariantNumeric: "tabular-nums slashed-zero",
                            marginBottom: "var(--spacing-8)",
                        }}
                    >
                        225 lb
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            fontWeight: 500,
                            color: "var(--color-smoke-ink)",
                            marginBottom: "var(--spacing-16)",
                        }}
                    >
                        New personal record · Back Squat
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "var(--text-small)",
                            lineHeight: 1.5,
                            color: "var(--color-smoke-ink)",
                            marginTop: "var(--spacing-16)",
                            marginBottom: 0,
                        }}
                    >
                        Saffron Mark appears only when something is earned. PRs, milestones,
                        closed weeks — never ordinary interactions.
                    </p>
                </div>
            </div>
        </div>
    ),
};