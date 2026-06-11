/* ============================================================================
 * ActivityRow
 * ----------------------------------------------------------------------------
 * A full-row-clickable activity entry used in two contexts:
 *
 *   compact  — Dashboard "Recent Activity" list. Single line: type on left,
 *              duration + timestamp on right. No highlight.
 *
 *   full     — Activities page. Two lines: type + optional highlight on the
 *              left column; timestamp + duration on the right column.
 *
 * Rendered as a <button> so the entire row is keyboard-accessible. The caller
 * is responsible for navigation (push to workout detail, etc.).
 *
 * Type dot color is derived from the workout type name:
 *   strength keywords (Push/Pull/Legs/Upper/Lower/Full/Strength) → saffron
 *   cardio keywords (Run/Cardio/Bike/Swim/Walk/HIIT)             → moss-positive
 *   everything else                                              → pewter-mute
 *
 * Highlight parsing: if highlight starts with "PR:" the prefix renders in
 * --color-saffron-mark (500 weight); the rest renders in --color-charcoal-ink.
 * All other highlights render in --color-charcoal-ink at 400 weight.
 * A hidden placeholder line is always reserved in full variant so row heights
 * are consistent whether or not a highlight is present.
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
 *   - --color-pewter-mute       (timestamp, separator dot, default dot)
 *   - --color-saffron-mark      (strength-type dot + "PR:" prefix)
 *   - --color-moss-positive     (cardio-type dot)
 *   - --color-indigo-press      (focus ring)
 *   - --font-aeonikpro          (all text)
 *   - --radius-rows             (hover background radius)
 *   - --spacing-8               (compact vertical padding)
 *   - --spacing-12              (full vertical padding)
 *   - --spacing-4               (internal gaps)
 *
 * Accessibility:
 *   - Full row is a <button> — keyboard activation via Enter/Space.
 *   - aria-label: "{type} · {duration}{highlight ? ' · ' + highlight : ''}"
 *   - Visible focus ring on keyboard focus only (mirrors PillNavigationItem).
 * ============================================================================ */

import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes } from "react";

type ActivityVariant = "compact" | "full";

interface ActivityRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> {
    /** Workout type label (e.g., "Push", "Pull", "Legs", "Cardio"). */
    type: string;
    /** Pre-formatted timestamp string (e.g., "Mon, Jun 9" or "Today, 9:41 AM"). */
    timestamp: string;
    /** Pre-formatted duration string (e.g., "48 min", "1h 12min"). */
    duration: string;
    /** Optional highlight — personal record or notable event.
     *  If it starts with "PR:" the prefix renders in saffron-mark. */
    highlight?: string;
    /** "compact" → single-line Dashboard row. "full" → two-line Activities row.
     *  Defaults to "compact". */
    variant?: ActivityVariant;
}

const STRENGTH_KEYWORDS = /push|pull|legs|upper|lower|full|strength|lift|squat|deadlift/i;
const CARDIO_KEYWORDS = /run|cardio|bike|swim|walk|hike|hiit|row|cycle|elliptical/i;

function dotColor(type: string): string {
    if (STRENGTH_KEYWORDS.test(type)) return "var(--color-saffron-mark)";
    if (CARDIO_KEYWORDS.test(type)) return "var(--color-moss-positive)";
    return "var(--color-pewter-mute)";
}

function buildAriaLabel(type: string, duration: string, highlight?: string): string {
    let label = `${type} · ${duration}`;
    if (highlight) label += ` · ${highlight}`;
    return label;
}

/* Render highlight text. "PR:" prefix gets saffron treatment; rest is charcoal. */
function HighlightText({ text }: { text: string }) {
    if (text.startsWith("PR:")) {
        return (
            <>
                <span style={{ color: "var(--color-saffron-mark)", fontWeight: 500 }}>PR:</span>
                <span style={{ color: "var(--color-charcoal-ink)" }}>{text.slice(3)}</span>
            </>
        );
    }
    return <span style={{ color: "var(--color-charcoal-ink)" }}>{text}</span>;
}

export const ActivityRow = forwardRef<HTMLButtonElement, ActivityRowProps>(
    function ActivityRow(
        { type, timestamp, duration, highlight, variant = "compact", className, ...rest },
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
                    aria-label={buildAriaLabel(type, duration, highlight)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocus={(e) => {
                        if (e.target.matches(":focus-visible")) setFocusVisible(true);
                    }}
                    onBlur={() => setFocusVisible(false)}
                    style={{
                    // Reset button chrome
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",

                        // Layout
                        display: "flex",
                        flexDirection: "row",
                        alignItems: variant === "full" ? "flex-start" : "center",
                        justifyContent: "space-between",
                        padding: `${paddingY} var(--spacing-8)`,
                        gap: "var(--spacing-16)",

                        // Pill hover — borderRadius free because separator lives on wrapper
                        backgroundColor: hovered ? "var(--color-vellum-surface)" : "transparent",
                        borderRadius: "var(--radius-rows)",

                        // Focus ring (keyboard only)
                        outline: "none",
                        boxShadow: focusVisible
                            ? "0 0 0 2px var(--color-paper-canvas), 0 0 0 4px var(--color-indigo-press)"
                            : "none",

                        transition: "background-color 100ms ease",
                    }}
                    {...rest}
                >
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
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "9999px",
                                    backgroundColor: dotColor(type),
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

                        {/* Highlight line — full variant only.
                        Always rendered (visible or hidden) to lock row height. */}
                        {variant === "full" && (
                            <span
                                aria-hidden={!highlight || undefined}
                                style={{
                                    fontFamily: "var(--font-aeonikpro)",
                                    fontSize: "13px",
                                    fontWeight: 400,
                                    lineHeight: 1.4,
                                    paddingLeft: "15px", // aligns with type text (7px dot + 8px gap)
                                    visibility: highlight ? "visible" : "hidden",
                                }}
                            >
                                {highlight ? <HighlightText text={highlight} /> : "​"}
                            </span>
                        )}
                    </div>

                    {/* Right column */}
                    {variant === "compact" ? (
                    // Compact: duration (smoke-ink, 500) · timestamp (pewter-mute, 400)
                        <span
                            style={{
                                flexShrink: 0,
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "13px",
                                lineHeight: 1.3,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <span style={{ fontWeight: 500, color: "var(--color-smoke-ink)" }}>
                                {duration}
                            </span>
                            <span
                                aria-hidden="true"
                                style={{ margin: "0 5px", color: "var(--color-pewter-mute)" }}
                            >
                            ·
                            </span>
                            <span style={{ fontWeight: 400, color: "var(--color-pewter-mute)" }}>
                                {timestamp}
                            </span>
                        </span>
                    ) : (
                    // Full: timestamp (pewter-mute, 400) on top; duration (smoke-ink, 500) below
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
                    )}
                </button>
            </div>
        );
    },
);