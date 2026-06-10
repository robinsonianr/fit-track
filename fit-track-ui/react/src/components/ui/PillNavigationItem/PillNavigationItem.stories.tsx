import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PillNavigationItem } from "./PillNavigationItem";

/* ============================================================================
 * Storybook metadata
 * ----------------------------------------------------------------------------
 * PillNavigationItem stories cover the three visual states (inactive, active,
 * hover-via-CSS) plus a cluster view showing how items group together
 * in the TopBar's center region.
 * ============================================================================ */

const meta: Meta<typeof PillNavigationItem> = {
    title: "Components / TopBar / PillNavigationItem",
    component: PillNavigationItem,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Full-pill navigation item in the TopBar's center cluster. Three states: inactive (Smoke Ink on transparent), active (Indigo Signal on Indigo Wash), hover (Charcoal Ink on Vellum Surface). The component is route-agnostic — the composition layer determines which item is active.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        children: {
            control: "text",
            description: "Label text inside the pill",
        },
        active: {
            control: "boolean",
            description: "Whether this item represents the current route",
        },
        onClick: {
            action: "clicked",
            description: "Fired when the pill is clicked",
        },
    },
};

export default meta;

type Story = StoryObj<typeof PillNavigationItem>;

/* ----------------------------------------------------------------------------
 * Inactive — the default state for non-current routes
 * ---------------------------------------------------------------------------- */

export const Inactive: Story = {
    args: {
        children: "Dashboard",
        active: false,
    },
};

/* ----------------------------------------------------------------------------
 * Active — current route indicator
 * ----------------------------------------------------------------------------
 * Verify: text is Indigo Signal, background is Indigo Wash. The active state
 * is also announced via aria-current="page" — inspect the DOM to confirm.
 * ---------------------------------------------------------------------------- */

export const Active: Story = {
    args: {
        children: "Dashboard",
        active: true,
    },
};

/* ----------------------------------------------------------------------------
 * AllStates — side-by-side comparison of every state
 * ----------------------------------------------------------------------------
 * Hover over each one in turn to see the hover state. The active pill on
 * the right stays in its active styling regardless of hover, because
 * active > hover in the state priority.
 * ---------------------------------------------------------------------------- */

export const AllStates: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-24)",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-8)",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-mono-label)",
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-mono-small)",
                    }}
                >
          INACTIVE
                </span>
                <PillNavigationItem>Dashboard</PillNavigationItem>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-8)",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-mono-label)",
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-mono-small)",
                    }}
                >
          HOVER (mouse over me)
                </span>
                <PillNavigationItem>Dashboard</PillNavigationItem>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-8)",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-mono-label)",
                        color: "var(--color-pewter-mute)",
                        letterSpacing: "var(--tracking-mono-small)",
                    }}
                >
          ACTIVE
                </span>
                <PillNavigationItem active>Dashboard</PillNavigationItem>
            </div>
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * Cluster — how the pills group in the TopBar's center region
 * ----------------------------------------------------------------------------
 * The four primary nav items rendered as they would appear in the TopBar.
 * Click any item to make it active; the previous active item becomes
 * inactive. This is the same pattern the real TopBar will use, but here
 * the state is local to the story instead of route-driven.
 * ---------------------------------------------------------------------------- */

export const Cluster: Story = {
    render: () => {
        const items = ["Dashboard", "Activities", "Profile"];
        const [activeItem, setActiveItem] = useState("Dashboard");

        return (
            <div
                style={{
                    display: "flex",
                    gap: "var(--spacing-4)",
                    padding: "var(--spacing-8)",
                    backgroundColor: "var(--color-paper-canvas)",
                    borderRadius: "var(--radius-pills)",
                    width: "fit-content",
                }}
            >
                {items.map((item) => (
                    <PillNavigationItem
                        key={item}
                        active={activeItem === item}
                        onClick={() => setActiveItem(item)}
                    >
                        {item}
                    </PillNavigationItem>
                ))}
            </div>
        );
    },
};

/* ----------------------------------------------------------------------------
 * InContext — inside a mock TopBar's center region
 * ----------------------------------------------------------------------------
 * Shows the pill cluster positioned where it will live in the real TopBar:
 * centered horizontally, 72px chrome height, hairline border below.
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    render: () => {
        const items = ["Dashboard", "Activities", "Profile"];
        const [activeItem, setActiveItem] = useState("Dashboard");

        return (
            <div
                style={{
                    height: "72px",
                    padding: "0 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--color-paper-canvas)",
                    borderBottom: "1px solid var(--color-linen-border)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "var(--spacing-4)",
                    }}
                >
                    {items.map((item) => (
                        <PillNavigationItem
                            key={item}
                            active={activeItem === item}
                            onClick={() => setActiveItem(item)}
                        >
                            {item}
                        </PillNavigationItem>
                    ))}
                </div>
            </div>
        );
    },
    parameters: {
        layout: "fullscreen",
        backgrounds: { default: "Paper Canvas" },
    },
};

/* ----------------------------------------------------------------------------
 * KeyboardNavigation — verifies tab order and focus-visible rings
 * ----------------------------------------------------------------------------
 * Tab through the items via keyboard. Each pill in focus should show an
 * indigo focus ring offset from the pill. Pressing Enter or Space should
 * fire the onClick.
 * ---------------------------------------------------------------------------- */

export const KeyboardNavigation: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "var(--spacing-4)",
            }}
        >
            <PillNavigationItem>Dashboard</PillNavigationItem>
            <PillNavigationItem active>Activities</PillNavigationItem>
            <PillNavigationItem>Profile</PillNavigationItem>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Tab through the items via keyboard. Each pill in focus should show an indigo focus ring. Press Enter or Space to fire the click handler. The active pill (Activities) should also have aria-current='page' visible in the DOM inspector.",
            },
        },
    },
};