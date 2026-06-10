import { useState } from "react";

/* ============================================================================
 * PillNavigationItem
 * ----------------------------------------------------------------------------
 * Full-pill-shaped navigation item in the TopBar's center cluster. Three
 * states: inactive (default), active (current route), and hover (mouse-over).
 *
 * The primitive is route-agnostic — it does not know which route is active.
 * The composition layer (TopBar in FTRACK-18) wires this to React Router's
 * useLocation hook and sets the `active` prop per-item.
 *
 * Renders as a real <button> rather than an <a>, because in a SPA the actual
 * routing is handled by the parent (React Router's Link or useNavigate). This
 * primitive only fires the click; the parent decides whether to push history,
 * replace, or do something else.
 *
 * Used by:
 *   - TopBar (center region — Dashboard, Activities, Profile pills)
 *
 * Design tokens consumed:
 *   - --font-aeonikpro       (typeface)
 *   - --color-smoke-ink      (inactive text)
 *   - --color-charcoal-ink   (hover text)
 *   - --color-indigo-signal  (active text)
 *   - --color-indigo-wash    (active background)
 *   - --color-vellum-surface (hover background)
 *   - --radius-pills         (full pill shape)
 *
 * Accessibility:
 *   - Uses aria-current="page" when active, so screen readers announce
 *     the current location
 *   - Visible focus ring on keyboard focus only (focus-visible)
 *   - Real <button> semantics for keyboard activation (Enter/Space)
 * ============================================================================ */

interface PillNavigationItemProps {
    /** The label displayed inside the pill (e.g., "Dashboard") */
    children: React.ReactNode;
    /** Whether this item represents the current route. Drives the active
     *  visual state and the aria-current attribute. Default: false. */
    active?: boolean;
    /** Click handler. The composition layer (TopBar) wires this to
     *  React Router's navigation. */
    onClick?: () => void;
    /** Optional className for layout positioning. */
    className?: string;
}

/* Compute the background color for the pill's current state.
 *
 * Decision priority: active > hover > inactive.
 *
 * Active state wins because it represents the user's current location —
 * if they're hovering an item that's already active, the active styling
 * should hold (there's no meaningful "I'm hovering my current page"
 * affordance). */
function getBackground(active: boolean, hovered: boolean): string {
    if (active) return "var(--color-indigo-wash)";
    if (hovered) return "var(--color-vellum-surface)";
    return "transparent";
}

/* Compute the text color for the pill's current state.
 *
 * Active uses Indigo Signal to match the background washed accent.
 * Hover steps from Smoke Ink to Charcoal Ink — slightly more emphasis
 * on the hover affordance without resorting to indigo, since indigo is
 * reserved for the active state. */
function getColor(active: boolean, hovered: boolean): string {
    if (active) return "var(--color-indigo-signal)";
    if (hovered) return "var(--color-charcoal-ink)";
    return "var(--color-smoke-ink)";
}

export function PillNavigationItem({
    children,
    active = false,
    onClick,
    className,
}: PillNavigationItemProps) {
    const [hovered, setHovered] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={(e) => {
                // Only set focusVisible when the focus came from keyboard, not mouse.
                // The :focus-visible CSS selector handles this natively, but we mirror
                // it in state so we can apply the ring via inline styles.
                if (e.target.matches(":focus-visible")) {
                    setFocusVisible(true);
                }
            }}
            onBlur={() => setFocusVisible(false)}
            aria-current={active ? "page" : undefined}
            className={className}
            style={{
                // Reset default button chrome
                border: "none",
                cursor: "pointer",

                // Typography (consistent across states)
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "var(--tracking-body)",

                // Layout — padding follows DESIGN.md: 8px horizontal, 6px vertical
                padding: "6px 12px",

                // Shape — full pill
                borderRadius: "var(--radius-pills)",

                // Stateful properties
                background: getBackground(active, hovered),
                color: getColor(active, hovered),

                // Focus ring — applied only when focus is visible (keyboard)
                outline: "none",
                boxShadow: focusVisible
                    ? "0 0 0 2px var(--color-paper-canvas), 0 0 0 4px var(--color-indigo-press)"
                    : "none",

                // Smooth state transitions
                transition: "background 120ms ease, color 120ms ease",

                // Prevent text from being selectable (nav is not content)
                userSelect: "none",
            }}
        >
            {children}
        </button>
    );
}