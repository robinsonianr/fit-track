/* ============================================================================
 * MetricCard
 * ----------------------------------------------------------------------------
 * Stat tile for the Dashboard's Quick Stats row. Typography hierarchy is the
 * primary design challenge: value dominates at 36px, label and secondary
 * recede. A user should register the number in under one second of looking.
 *
 * The `secondary` prop supports a "+/-" prefix convention: if secondary starts
 * with "+" the prefix renders in --color-moss-positive; if it starts with "-"
 * the prefix renders in --color-rust-negative. Only the prefix is colored —
 * the rest of the text stays in --color-smoke-ink.
 *
 * The `loading` prop renders three skeleton blocks at label/value/secondary
 * positions. The pulse animation is defined via a <style> tag injected once
 * — no external CSS file required, consistent with the inline-styles pattern.
 *
 * Used by:
 *   - Dashboard (Quick Stats row, three cards in a grid)
 *
 * Design tokens consumed:
 *   - --color-paper-canvas     (card background)
 *   - --color-linen-border     (1px card border)
 *   - --color-charcoal-ink     (value text)
 *   - --color-smoke-ink        (secondary text)
 *   - --color-pewter-mute      (label text)
 *   - --color-ash-inset        (skeleton background)
 *   - --color-moss-positive    (positive delta prefix)
 *   - --color-rust-negative    (negative delta prefix)
 *   - --font-aeonikpro         (all text)
 *   - --tracking-small         (label letter-spacing)
 *   - --radius-cards           (12px border-radius)
 *   - --spacing-24             (card padding)
 *   - --spacing-8              (label→value gap)
 *   - --spacing-4              (value→secondary gap)
 *
 * Accessibility:
 *   - Not interactive — no role, no tabIndex.
 *   - Loading state uses aria-busy="true" and aria-label for screen readers.
 * ============================================================================ */

interface MetricCardProps {
    /** The metric label (e.g., "Sessions this week"). Rendered uppercase, muted. */
    label: string;
    /** The primary value. Caller is responsible for formatting (commas, units, decimals). */
    value: string | number;
    /** Optional secondary text below the value — target ("/ 4 target") or delta ("+1 from last week").
     *  If it starts with "+" the prefix renders green; "-" renders rust. */
    secondary?: string;
    /** Renders skeleton placeholders instead of value/secondary. */
    loading?: boolean;
    /** className passthrough for layout positioning. */
    className?: string;
}

/* Parse secondary text into a prefix (colored) and remainder (default color).
 * Returns null prefix when no +/- prefix is present. */
function parseSecondary(text: string): { prefix: string | null; rest: string } {
    if (text.startsWith("+") || text.startsWith("-")) {
        return { prefix: text[0], rest: text.slice(1) };
    }
    return { prefix: null, rest: text };
}

function prefixColor(prefix: string): string {
    if (prefix === "+") return "var(--color-moss-positive)";
    if (prefix === "-") return "var(--color-rust-negative)";
    return "var(--color-smoke-ink)";
}

/* Skeleton block — a muted rectangle that pulses to signal loading. */
function Skeleton({ width, height }: { width: string; height: string }) {
    return (
        <div
            aria-hidden="true"
            style={{
                width,
                height,
                backgroundColor: "var(--color-ash-inset)",
                borderRadius: "4px",
                animation: "metric-card-pulse 1.4s ease-in-out infinite",
            }}
        />
    );
}

/* Injected once per page render — defines the pulse keyframes without needing
 * an external CSS file. Using a unique animation name to avoid collisions. */
const PULSE_STYLE = `
@keyframes metric-card-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
`;

export function MetricCard({ label, value, secondary, loading = false, className }: MetricCardProps) {
    return (
        <>
            <style>{PULSE_STYLE}</style>
            <div
                className={className}
                aria-busy={loading || undefined}
                aria-label={loading ? `${label}, loading` : undefined}
                style={{
                    padding: "var(--spacing-24)",
                    backgroundColor: "var(--color-paper-canvas)",
                    border: "1px solid var(--color-linen-border)",
                    borderRadius: "var(--radius-cards)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Label */}
                <span
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-small)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: "var(--spacing-8)",
                    }}
                >
                    {label}
                </span>

                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
                        <Skeleton width="60%" height="36px" />
                        <Skeleton width="40%" height="16px" />
                    </div>
                ) : (
                    <>
                        {/* Value */}
                        <span
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "36px",
                                fontWeight: 500,
                                color: "var(--color-charcoal-ink)",
                                lineHeight: 1,
                                marginBottom: secondary ? "var(--spacing-4)" : 0,
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {value}
                        </span>

                        {/* Secondary */}
                        {secondary && (() => {
                            const { prefix, rest } = parseSecondary(secondary);
                            return (
                                <span
                                    style={{
                                        fontFamily: "var(--font-aeonikpro)",
                                        fontSize: "13px",
                                        fontWeight: 400,
                                        color: "var(--color-smoke-ink)",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {prefix && (
                                        <span style={{ color: prefixColor(prefix) }}>
                                            {prefix}
                                        </span>
                                    )}
                                    {rest}
                                </span>
                            );
                        })()}
                    </>
                )}
            </div>
        </>
    );
}
