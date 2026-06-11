import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/theme-context";
import { useNavigate } from "react-router-dom";
import { AvatarButton } from "../../ui/AvatarButton/AvatarButton";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../../ui/DropdownMenu/DropdownMenu.tsx";

/* ============================================================================
 * AvatarMenu
 * ----------------------------------------------------------------------------
 *
 * The avatar dropdown menu for the TopBar's right region. Composes the
 * AvatarButton primitive (as the trigger) with DropdownMenu primitive
 * (as the contents). Reads from useAuth and useTheme to populate.
 *
 * Menu contents (in order):
 *   1. User label (name + email, non-interactive)
 *   2. Profile link → /profile
 *   3. Separator
 *   4. Theme label
 *   5. Light / Dark / System theme items (each shows ◉ when active)
 *   6. Separator
 *   7. Settings link → /settings
 *   8. Separator
 *   9. Sign out (destructive)
 *
 * Profile image is intentionally not shown — MemberDTO.profileImageId is
 * an ID, not a URL. When the backend exposes an image-serving endpoint
 * (likely during Settings work in FTRACK-26), this component should be
 * updated to pass imageUrl to AvatarButton. For now, initials only.
 *
 * Storybook caveat:
 *   This component requires AuthProvider + ThemeProvider + Router in context.
 *   See TopBar.stories.tsx for the mock decorators that satisfy these.
 * ============================================================================ */

type ThemeOption = "light" | "dark" | "system";

const THEME_OPTIONS: { value: ThemeOption; label: string  }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

export function AvatarMenu() {
    const { member, logOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    // Defensive fallback: if member is undefined (shouldn't happen inside a
    // protected route, but TypeScript doesn't know that), show a placeholder.
    // Better to render something than crash
    const displayName = member?.name ?? "Member";
    const displayEmail = member?.email ?? "";

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    const handleThemeSelect = (value: ThemeOption) => {
        setTheme(value);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <AvatarButton name={displayName} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* User identity header: non-interactive, just name + email */}
                <div
                    style={{
                        padding: "var(--spacing-8) var(--spacing-12) var(--spacing-12)",
                        borderBottom: "1px solid var(--color-linen-border)",
                        marginBottom: "var(--spacing-4)",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-aeonikpro)",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "var(--color-charcoal-ink)",
                            lineHeight: 1.3,
                            marginBottom: "2px"
                        }}
                    >
                        {displayName}
                    </div>
                    {displayEmail && (
                        <div
                            style={{
                                fontFamily: "var(--font-aeonikpro)",
                                fontSize: "12px",
                                color: "var(--color-pewter-mute)",
                                lineHeight: 1.3,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {displayEmail}
                        </div>
                    )}
                </div>

                {/* Profile link */}
                <DropdownMenuItem onSelect={handleProfileClick}>Profile</DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Theme submenu: three explicit items with active indicator */}
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                {THEME_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onSelect={() => handleThemeSelect(option.value)}
                    >
                        <ThemeActiveIndicator active={theme === option.value} />
                        <span>{option.label}</span>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Settings link */}
                <DropdownMenuItem onSelect={handleSettingsClick}>Settings</DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Sign out: destructive, separated from non-destructive actions */}
                <DropdownMenuItem destructive onSelect={logOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/* ----------------------------------------------------------------------------
 * ThemeActiveIndicator
 * ----------------------------------------------------------------------------
 * A small filled / hollow circle on the left side of theme items. Shows
 * which theme is currently selected. The circle is 8px diameter, sits in
 * a 16px gutter so the labels align consistently regardless of active state.
 * ---------------------------------------------------------------------------- */

function ThemeActiveIndicator({ active }: { active: boolean }) {
    return (
        <span
            aria-hidden="true"
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "16px",
                height: "16px",
                flexShrink: 0,
            }}
        >
            <span
                style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    backgroundColor: active ? "var(--color-indigo-signal)": "transparent",
                    border: active ? "none" : "1.5px solid var(--color-pewter-border)",
                    transition: "background 80ms ease, border-color 80ms ease",
                }}
            />
        </span>
    );
}