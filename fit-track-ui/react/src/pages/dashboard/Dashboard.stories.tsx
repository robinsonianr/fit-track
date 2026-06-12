import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { MockAuthProvider } from "../../components/layout/TopBar/storybook/MockAuthProvider";
import { activeUserData, lightUserData, newUserData } from "./mock-data";

const meta: Meta<typeof Dashboard> = {
    title: "Pages / Dashboard",
    component: Dashboard,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Full Dashboard composition. Four sections: PageHeader, Quick Stats, Recent Activity, Noticed. Each section applies companion voice rules — observations only, no directives. The Noticed section is omitted entirely when no insight exists.",
            },
        },
    },
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/dashboard"]}>
                <MockAuthProvider>
                    <div
                        style={{
                            backgroundColor: "var(--color-paper-canvas)",
                            minHeight: "100vh",
                            padding: "var(--spacing-48) var(--layout-page-padding-x)",
                            maxWidth: "var(--layout-max-width)",
                            margin: "0 auto",
                        }}
                    >
                        <Story />
                    </div>
                </MockAuthProvider>
            </MemoryRouter>
        ),
    ],
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

/* ----------------------------------------------------------------------------
 * ActiveUser — design target view
 * 5 recent activities, all stats > 0, insight present
 * ---------------------------------------------------------------------------- */

export const ActiveUser: Story = {
    args: {
        data: activeUserData,
    },
};

/* ----------------------------------------------------------------------------
 * LightUser — sparse data state
 * 2 activities, first-week stats, insight present
 * ---------------------------------------------------------------------------- */

export const LightUser: Story = {
    args: {
        data: lightUserData,
    },
};

/* ----------------------------------------------------------------------------
 * NewUser — honest empty state
 * Zero activities (dashed placeholder), zero stats, no Noticed section
 * ---------------------------------------------------------------------------- */

export const NewUser: Story = {
    args: {
        data: newUserData,
    },
};