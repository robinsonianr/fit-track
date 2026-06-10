import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ============================================================================
 * DropdownMenu
 * ----------------------------------------------------------------------------
 * Accessible dropdown menu built on Radix's DropdownMenu primitive. Radix
 * handles the heavy lifting — focus management, keyboard navigation
 * (Arrow keys, Enter, Escape, Home/End, type-ahead), click-outside dismissal,
 * portal rendering, and ARIA semantics — and we style with design tokens.
 *
 * The API mirrors Radix's compound-component pattern: a Root that composes
 * Trigger + Content, with Item, Separator, and Label as content children.
 * This makes the primitive composable in any context — a kebab menu, a
 * dropdown selector, a context menu, etc.
 *
 * Used by:
 *   - TopBar avatar dropdown (Profile, Theme, Settings, Sign out)
 *   - Future: any surface needing a menu (cards, table rows, sort selectors)
 *
 * Design tokens consumed:
 *   - --color-paper-canvas        (menu background)
 *   - --color-linen-border        (hairline border + separator)
 *   - --color-charcoal-ink        (item text)
 *   - --color-smoke-ink           (label text)
 *   - --color-pewter-mute         (label muted text)
 *   - --color-vellum-surface      (item hover/focus background)
 *   - --color-brick-danger        (destructive item text)
 *   - --font-aeonikpro            (typeface)
 *   - --radius-inputs             (8px menu border-radius)
 *   - --spacing-4, --spacing-8    (item padding)
 *
 * Accessibility:
 *   - Full keyboard support via Radix (arrow keys, Enter, Esc, Home/End)
 *   - Focus is trapped within the menu while open
 *   - Click outside closes the menu
 *   - Escape closes and returns focus to the trigger
 *   - Screen readers announce role="menu" and role="menuitem"
 *   - Type-ahead: typing a letter focuses the first matching item
 * ============================================================================ */

/* ----------------------------------------------------------------------------
 * Root — composes Trigger and Content. Just a re-export of Radix's Root.
 * ---------------------------------------------------------------------------- */

export const DropdownMenu = RadixDropdownMenu.Root;

/* ----------------------------------------------------------------------------
 * Trigger — what the user clicks/taps to open the menu.
 *
 * We re-export Radix's Trigger directly because triggers are caller-specific
 * (an avatar button, a kebab icon, a text link — they vary too much to
 * pre-style). The caller wraps their own component in this Trigger.
 *
 * Usage:
 *   <DropdownMenuTrigger asChild>
 *     <AvatarButton name="Long Tang" />
 *   </DropdownMenuTrigger>
 *
 * The `asChild` prop is critical — it tells Radix to use the child as the
 * trigger element instead of wrapping it in a default <button>. Without
 * asChild, you'd get nested buttons (invalid HTML).
 * ---------------------------------------------------------------------------- */

export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

/* ----------------------------------------------------------------------------
 * Content — the floating panel that appears on open.
 *
 * Radix renders this in a portal at the document root, so it escapes any
 * parent's overflow:hidden or transform contexts. The portal also keeps the
 * menu's z-index simple — it sits above everything else in the DOM.
 *
 * sideOffset of 8 separates the menu from its trigger by 8px (one spacing
 * unit), matching the visual rhythm of the design system.
 * ---------------------------------------------------------------------------- */

type DropdownMenuContentProps = ComponentPropsWithoutRef<
    typeof RadixDropdownMenu.Content
>;

export function DropdownMenuContent({
    children,
    sideOffset = 8,
    align = "end",
    ...props
}: DropdownMenuContentProps) {
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                sideOffset={sideOffset}
                align={align}
                style={{
                    minWidth: "200px",
                    padding: "var(--spacing-4)",
                    backgroundColor: "var(--color-paper-canvas)",
                    border: "1px solid var(--color-linen-border)",
                    borderRadius: "var(--radius-inputs)",

                    // Subtle elevation for the floating menu. The design system is
                    // shadow-minimal, but transient floating UI is one of the listed
                    // exceptions in DESIGN.md's Elevation section.
                    boxShadow:
                        "0 2px 8px rgba(15, 20, 17, 0.06), 0 1px 2px rgba(15, 20, 17, 0.04)",

                    // Animation on open/close. Radix exposes data attributes we can
                    // animate against: data-state="open" or "closed", and data-side
                    // tells us the side relative to the trigger.
                    animationDuration: "120ms",
                    animationTimingFunction: "ease-out",

                    // Prevent text selection while the menu is open
                    userSelect: "none",
                }}
                {...props}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    );
}

