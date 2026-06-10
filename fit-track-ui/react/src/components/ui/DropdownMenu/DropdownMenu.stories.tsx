import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "./DropdownMenu";
import { ActionButton } from "../ActionButton/ActionButton";
import { AvatarButton } from "../AvatarButton/AvatarButton";

/* ============================================================================
 * Storybook metadata
 * ============================================================================ */

const meta: Meta = {
    title: "Components / TopBar / DropdownMenu",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Accessible dropdown menu built on Radix's primitive. Compound API: Root composes Trigger + Content, with Item, Separator, and Label as content children. Full keyboard support (Arrow keys, Enter, Esc, Home/End, type-ahead), click-outside dismissal, focus trap, and ARIA semantics all handled by Radix.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

/* ----------------------------------------------------------------------------
 * Basic — minimal menu with three plain items
 * ----------------------------------------------------------------------------
 * Click the trigger to open. Use arrow keys to navigate, Enter to select,
 * Escape to close. The menu closes when an item is selected or when you
 * click outside.
 * ---------------------------------------------------------------------------- */

export const Basic: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ActionButton variant="secondary">Open menu</ActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => console.log("Profile")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log("Settings")}>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log("Sign out")}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

/* ----------------------------------------------------------------------------
 * WithSeparator — items grouped by a divider
 * ----------------------------------------------------------------------------
 * Separator visually groups related items. Common pattern: regular items
 * above, destructive action below the separator.
 * ---------------------------------------------------------------------------- */

export const WithSeparator: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ActionButton variant="secondary">Menu with groups</ActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

/* ----------------------------------------------------------------------------
 * WithLabel — items grouped under a category heading
 * ---------------------------------------------------------------------------- */

export const WithLabel: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ActionButton variant="secondary">Menu with labels</ActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

/* ----------------------------------------------------------------------------
 * AvatarTrigger — the TopBar production usage
 * ----------------------------------------------------------------------------
 * Exactly how the avatar dropdown will work in the real TopBar. Avatar
 * acts as the trigger; menu contents are the four canonical items from
 * FTRACK-18's spec: Profile, Theme toggle, Settings, Sign out.
 *
 * Theme submenu is collapsed into a single item for this demo — the real
 * implementation in FTRACK-18 will wire it to ThemeContext with a proper
 * submenu or inline toggle.
 * ---------------------------------------------------------------------------- */

export const AvatarTrigger: Story = {
    render: () => (
        <div
            style={{
                height: "72px",
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                backgroundColor: "var(--color-paper-canvas)",
                borderBottom: "1px solid var(--color-linen-border)",
            }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <AvatarButton name="Long Tang" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Long Tang</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Theme: System</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
    },
};

/* ----------------------------------------------------------------------------
 * KeyboardNavigation — verifies the accessibility features Radix provides
 * ----------------------------------------------------------------------------
 * Open the menu, then exercise the keyboard:
 *   - Arrow Down / Arrow Up → moves between items
 *   - Enter or Space → selects the focused item
 *   - Escape → closes the menu, returns focus to trigger
 *   - Home → first item
 *   - End → last item
 *   - Type a letter → focuses the first item starting with that letter
 *     (type-ahead, e.g., "P" focuses "Profile")
 *
 * All of this works without writing a single line of keyboard handling
 * code — it's Radix's responsibility, and they handle it correctly across
 * every modern browser.
 * ---------------------------------------------------------------------------- */

export const KeyboardNavigation: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ActionButton variant="secondary">Test keyboard nav</ActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Feedback</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Verify Radix's keyboard support: Arrow keys navigate, Enter selects, Escape closes, Home/End jump to first/last, and typing a letter focuses the first matching item (type 'P' to focus 'Profile').",
            },
        },
    },
};