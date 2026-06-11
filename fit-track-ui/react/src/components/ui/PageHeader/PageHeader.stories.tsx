import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader } from "./PageHeader";
import { ActionButton } from "../ActionButton/ActionButton";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const meta: Meta<typeof PageHeader> = {
    title: "Components / Dashboard / PageHeader",
    component: PageHeader,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Personal greeting at the top of the Dashboard. Greeting + name on the first line, date below. Large but soft — grounded, not announce-y. Parent is responsible for computing the greeting and date strings.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        greeting: {
            control: "text",
            description: "Greeting prefix (e.g. \"Good morning\")",
        },
        name: {
            control: "text",
            description: "User's first name",
        },
        date: {
            control: "text",
            description: "Pre-formatted date string",
        },
        action: {
            control: false,
            description: "Optional right-side action element",
        },
    },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

/* ----------------------------------------------------------------------------
 * Default
 * ---------------------------------------------------------------------------- */

export const Default: Story = {
    args: {
        greeting: "Good morning",
        name: "Long",
        date: "Tuesday, June 11",
    },
};

/* ----------------------------------------------------------------------------
 * AllGreetings — morning / afternoon / evening side by side
 * ---------------------------------------------------------------------------- */

export const AllGreetings: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <PageHeader greeting="Good morning" name="Long" date="Tuesday, June 11" />
            <PageHeader greeting="Good afternoon" name="Long" date="Tuesday, June 11" />
            <PageHeader greeting="Good evening" name="Long" date="Tuesday, June 11" />
        </div>
    ),
};

/* ----------------------------------------------------------------------------
 * WithAction — right-side ActionButton
 * ---------------------------------------------------------------------------- */

export const WithAction: Story = {
    args: {
        greeting: "Good morning",
        name: "Long",
        date: "Tuesday, June 11",
    },
    render: (args) => (
        <PageHeader
            {...args}
            action={
                <ActionButton variant="primary" onClick={() => console.log("Add workout")}>
                    Add workout
                </ActionButton>
            }
        />
    ),
};

/* ----------------------------------------------------------------------------
 * LongName — verify layout doesn't break
 * ---------------------------------------------------------------------------- */

export const LongName: Story = {
    args: {
        greeting: "Good morning",
        name: "Maximilian",
        date: "Tuesday, June 11",
    },
};

/* ----------------------------------------------------------------------------
 * InContext — PageHeader followed by SectionTitle + content placeholder
 * Verifies the 32px bottom-margin flows correctly into the next section.
 * ---------------------------------------------------------------------------- */

export const InContext: Story = {
    args: {
        greeting: "Good morning",
        name: "Long",
        date: "Tuesday, June 11",
    },
    render: (args) => (
        <div style={{ maxWidth: "720px" }}>
            <PageHeader {...args} />
            <SectionTitle>This week</SectionTitle>
            <div
                style={{
                    height: "80px",
                    backgroundColor: "var(--color-vellum-surface)",
                    borderRadius: "var(--radius-cards)",
                    border: "1px solid var(--color-linen-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-aeonikpro)",
                    fontSize: "13px",
                    color: "var(--color-pewter-mute)",
                }}
            >
                Content follows here
            </div>
        </div>
    ),
};