/* ----------------------------------------------------------------------------
 * Item — a single clickable row in the menu.
 *
 * The `destructive` prop styles the item in Brick Danger for actions that
 * have irreversible consequences (sign out, delete, etc.). This is the
 * standard convention; users learn to associate the red treatment with
 * "this action is significant."
 *
 * Radix handles the focus and selection states via data attributes
 * (data-highlighted when the item is keyboard-focused or hovered). We
 * apply the styling inline based on those attributes.
 * ---------------------------------------------------------------------------- */

interface DropdownMenuItemProps
    extends Omit<
        ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>,
        "children"
    > {
    /** Item label. Can include icons via JSX. */
    children: ReactNode;
    /** Visual treatment for destructive actions (sign out, delete).
     *  Styles the item in Brick Danger. Default: false. */
    destructive?: boolean;
}

export function DropdownMenuItem({
    children,
    destructive = false,
    ...props
}: DropdownMenuItemProps) {
    return (
        <RadixDropdownMenu.Item
            style={{
                // Reset default Radix chrome
                outline: "none",
                cursor: "pointer",

                // Typography
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "var(--tracking-small)",
                lineHeight: 1.4,

                // Layout
                padding: "var(--spacing-8) var(--spacing-12)",
                borderRadius: "var(--radius-badges)",

                // Color
                color: destructive
                    ? "var(--color-brick-danger)"
                    : "var(--color-charcoal-ink)",

                // Highlight state (keyboard focus + hover) handled via Radix's data-
                // attributes. We use inline styles + a small CSS-in-JS pattern: when
                // data-highlighted is set, background shifts to Vellum Surface.
                // Since we can't easily target [data-highlighted] in inline styles,
                // we rely on Radix's onPointerEnter/onPointerLeave + onFocus/onBlur.
                // This is fine — Radix already handles the keyboard nav.
                backgroundColor: "transparent",
                transition: "background-color 80ms ease",

                // Layout for icons + text
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-8)",
            }}
            onPointerEnter={(e) => {
                e.currentTarget.style.backgroundColor = destructive
                    ? "rgba(153, 27, 27, 0.06)" // 6% Brick Danger wash
                    : "var(--color-vellum-surface)";
            }}
            onPointerLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
            onFocus={(e) => {
                e.currentTarget.style.backgroundColor = destructive
                    ? "rgba(153, 27, 27, 0.06)"
                    : "var(--color-vellum-surface)";
            }}
            onBlur={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
            {...props}
        >
            {children}
        </RadixDropdownMenu.Item>
    );
}

/* ----------------------------------------------------------------------------
 * Separator — hairline divider between item groups.
 *
 * Used to visually group related items (e.g., destructive actions separated
 * from regular actions). Renders as a 1px Linen Border line with vertical
 * margin matching the spacing rhythm.
 * ---------------------------------------------------------------------------- */

export function DropdownMenuSeparator() {
    return (
        <RadixDropdownMenu.Separator
            style={{
                height: "1px",
                backgroundColor: "var(--color-linen-border)",
                margin: "var(--spacing-4) 0",
            }}
        />
    );
}

/* ----------------------------------------------------------------------------
 * Label — non-interactive section header within the menu.
 *
 * Used to group items under a category heading (e.g., "Theme" above a
 * theme-toggle group). The label is read aloud by screen readers as a
 * group heading.
 * ---------------------------------------------------------------------------- */

interface DropdownMenuLabelProps {
    children: ReactNode;
}

export function DropdownMenuLabel({ children }: DropdownMenuLabelProps) {
    return (
        <RadixDropdownMenu.Label
            style={{
                fontFamily: "var(--font-aeonikpro)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "var(--tracking-small)",
                textTransform: "uppercase",
                color: "var(--color-pewter-mute)",
                padding: "var(--spacing-8) var(--spacing-12) var(--spacing-4)",
                userSelect: "none",
            }}
        >
            {children}
        </RadixDropdownMenu.Label>
    );
}