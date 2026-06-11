import type { ReactNode } from "react";

/* ============================================================================
 * SectionTitle
 * ----------------------------------------------------------------------------
 * Quiet label that sits above each Dashboard section ("This week",
 * "Recent activity", "Noticed"). Establishes vertical rhythm — the 12px
 * bottom margin is the consistent gap between a section label and the
 * content that follows it.
 *
 * The companion-voice design rule: section titles are reference points, not
 * headings. They should recede visually so content dominates. Hence: small
 * size, muted color, uppercase with tracking.
 *
 * Used by:
 *   - Dashboard (above Quick Stats, Recent Activity, Insights sections)
 *
 * Design tokens consumed:
 *   - --color-pewter-mute      (title + eyebrow color)
 *   - --font-aeonikpro         (title typeface)
 *   - --font-mono              (eyebrow typeface)
 *   - --tracking-small         (uppercase letter-spacing)
 *   - --spacing-4              (gap between eyebrow and title)
 *   - --spacing-12             (bottom margin before content)
 *
 * Accessibility:
 *   - Renders as a <div> with aria-label passthrough via className.
 *   - Not a heading element — sections are not document-outline sections.
 *   - Action slot (if used) should be a button or link for keyboard access.
 * ============================================================================ */

interface SectionTitleProps {
    /** The section label text. */
    children: ReactNode;
    /** Optional right-side action. Typically a "View all" ghost link or small button. */
    action?: ReactNode;
    /** Optional eyebrow text rendered above the title in monospace. Used for extra-low-emphasis labels. */
    eyebrow?: string;
    /** className passthrough for layout positioning. */
    className?: string;
}

export function SectionTitle({ children, action, eyebrow, className }: SectionTitleProps) {
    return (
        <div
            className={className}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "var(--spacing-12)",
            }}
        >
            {/* Left: optional eyebrow stacked above title */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-4)",
                }}
            >
                {eyebrow && (
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 500,
                            color: "var(--color-pewter-mute)",
                            letterSpacing: "var(--tracking-small)",
                            textTransform: "uppercase",
                            lineHeight: 1,
                        }}
                    >
                        {eyebrow}
                    </span>
                )}
                <span
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-small)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                    }}
                >
                    {children}
                </span>
            </div>

            {/* Right: optional action (pushed to far edge via space-between) */}
            {action && (
                <div style={{ flexShrink: 0 }}>
                    {action}
                </div>
            )}
        </div>
    );
}