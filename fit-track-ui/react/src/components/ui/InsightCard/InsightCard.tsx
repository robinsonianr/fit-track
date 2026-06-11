/* ============================================================================
 * InsightCard
 * ----------------------------------------------------------------------------
 * A quiet, observation-only card for the Dashboard's "Noticed" section.
 * Renders a single sentence. No action affordances — no buttons, no links,
 * no chevrons. The absence of interactivity is a deliberate design constraint:
 * the moment an action appears, the card becomes a prompt, which violates the
 * companion voice. InsightCard observes; it does not prescribe.
 *
 * The `body` prop is typed as `string` (not ReactNode) to enforce this
 * constraint at the type level. Callers cannot sneak interactive content in.
 *
 * Used by:
 *   - Dashboard ("Noticed" section)
 *
 * Design tokens consumed:
 *   - --color-vellum-surface   (card background)
 *   - --color-linen-border     (1px card border)
 *   - --color-charcoal-ink     (body text)
 *   - --color-pewter-mute      (eyebrow text)
 *   - --font-aeonikpro         (body typeface)
 *   - --font-mono              (eyebrow typeface)
 *   - --tracking-small         (eyebrow letter-spacing)
 *   - --radius-cards           (12px border-radius)
 *   - --spacing-24             (card padding)
 *   - --spacing-8              (gap between eyebrow and body)
 *
 * Accessibility:
 *   - Not interactive — no role, no tabIndex, no keyboard handling.
 *   - cursor: default to signal non-interactivity.
 * ============================================================================ */

interface InsightCardProps {
    /** The observational sentence. Plain string only — no rich content.
     *  Write in companion voice: factual, present-tense, no prescription.
     *  Good: "You trained 3 times this week, up from 2 last week."
     *  Avoid: "Try adding a rest day this week." */
    body: string;
    /** Optional monospace eyebrow label above the body (e.g. "NOTICED"). */
    eyebrow?: string;
    /** className passthrough for layout positioning. */
    className?: string;
}

export function InsightCard({ body, eyebrow, className }: InsightCardProps) {
    return (
        <div
            className={className}
            style={{
                padding: "var(--spacing-24)",
                backgroundColor: "var(--color-vellum-surface)",
                border: "1px solid var(--color-linen-border)",
                borderRadius: "var(--radius-cards)",
                cursor: "default",
            }}
        >
            {eyebrow && (
                <span
                    style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-small)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: "var(--spacing-12)",
                    }}
                >
                    {eyebrow}
                </span>
            )}
            <p
                style={{
                    margin: 0,
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "var(--color-charcoal-ink)",
                    lineHeight: 1.5,
                }}
            >
                {body}
            </p>
        </div>
    );
}