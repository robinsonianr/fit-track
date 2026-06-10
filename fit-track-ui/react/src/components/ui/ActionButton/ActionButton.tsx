import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

/* ============================================================================
 * ActionButton
 * ----------------------------------------------------------------------------
 * The system's interactive action primitive. Three variants share one
 * component because they differ only in their color treatment — sizing,
 * focus behavior, disabled handling, and keyboard semantics are identical.
 *
 * Variants:
 *   - primary   → Indigo Signal background, Paper Canvas text
 *                 The dominant "do this" CTA. Used for "Add workout," "Save"
 *   - secondary → Charcoal Ink text, transparent bg, Linen Border outline
 *                 Companion to primary. Used for "Cancel," "Discard"
 *   - ghost     → Indigo Signal text, no background, no border
 *                 Tertiary action. Used for "Edit," "View details"
 *
 * States per variant:
 *   - default      → at rest
 *   - hover        → mouse over
 *   - focus        → keyboard focus (focus-visible only — not mouse click)
 *   - disabled     → interaction blocked, lower opacity
 *
 * Used by:
 *   - TopBar (right region — primary "Add workout" CTA)
 *   - Forms (submit + cancel pairs)
 *   - Modals (confirm + dismiss)
 *   - Any surface needing an interactive action
 *
 * Design tokens consumed:
 *   - --color-indigo-signal     (primary bg, ghost text)
 *   - --color-indigo-press      (primary hover bg)
 *   - --color-indigo-wash       (ghost hover bg)
 *   - --color-charcoal-ink      (secondary text)
 *   - --color-paper-canvas      (primary text)
 *   - --color-vellum-surface    (secondary hover bg)
 *   - --color-linen-border      (secondary border)
 *   - --color-pewter-border     (secondary hover border)
 *   - --font-aeonikpro          (typeface)
 *   - --radius-buttons          (8px border-radius)
 *
 * Accessibility:
 *   - Renders as a real <button>
 *   - Disabled state is communicated via aria-disabled + native disabled
 *   - Visible focus ring on keyboard focus (focus-visible only)
 *   - Forwards standard button attributes via spread (type, name, form, etc.)
 * ============================================================================ */

type Variant = "primary" | "secondary" | "ghost";

interface ActionButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    /** Visual variant. Defaults to "primary" — the most common case. */
    variant?: Variant;
    /** Button label. Can include icons via JSX. */
    children: ReactNode;
}

/* Compute the background color for a variant in its current state.
 *
 * The function tracks four signals: variant, hovered, focusVisible, disabled.
 * State priority: disabled > hover > default (focus does not change background,
 * only the ring).
 *
 * Why no focus-affects-background rule: focus is communicated entirely via
 * the focus ring. Layering color changes on focus would visually compete with
 * the ring and create ambiguity about which state is active. */
function getBackground(
    variant: Variant,
    hovered: boolean,
    disabled: boolean,
): string {
    if (disabled) {
        if (variant === "primary") return "var(--color-indigo-veil)";
        return "transparent";
    }
    if (variant === "primary") {
        return hovered ? "var(--color-indigo-press)" : "var(--color-indigo-signal)";
    }
    if (variant === "secondary") {
        return hovered ? "var(--color-vellum-surface)" : "transparent";
    }
    // ghost
    return hovered ? "var(--color-indigo-wash)" : "transparent";
}

/* Compute the text color for a variant in its current state.
 *
 * Disabled state uses Pewter Mute across all variants for consistency —
 * a disabled button should read as "not interactive" regardless of variant. */
function getColor(variant: Variant, disabled: boolean): string {
    if (disabled) return "var(--color-pewter-mute)";
    if (variant === "primary") return "var(--color-paper-canvas)";
    if (variant === "secondary") return "var(--color-charcoal-ink)";
    // ghost
    return "var(--color-indigo-signal)";
}

/* Compute the border treatment for a variant.
 *
 * Only secondary has a visible border by default. Primary uses background
 * fill; ghost uses no chrome at all (text-only). */
function getBorder(
    variant: Variant,
    hovered: boolean,
    disabled: boolean,
): string {
    if (variant !== "secondary") return "none";
    if (disabled) return "1px solid var(--color-linen-border)";
    return hovered
        ? "1px solid var(--color-pewter-border)"
        : "1px solid var(--color-linen-border)";
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
    function ActionButton({
        variant = "primary",
        children,
        disabled,
        className,
        ...rest
    }, ref) {
        const [hovered, setHovered] = useState(false);
        const [focusVisible, setFocusVisible] = useState(false);

        const isDisabled = Boolean(disabled);

        return (
            <button
                ref={ref}
                type="button"
                disabled={isDisabled}
                aria-disabled={isDisabled || undefined}
                onMouseEnter={() => !isDisabled && setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={(e) => {
                    if (e.target.matches(":focus-visible")) {
                        setFocusVisible(true);
                    }
                }}
                onBlur={() => setFocusVisible(false)}
                className={className}
                style={{
                // Reset default button chrome
                    border: getBorder(variant, hovered, isDisabled),
                    cursor: isDisabled ? "not-allowed" : "pointer",

                    // Typography (consistent across variants)
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "16px",
                    fontWeight: 500,
                    letterSpacing: "var(--tracking-body)",
                    lineHeight: 1,

                    // Layout — padding follows DESIGN.md: 20px horizontal, 10px vertical
                    padding: "10px 20px",

                    // Shape
                    borderRadius: "var(--radius-buttons)",

                    // Stateful properties
                    background: getBackground(variant, hovered, isDisabled),
                    color: getColor(variant, isDisabled),
                    opacity: isDisabled ? 0.7 : 1,

                    // Focus ring — applied only when focus is visible (keyboard)
                    outline: "none",
                    boxShadow: focusVisible
                        ? "0 0 0 2px var(--color-paper-canvas), 0 0 0 4px var(--color-indigo-press)"
                        : "none",

                    // Layout helpers for content alignment (icons + text)
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--spacing-8)",

                    // Smooth state transitions
                    transition:
                    "background 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease",

                    // Prevent text selection on rapid clicks
                    userSelect: "none",
                }}
                {...rest}
            >
                {children}
            </button>
        );
    });
ActionButton.displayName = "ActionButton";