import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { TopBar } from "./TopBar";
import { MockAuthProvider } from "./storybook/MockAuthProvider";

/* ============================================================================
 * Storybook metadata
 * ----------------------------------------------------------------------------
 * The TopBar requires three React contexts to render: Router (for navigation
 * + active state), AuthProvider (for member data + logOut), and ThemeProvider
 * (which is already mounted globally in preview.tsx).
 *
 * We provide Router via MemoryRouter (so navigation works without changing
 * the browser URL) and Auth via a MockAuthProvider that returns a stub
 * member without making real API calls.
 * ============================================================================ */

const meta: Meta<typeof TopBar> = {
    title: "Layout / TopBar",
    component: TopBar,
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
        docs: {
            description: {
                component:
                    "The application shell's primary chrome. Composes Wordmark (left), three pill nav items (center), and Primary CTA + Avatar menu (right). Pill active state is route-driven. Avatar menu reads from useAuth and useTheme to populate sign-out, theme toggle, and profile/settings navigation.",
            },
        },
    },
    decorators: [
        (Story, context) => (
            <MockAuthProvider>
                <MemoryRouter
                    initialEntries={[context.parameters.initialRoute ?? "/dashboard"]}
                >
                    <Routes>
                        {/* Catch-all route so navigation works inside stories without
                rendering anything below the TopBar. The empty element is
                intentional — we're just verifying the TopBar itself. */}
                        <Route path="*" element={<Story />} />
                    </Routes>
                </MemoryRouter>
            </MockAuthProvider>
        ),
    ],
    argTypes: {
        onAddWorkout: {
            action: "Add workout clicked",
        },
    },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

/* ----------------------------------------------------------------------------
 * Default — TopBar on the Dashboard route
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    args: {},
};

/* ----------------------------------------------------------------------------
 * ActivitiesActive — Activities pill highlighted
 * ----------------------------------------------------------------------------
 * Demonstrates route-driven active state. Same TopBar, different active
 * pill, because the initial route is /activities.
 * ---------------------------------------------------------------------------- */

export const ActivitiesActive: Story = {
    args: {},
    parameters: {
        initialRoute: "/activities",
    },
};

/* ----------------------------------------------------------------------------
 * ProfileActive — Profile pill highlighted
 * ---------------------------------------------------------------------------- */

export const PlanActive: Story = {
    args: {},
    parameters: {
        initialRoute: "/plan",
    },
};

/* ----------------------------------------------------------------------------
 * NoActiveRoute — none of the pills are active
 * ----------------------------------------------------------------------------
 * Edge case: user is on a route that isn't represented in the nav (e.g.,
 * /settings, /404, /onboarding). All pills should render as inactive —
 * no pill should accidentally highlight.
 * ---------------------------------------------------------------------------- */

export const NoActiveRoute: Story = {
    args: {},
    parameters: {
        initialRoute: "/settings",
    },
};

/* ----------------------------------------------------------------------------
 * WithDashboardContent — TopBar above mock page content
 * ----------------------------------------------------------------------------
 * Shows the visual relationship between the TopBar chrome and the page
 * content below. Useful for verifying the hairline border feels right
 * (not too heavy, not invisible).
 * ---------------------------------------------------------------------------- */

export const WithDashboardContent: Story = {
    args: {},
    render: (args) => (
        <div style={{ minHeight: "100vh" }}>
            <TopBar {...args} />
            <main
                style={{
                    maxWidth: "1360px",
                    margin: "0 auto",
                    padding: "var(--spacing-48) var(--layout-page-padding-x)",
                }}
            >
                <h1
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "var(--text-heading)",
                        fontWeight: 500,
                        letterSpacing: "var(--tracking-heading)",
                        color: "var(--color-charcoal-ink)",
                        margin: 0,
                        marginBottom: "var(--spacing-16)",
                    }}
                >
                    Good morning, Long
                </h1>
                <p
                    style={{
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "var(--text-body)",
                        color: "var(--color-smoke-ink)",
                        margin: 0,
                        maxWidth: "60ch",
                    }}
                >
                    Tuesday is usually Pull Day 2. Real Dashboard content would render
                    here, but for this story it&apos;s just text — we&apos;re verifying the TopBar
                    chrome reads correctly against page content below.
                </p>
            </main>
        </div>
    ),
};