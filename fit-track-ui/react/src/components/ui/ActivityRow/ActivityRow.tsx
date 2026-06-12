/* ============================================================================
 * ActivityRow
 * ----------------------------------------------------------------------------
 * A full-row-clickable activity entry used in two contexts:
 *
 *   compact  — Dashboard "Recent Activity" list. Single inline row:
 *              [dot] [type] · [highlight] [(routineContext)] [PR] · [duration] · [timestamp]
 *              Type and highlight anchor left; duration+timestamp anchor right.
 *              routineContext is the most truncatable element; highlight and
 *              type never truncate.
 *
 *   full     — Activities page. Two lines: type + highlight on the left
 *              column; timestamp + duration on the right column.
 *
 * Rendered as a <button> so the entire row is keyboard-accessible. The caller
 * is responsible for navigation (push to workout detail, etc.).
 *
 * Type dot color is driven by a TYPE_COLOR_MAP (exact match, then pewter-mute
 * fallback). This is a placeholder pending the broader chart/type color system.
 *   Strength → saffron-mark
 *   Run      → moss-positive
 *   others   → pewter-mute
 *
 * PR badge: `highlightIsPR` renders an inline "PR" label in saffron-mark (10px
 * 500, 0.05em tracking) in compact, and a "PR:" prefix in saffron in full.
 *
 * Used by:
 *   - Dashboard ("Recent Activity" section, compact variant)
 *   - Activities page (full variant)
 *
 * Design tokens consumed:
 *   - --color-paper-canvas      (base background — matches page)
 *   - --color-vellum-surface    (hover background)
 *   - --color-linen-border      (row bottom separator)
 *   - --color-charcoal-ink      (type + highlight text)
 *   - --color-smoke-ink         (duration text)
 *   - --color-pewter-mute       (timestamp, separator dot, routineContext, default dot)
 *   - --color-saffron-mark      (Strength dot + PR badge)
 *   - --color-moss-positive     (Run dot)
 *   - --color-indigo-press      (focus ring)
 *   - --font-aeonikpro          (all text)
 *   - --radius-rows             (hover background radius)
 *   - --spacing-8               (compact vertical padding)
 *   - --spacing-12              (full vertical padding)
 *   - --spacing-4               (internal gaps)
 *
 * Accessibility:
 *   - Full row is a <button> — keyboard activation via Enter/Space.
 *   - aria-label built from type · duration · highlight · routineContext
 *   - Visible focus ring on keyboard focus only (mirrors PillNavigationItem).
 * ============================================================================ */

import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes } from "react";

type ActivityVariant = "compact" | "full";

interface ActivityRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> {
    /** Workout type label (e.g., "Strength", "Run"). Drives dot color. */
    type: string;
    /** Pre-formatted timestamp string (e.g., "Mon, Jun 9" or "2h ago"). */
    timestamp: string;
    /** Pre-formatted duration string (e.g., "48m", "1h 12m"). */
    duration: string;
    /** Exercise or event highlight (e.g., "Bench 185×5", "3.1 mi"). */
    highlight?: string;
    /** Routine day context (e.g., "Push Day 1"). Shown in parens after highlight.
     *  Omit for non-routine activity types (Run, Yoga). */
    routineContext?: string;
    /** True renders a saffron "PR" badge after the routineContext in compact,
     *  or a "PR:" prefix in full. */
    highlightIsPR?: boolean;
    /** "compact" → single-line Dashboard row. "full" → two-line Activities row.
     *  Defaults to "compact". */
    variant?: ActivityVariant;
}

/* Placeholder type→color map. Expand as the type system grows.
 * Exact string match only — no substring matching. */
const TYPE_COLOR_MAP: Record<string, string> = {
    Strength: "var(--color-saffron-mark)",
    Run:      "var(--color-moss-positive)",
};

function getDotColor(type: string): string {
    return TYPE_COLOR_MAP[type] ?? "var(--color-pewter-mute)";
}

function buildAriaLabel(
    type: string,
    duration: string,
    highlight?: string,
    routineContext?: string,
    highlightIsPR?: boolean,
): string {
    let label = `${type} · ${duration}`;
    if (highlight) {
        label += ` · ${highlightIsPR ? "PR: " : ""}${highlight}`;
        if (routineContext) label += ` (${routineContext})`;
    }
    return label;
}

