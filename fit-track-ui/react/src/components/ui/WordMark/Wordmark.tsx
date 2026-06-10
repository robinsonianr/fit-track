/* ============================================================================
 * Wordmark
 * ----------------------------------------------------------------------------
 * FitTrack's wordmark — the brand identity in the TopBar's left region.
 *
 * Renders the application name in AeonikPro at the type role specified in
 * DESIGN.md. The wordmark is intentionally a single typographic gesture
 * (no icon mark) for v1; an icon mark can be added in a polish PR later.
 *
 * Used by:
 *   - TopBar (left region)
 *   - Marketing pages (if/when they exist)
 *
 * The component is presentational. It does not handle navigation; the caller
 * wraps it in a Link or anchor when navigation behavior is needed. This keeps
 * the wordmark reusable in contexts that aren't routing-aware (e.g., a
 * marketing footer).
 * ============================================================================ */

interface WordmarkProps {
    /** Optional className for layout positioning. Avoid styling-related
     *  overrides — the wordmark's visual treatment is non-negotiable. */
    className?: string;
}

export function Wordmark({ className }: WordmarkProps) {
    return (
        <span
            className={className}
            style={{
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "18px",
                fontWeight: 500,
                letterSpacing: "var(--tracking-card)",
                color: "var(--color-charcoal-ink)",
                userSelect: "none",
                // The wordmark is meaningful navigation context but isn't itself a link.
                // ARIA-wise it announces as a heading-level brand label; consumers can
                // wrap it in a Link to give it interactive semantics.
            }}
            aria-label="FitTrack"
        >
      FitTrack
        </span>
    );
}