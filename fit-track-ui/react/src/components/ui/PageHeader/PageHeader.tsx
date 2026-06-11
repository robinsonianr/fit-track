import type { ReactNode } from "react";

/* ============================================================================
 * PageHeader
 * ----------------------------------------------------------------------------
 * The personal greeting at the top of the Dashboard. Renders a greeting +
 * name on the first line and a date on the second. Large but soft — personal
 * and grounded rather than announce-y.
 *
 * The parent is responsible for computing the greeting string based on the
 * time of day and the date string based on user preference. PageHeader
 * renders whatever it receives — no date logic lives here.
 *
 * Used by:
 *   - Dashboard (top of page, above all sections)
 *
 * Design tokens consumed:
 *   - --color-charcoal-ink     (greeting text)
 *   - --color-smoke-ink        (date text)
 *   - --font-aeonikpro         (both lines)
 *   - --tracking-heading       (greeting letter-spacing)
 *   - --spacing-4              (gap between greeting and date)
 *   - --spacing-32             (bottom margin before first section)
 *
 * Accessibility:
 *   - Greeting renders as <h1> — it is the page's primary heading.
 *   - Date renders as <p>.
 *   - Action slot (if used) should be a button or link for keyboard access.
 * ============================================================================ */

interface PageHeaderProps {
    /** The greeting text. Typically "Good morning", "Good afternoon", "Good evening". Parent computes based on time of day. */
    greeting: string;
    /** The user's first name. Appended to the greeting: "{greeting}, {name}". */
    name: string;
    /** The current date, pre-formatted by the parent (e.g., "Tuesday, June 11"). */
    date: string;
    /** Optional action element on the right side of the greeting row (e.g., a primary CTA). */
    action?: ReactNode;
    /** className passthrough for layout positioning. */
    className?: string;
}

export function PageHeader({ greeting, name, date, action, className }: PageHeaderProps) {
    return (
        <div
            className={className}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "var(--spacing-32)",
            }}
        >
            {/* Left: greeting + date stacked */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-4)",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "28px",
                        fontWeight: 500,
                        color: "var(--color-charcoal-ink)",
                        letterSpacing: "var(--tracking-heading)",
                        lineHeight: 1.1,
                    }}
                >
                    {greeting}, {name}
                </h1>
                <p
                    style={{
                        margin: 0,
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "var(--color-smoke-ink)",
                        lineHeight: 1.4,
                    }}
                >
                    {date}
                </p>
            </div>

            {/* Right: optional action */}
            {action && (
                <div style={{ flexShrink: 0, paddingTop: "2px" }}>
                    {action}
                </div>
            )}
        </div>
    );
}