export const ActivityRow = forwardRef<HTMLButtonElement, ActivityRowProps>(
    function ActivityRow(
        {
            type,
            timestamp,
            duration,
            highlight,
            routineContext,
            highlightIsPR = false,
            variant = "compact",
            className,
            ...rest
        },
        ref,
    ) {
        const [hovered, setHovered] = useState(false);
        const [focusVisible, setFocusVisible] = useState(false);

        const paddingY = variant === "full" ? "var(--spacing-12)" : "var(--spacing-8)";

        return (
            // Wrapper carries the separator so the button's borderRadius is unobstructed.
            <div
                className={className}
                style={{ borderBottom: "1px solid var(--color-linen-border)" }}
            >
                <button
                    ref={ref}
                    type="button"
                    aria-label={buildAriaLabel(type, duration, highlight, routineContext, highlightIsPR)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocus={(e) => {
                        if (e.target.matches(":focus-visible")) setFocusVisible(true);
                    }}
                    onBlur={() => setFocusVisible(false)}
                    style={{
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",

                        display: "flex",
                        flexDirection: "row",
                        alignItems: variant === "compact" ? "baseline" : "flex-start",
                        justifyContent: "space-between",
                        padding: `${paddingY} var(--spacing-8)`,
                        gap: "var(--spacing-16)",

                        backgroundColor: hovered ? "var(--color-vellum-surface)" : "transparent",
                        borderRadius: "var(--radius-rows)",

                        outline: "none",
                        boxShadow: focusVisible
                            ? "0 0 0 2px var(--color-paper-canvas), 0 0 0 4px var(--color-indigo-press)"
                            : "none",

                        transition: "background-color 100ms ease",
                    }}
                    {...rest}
                >
                    {variant === "compact" ? (
                        // ── Compact ───────────────────────────────────────────
                        // Single inline flex row. Left side (flex:1) holds the training
                        // narrative; right side (flexShrink:0) anchors duration+timestamp.
                        <>
                            {/* Left: dot · type · highlight · routineContext · PR */}
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                {/* Type dot */}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        flexShrink: 0,
                                        display: "inline-block",
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "9999px",
                                        backgroundColor: getDotColor(type),
                                        marginRight: "8px",
                                    }}
                                />
                                {/* Type */}
                                <span
                                    style={{
                                        flexShrink: 0,
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "var(--color-charcoal-ink)",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {type}
                                </span>

                                {/* Highlight + routineContext + PR badge */}
                                {highlight && (
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            minWidth: 0,
                                            flex: 1,
                                        }}
                                    >
                                        {/* Separator */}
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                flexShrink: 0,
                                                margin: "0 8px",
                                                color: "var(--color-pewter-mute)",
                                                fontSize: "15px",
                                                fontWeight: 400,
                                            }}
                                        >
                                            ·
                                        </span>
                                        {/* Highlight */}
                                        <span
                                            style={{
                                                flexShrink: 0,
                                                fontFamily: "var(--font-aeonikpro)",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                                color: "var(--color-charcoal-ink)",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {highlight}
                                        </span>
                                        {/* routineContext — truncates first under pressure */}
                                        {routineContext && (
                                            <span
                                                style={{
                                                    flexShrink: 1,
                                                    minWidth: 0,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    fontFamily: "var(--font-aeonikpro)",
                                                    fontSize: "13px",
                                                    fontWeight: 400,
                                                    color: "var(--color-pewter-mute)",
                                                    marginLeft: "4px",
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                ({routineContext})
                                            </span>
                                        )}
                                        {/* PR badge */}
                                        {highlightIsPR && (
                                            <span
                                                style={{
                                                    flexShrink: 0,
                                                    marginLeft: "6px",
                                                    fontFamily: "var(--font-aeonikpro)",
                                                    fontSize: "11px",
                                                    fontWeight: 500,
                                                    color: "var(--color-saffron-mark)",
                                                    letterSpacing: "0.05em",
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                PR
                                            </span>
                                        )}
                                    </span>
                                )}
                            </span>

                            {/* Right: duration · timestamp */}
                            <span
                                style={{
                                    flexShrink: 0,
                                    fontFamily: "var(--font-aeonikpro)",
                                    lineHeight: 1.3,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "var(--color-smoke-ink)",
                                    }}
                                >
                                    {duration}
                                </span>
                                <span
                                    aria-hidden="true"
                                    style={{ margin: "0 7px", fontSize: "14px", color: "var(--color-pewter-mute)" }}
                                >
                                    ·
                                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "var(--color-pewter-mute)",
                                    }}
                                >
                                    {timestamp}
                                </span>
                            </span>
                        </>
                    ) : (
                        // ── Full ──────────────────────────────────────────────
                        // Two-line layout. Left: type header + highlight line.
                        // Right: timestamp on top, duration below.
                        <>
                            {/* Left column */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--spacing-4)",
                                    minWidth: 0,
                                }}
                            >
                                {/* Type row: dot + label */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--spacing-8)",
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0,
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "9999px",
                                            backgroundColor: getDotColor(type),
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "var(--font-aeonikpro)",
                                            fontSize: "15px",
                                            fontWeight: 500,
                                            color: "var(--color-charcoal-ink)",
                                            lineHeight: 1.3,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {type}
                                    </span>
                                </div>

                                {/* Highlight line — always rendered to lock row height */}
                                <span
                                    aria-hidden={!highlight || undefined}
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "13px",
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                        paddingLeft: "15px",
                                        visibility: highlight ? "visible" : "hidden",
                                    }}
                                >
                                    {highlight ? (
                                        <>
                                            {highlightIsPR && (
                                                <span
                                                    style={{
                                                        color: "var(--color-saffron-mark)",
                                                        fontWeight: 500,
                                                        marginRight: "4px",
                                                    }}
                                                >
                                                    PR:
                                                </span>
                                            )}
                                            <span style={{ color: "var(--color-charcoal-ink)" }}>
                                                {highlight}
                                            </span>
                                        </>
                                    ) : "​"}
                                </span>
                            </div>

                            {/* Right column: timestamp + duration */}
                            <div
                                style={{
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: "var(--spacing-4)",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "13px",
                                        fontWeight: 400,
                                        color: "var(--color-pewter-mute)",
                                        lineHeight: 1.3,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {timestamp}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        color: "var(--color-smoke-ink)",
                                        lineHeight: 1.3,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {duration}
                                </span>
                            </div>
                        </>
                    )}
                </button>
            </div>
        );
    },
);
