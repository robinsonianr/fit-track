import { forwardRef } from "react";
import * as Avatar from "@radix-ui/react-avatar";

/* ============================================================================
 * AvatarButton
 * ----------------------------------------------------------------------------
 * Circular avatar button that sits in the TopBar's right region. Shows the
 * user's profile image when provided, falls back to initials when not.
 *
 * Uses Radix's Avatar primitive for the image-with-fallback behavior — the
 * fallback renders only after the image either fails to load or doesn't
 * resolve within a short delay. This prevents the flash of initials that
 * happens when an image is in flight.
 *
 * Used by:
 *   - TopBar (right region, triggers the avatar dropdown menu)
 *
 * Design tokens consumed:
 *   - --color-indigo-wash    (background fill)
 *   - --color-indigo-signal  (initials color)
 *   - --color-indigo-press   (focus ring + hover ring)
 *   - --font-aeonikpro       (initials typeface)
 *
 * Accessibility:
 *   - Renders as a real <button> with explicit aria-label so screen readers
 *     announce the user's name + action ("Long Tang menu")
 *   - Visible focus ring on keyboard focus (focus-visible only — no ring on
 *     mouse click)
 * ============================================================================ */

interface AvatarButtonProps {
    name: string;
    imageUrl?: string;
    onClick?: () => void;
    /** Optional className for layout positioning. */
    className?: string;
}

/* Helper: convert "Long Tang" → "LT". Falls back gracefully for single-word
 * names ("Long" → "L") and empty strings (""). Initials are always uppercase
 * regardless of input casing.
 *
 * Edge cases considered:
 *   - "Long" → "L"
 *   - "Long Tang" → "LT"
 *   - "Long Quang Tang" → "LT" (first + last, skip middle)
 *   - "long tang" → "LT" (uppercased)
 *   - "" → "?" (defensive fallback; should never happen if name is required)
 *
 * Locale-aware uppercasing isn't critical here since initials are typically
 * Latin characters, but using toLocaleUpperCase() costs nothing and handles
 * Turkish dotless-i and similar quirks correctly. */
function getInitials(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return "?";

    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
        return parts[0][0].toLocaleUpperCase();
    }
    // Take first and last name only, skipping middle names
    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return (first + last).toLocaleUpperCase();
}

export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
    function AvatarButton({ name, imageUrl, onClick, className }, ref) {
        const initials = getInitials(name);

        return (
            <button
                ref={ref}
                type="button"
                onClick={onClick}
                aria-label={`${name} menu`}
                className={className}
                style={{
                // Reset default button chrome
                    border: "none",
                    padding: 0,
                    background: "transparent",
                    cursor: "pointer",

                    // Sizing and shape
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-avatar)",

                    // Focus ring — only on keyboard focus, not mouse click
                    outline: "none",
                // The focus-visible style is applied via the data attribute pattern
                // because pure CSS :focus-visible doesn't work inline. The actual
                // ring styling lives in a CSS layer; here we just ensure no default
                // browser outline.
                }}
                // Inline focus-visible handling for storybook isolation. In production
                // this would live in a CSS class; keeping it inline for now so the
                // primitive is fully self-contained.
                onFocus={(e) => {
                    if (e.target.matches(":focus-visible")) {
                        e.currentTarget.style.boxShadow =
                        "0 0 0 2px var(--color-paper-canvas), 0 0 0 4px var(--color-indigo-press)";
                    }
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                <Avatar.Root
                    style={{
                    // Make the Radix root fill the button completely
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        borderRadius: "var(--radius-avatar)",
                        backgroundColor: "var(--color-indigo-wash)",
                        overflow: "hidden",
                        userSelect: "none",
                    }}
                >
                    {imageUrl && (
                        <Avatar.Image
                            src={imageUrl}
                            alt={name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "inherit",
                            }}
                        />
                    )}
                    <Avatar.Fallback
                        delayMs={imageUrl ? 600 : 0}
                        // 600ms delay prevents flash of initials when an image is in flight.
                        // If no imageUrl is provided, render immediately (delayMs: 0).
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "14px",
                            fontWeight: 500,
                            letterSpacing: "var(--tracking-small)",
                            color: "var(--color-indigo-signal)",
                            lineHeight: 1,
                        }}
                    >
                        {initials}
                    </Avatar.Fallback>
                </Avatar.Root>
            </button>
        );
    });
AvatarButton.displayName = "AvatarButton";