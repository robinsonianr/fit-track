import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PageHeader } from "../../components/ui/PageHeader/PageHeader";
import { SectionTitle } from "../../components/ui/SectionTitle/SectionTitle";
import { MetricCard } from "../../components/ui/MetricCard/MetricCard";
import { ActivityRow } from "../../components/ui/ActivityRow/ActivityRow";
import { InsightCard } from "../../components/ui/InsightCard/InsightCard";
import {
    type Activity,
    type DashboardData,
    type Insight,
    activeUserData,
    formatDate,
    formatDuration,
    formatVolume,
    getFirstName,
    getGreeting,
} from "./mock-data";

/* ============================================================================
 * Secondary text builders — MetricCard companion voice rules:
 *   - Sessions: always show "/ N target" (the target is what it is, no shame)
 *   - Volume: delta text when non-zero; "lbs" otherwise (zero value or zero delta)
 *   - Time: "no time logged yet" on zero value; delta text when non-zero; omit on equal weeks
 * ============================================================================ */

function sessionsSecondary(target: number): string {
    return `/ ${target} target`;
}

function volumeSecondary(volume: number, delta: number): string {
    if (volume === 0) return "lbs";
    if (delta > 0) return `+${formatVolume(delta)} lbs from last week`;
    if (delta < 0) return `-${formatVolume(Math.abs(delta))} lbs from last week`;
    return "lbs";
}

function timeSecondary(minutes: number, delta: number): string | undefined {
    if (minutes === 0) return "no time logged yet";
    if (delta > 0) return `+${formatDuration(delta)} from last week`;
    if (delta < 0) return `-${formatDuration(Math.abs(delta))} from last week`;
    return undefined;
}

/* ============================================================================
 * Section components — local to Dashboard, not reused elsewhere
 * ============================================================================ */

function QuickStatsSection({ weekStats }: { weekStats: DashboardData["weekStats"] }) {
    return (
        <section>
            <SectionTitle>This week</SectionTitle>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "var(--spacing-12)",
                }}
            >
                <MetricCard
                    label="Sessions"
                    value={weekStats.sessions}
                    secondary={sessionsSecondary(weekStats.sessionsTarget)}
                />
                <MetricCard
                    label="Volume"
                    value={`${formatVolume(weekStats.volume)} lbs`}
                    secondary={volumeSecondary(weekStats.volume, weekStats.volumeDelta)}
                />
                <MetricCard
                    label="Time trained"
                    value={formatDuration(weekStats.timeTrainedMinutes)}
                    secondary={timeSecondary(weekStats.timeTrainedMinutes, weekStats.timeDelta)}
                />
            </div>
        </section>
    );
}

function RecentActivitySection({ activities }: { activities: Activity[] }) {
    const navigate = useNavigate();
    const hasActivities = activities.length > 0;

    const viewAllAction = hasActivities ? (
        <Link
            to="/activities?sort=recent"
            style={{ color: "inherit", textDecoration: "none" }}
        >
            View all →
        </Link>
    ) : undefined;

    return (
        <section>
            <SectionTitle action={viewAllAction}>Recent activity</SectionTitle>

            {hasActivities ? (
                <div
                    style={{
                        border: "1px solid var(--color-ash-inset)",
                        borderRadius: "var(--radius-cards)",
                        overflow: "hidden",
                    }}
                >
                    {activities.slice(0, 5).map((activity) => (
                        <ActivityRow
                            key={activity.id}
                            type={activity.type}
                            timestamp={activity.timestamp}
                            duration={formatDuration(activity.durationMinutes)}
                            highlight={activity.highlight}
                            routineContext={activity.routineContext}
                            highlightIsPR={activity.highlightIsPR}
                            variant="compact"
                            onClick={() => navigate(`/activities/${activity.id}`)}
                        />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        border: "1px dashed var(--color-linen-border)",
                        borderRadius: "var(--radius-cards)",
                        padding: "var(--spacing-32) var(--spacing-24)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-aeonikpro)",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "var(--color-smoke-ink)",
                    }}
                >
                    Activities you log will appear here.
                </div>
            )}
        </section>
    );
}

function NoticedSection({ insight }: { insight: Insight }) {
    return (
        <section>
            <InsightCard eyebrow={insight.eyebrow} body={insight.body} />
        </section>
    );
}

/* ============================================================================
 * Dashboard
 * ============================================================================ */

interface DashboardProps {
    /** Mock data fixture. Defaults to activeUserData so the live route renders
     *  something meaningful before real API wiring lands in a future sprint. */
    data?: DashboardData;
}

export function Dashboard({ data = activeUserData }: DashboardProps) {
    const { member } = useAuth();
    const now = new Date();
    const greeting = getGreeting(now);
    const firstName = member ? getFirstName(member.name ?? "there") : "there";
    const date = formatDate(now);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-48)" }}>
            <PageHeader greeting={greeting} name={firstName} date={date} />
            <QuickStatsSection weekStats={data.weekStats} />
            <RecentActivitySection activities={data.recentActivities} />
            {data.insight && <NoticedSection insight={data.insight} />}
        </div>
    );
}

export default Dashboard;