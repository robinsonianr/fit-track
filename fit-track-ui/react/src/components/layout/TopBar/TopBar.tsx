import { useLocation, useNavigate } from "react-router-dom";
import { Wordmark } from "../../ui/WordMark/Wordmark";
import { PillNavigationItem } from "../../ui/PillNavigationItem/PillNavigationItem";
import { ActionButton } from "../../ui/ActionButton/ActionButton";
import { AvatarMenu } from "./AvatarMenu";

/* ============================================================================
 * TopBar
 * ----------------------------------------------------------------------------
 * The application shell's primary chrome. Three regions:
 *
 *   - Left:   Wordmark
 *   - Center: Pill navigation (Dashboard, Activities, Profile)
 *   - Right:  Primary CTA (Add workout) + Avatar menu
 *
 * Pill nav active state is route-driven via React Router's useLocation.
 * Clicking a pill navigates to its route.
 *
 * The "Add workout" CTA fires an onAddWorkout callback rather than owning
 * modal state. The parent (Layout in FTRACK-19) owns the WorkoutModal and
 * handles open/close. This keeps TopBar a pure chrome component — it
 * doesn't know about workout modals or any other feature concerns.
 *
 * Avatar menu is composed via the separate AvatarMenu component, which
 * handles theme switching, profile/settings navigation, and sign-out
 * via existing useAuth and useTheme hooks.
 *
 * Used by:
 *   - Root layout (Layout component in pages/layout.tsx, after FTRACK-19)
 *
 * Design tokens consumed:
 *   - --color-paper-canvas    (background)
 *   - --color-linen-border    (hairline border bottom)
 *   - --layout-topbar-height  (72px)
 *   - --layout-page-padding-x (40px)
 *
 * Not yet mounted in production — this component exists in the codebase
 * for FTRACK-18 verification but is still rendered in Storybook only.
 * FTRACK-19 will replace the existing sidebar with this component.
 * ============================================================================ */

interface TopBarProps {
    /** Fires when the user clicks the "Add workout" primary CTA. The parent
     * is expected to open the 'WorkoutModal' (or equivalent flow). TopBar
     * doesn't own modal state. */
    onAddWorkout: () => void;
}

interface NavItem {
    label: string;
    path: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Activities", path: "/activities" },
    { label: "Plan", path: "/plan" },
];

export function TopBar({ onAddWorkout }: TopBarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    /* Determine which nav item is active based on the current pathname.
     *  Uses startsWith() rather than exact equality so that nested routes
     * (e.g., /activities/:id) still highlight the parent pill. */
    const isActive = (path: string): boolean => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <header
            style={{
                height: "var(--layout-topbar-height)",
                padding: "0 var(--layout-page-padding-x)",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                backgroundColor: "var(--color-paper-canvas)",
                borderBottom: "1px solid var(--color-linen-border)",
            }}
        >
            {/* Left region: Wordmark */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    style={{
                        background: "transparent",
                        border: "none",
                        padding: "0",
                        cursor: "pointer",
                    }}
                    aria-label="FitTrack — Go to dashboard"
                >
                    <Wordmark />
                </button>
            </div>

            {/* Center region — Pill navigation */}
            <nav
                aria-label="Primary navigation"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-4)",
                }}
            >
                {NAV_ITEMS.map((item) => (
                    <PillNavigationItem
                        key={item.path}
                        active={isActive(item.path)}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </PillNavigationItem>
                ))}
            </nav>

            {/* Right region — Primary CTA + Avatar menu */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "var(--spacing-16)",
                }}
            >
                <ActionButton variant="primary" onClick={onAddWorkout}>
                    Add workout
                </ActionButton>
                <AvatarMenu />
            </div>
        </header>
    );
}