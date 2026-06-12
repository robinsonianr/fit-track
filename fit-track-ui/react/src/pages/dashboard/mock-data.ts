/* ============================================================================
 * Dashboard mock data
 * ----------------------------------------------------------------------------
 * All types, fixtures, and formatting helpers for the Dashboard composition.
 * Dashboard.tsx imports from here; Storybook stories swap the fixture prop.
 * No backend wiring — this is the sole source of data for FTRACK-21.
 * ============================================================================ */

export type DashboardData = {
    weekStats: {
        sessions: number;
        sessionsTarget: number;
        volume: number;           // lbs
        timeTrainedMinutes: number;
        volumeDelta: number;      // lbs vs previous week (positive or negative)
        timeDelta: number;        // minutes vs previous week (positive or negative)
    };
    recentActivities: Activity[];
    insight: Insight | null;      // null = Noticed section omitted entirely
};

export type Activity = {
    id: string;
    type: string;
    durationMinutes: number;
    highlight: string;
    routineContext?: string;       // e.g. "Push Day 1" — omit for Run, Yoga, etc.
    highlightIsPR: boolean;
    timestamp: string;            // pre-formatted: "2h ago", "Yesterday", "Mon", "Jun 4"
};

export type Insight = {
    eyebrow: string;
    body: string;
};

/* ============================================================================
 * Fixtures
 * ============================================================================ */

export const activeUserData: DashboardData = {
    weekStats: {
        sessions: 3,
        sessionsTarget: 4,
        volume: 24300,
        timeTrainedMinutes: 165,
        volumeDelta: 1800,
        timeDelta: 30,
    },
    recentActivities: [
        { id: "a1", type: "Strength", durationMinutes: 52, highlight: "Bench 185×5",    routineContext: "Push Day 1", highlightIsPR: true,  timestamp: "2h ago"    },
        { id: "a2", type: "Strength", durationMinutes: 48, highlight: "Squat 225×5",    routineContext: "Legs Day 1", highlightIsPR: false, timestamp: "Yesterday" },
        { id: "a3", type: "Strength", durationMinutes: 65, highlight: "Deadlift 315×3", routineContext: "Pull Day 1", highlightIsPR: true,  timestamp: "Mon"       },
        { id: "a4", type: "Run",      durationMinutes: 32, highlight: "3.1 mi",                                       highlightIsPR: false, timestamp: "Sun"       },
        { id: "a5", type: "Strength", durationMinutes: 55, highlight: "Pull 12 sets",   routineContext: "Pull Day 2", highlightIsPR: false, timestamp: "Sat"       },
    ],
    insight: {
        eyebrow: "Noticed",
        body: "You trained 3 times this week, up from 2 last week.",
    },
};

export const lightUserData: DashboardData = {
    weekStats: {
        sessions: 1,
        sessionsTarget: 4,
        volume: 6200,
        timeTrainedMinutes: 38,
        volumeDelta: 6200,
        timeDelta: 38,
    },
    recentActivities: [
        { id: "b1", type: "Strength", durationMinutes: 38, highlight: "Squat 185×5",            routineContext: "Legs Day 1", highlightIsPR: false, timestamp: "Mon"   },
        { id: "b2", type: "Strength", durationMinutes: 45, highlight: "First Strength session", routineContext: "Push Day 1", highlightIsPR: false, timestamp: "Jun 1" },
    ],
    insight: {
        eyebrow: "Noticed",
        body: "Your first full week of training.",
    },
};

export const newUserData: DashboardData = {
    weekStats: {
        sessions: 0,
        sessionsTarget: 4,
        volume: 0,
        timeTrainedMinutes: 0,
        volumeDelta: 0,
        timeDelta: 0,
    },
    recentActivities: [],
    insight: null,
};

/* ============================================================================
 * Helpers
 * ============================================================================ */

export function getGreeting(now: Date): string {
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export function getFirstName(fullName: string): string {
    return fullName.trim().split(/\s+/)[0];
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

export function formatVolume(lbs: number): string {
    return lbs.toLocaleString("en-US");
}

export function formatDuration(minutes: number): string {
    if (minutes === 0) return "0m";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}
