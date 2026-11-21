import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {WorkoutDTO} from "../api/generated/models";
import {
    calculateAge,
    getWeekOf,
    isDateInSelectedWeek,
    isDateInThisWeek,
    sortWorkouts,
    sortWorkoutsAsc,
} from "./utilities";

describe("calculateAge", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-05-05T12:00:00"));
    });
    afterEach(() => vi.useRealTimers());

    it("returns 0 when dateOfBirth is empty", () => {
        expect(calculateAge("")).toBe(0);
    });

    it("calculates age when birthday already passed this year", () => {
        expect(calculateAge("1990-01-15")).toBe(36);
    });

    it("subtracts a year when birthday hasn't happened yet this year", () => {
        expect(calculateAge("1990-12-25")).toBe(35);
    });

    it("does not decrement when birthday is today", () => {
        expect(calculateAge("1990-05-05")).toBe(36);
    });

    it("decrements when birthday is tomorrow", () => {
        expect(calculateAge("1990-05-06")).toBe(35);
    });

    it("handles a leap-day birthday in a non-leap year", () => {
        // 2026 is not a leap year; today (May 5) is past Feb 28, so birthday counts as passed
        expect(calculateAge("2000-02-29")).toBe(26);
    });
});

describe("isDateInThisWeek", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // 2026-05-05 is a Tuesday → week (Sun–Sat) is 2026-05-03 .. 2026-05-09
        vi.setSystemTime(new Date("2026-05-05T12:00:00"));
    });
    afterEach(() => vi.useRealTimers());

    it("returns true for today", () => {
        expect(isDateInThisWeek(new Date(2026, 4, 5))).toBe(true);
    });

    it("returns true for the first day of the week (Sunday)", () => {
        expect(isDateInThisWeek(new Date(2026, 4, 3))).toBe(true);
    });

    it("returns true for the last day of the week (Saturday)", () => {
        expect(isDateInThisWeek(new Date(2026, 4, 9))).toBe(true);
    });

    it("returns false for the previous Saturday", () => {
        expect(isDateInThisWeek(new Date(2026, 4, 2))).toBe(false);
    });

    it("returns false for the next Sunday", () => {
        expect(isDateInThisWeek(new Date(2026, 4, 10))).toBe(false);
    });
});

describe("getWeekOf", () => {
    it("pushes first and last day strings into the array in order", () => {
        const result: string[] = [];
        const start = new Date("2026-05-03T00:00:00");

        getWeekOf(start, result);

        expect(result).toHaveLength(2);
        expect(result[0]).toBe(start.toDateString());

        const expectedLast = new Date(start);
        expectedLast.setDate(expectedLast.getDate() + 6);
        expect(result[1]).toBe(expectedLast.toDateString());
    });

    it("returns the new array length from push()", () => {
        const result: string[] = ["existing"];
        const ret = getWeekOf(new Date("2026-05-03T00:00:00"), result);
        expect(ret).toBe(3);
    });
});

describe("isDateInSelectedWeek", () => {
    it("returns true when date equals the start of the selected week", () => {
        const selectedWeek = new Date("2026-05-03T00:00:00");
        expect(isDateInSelectedWeek(new Date("2026-05-03T00:00:00"), selectedWeek)).toBe(true);
    });

    it("returns true when date is the last day of the week (start + 6)", () => {
        const selectedWeek = new Date("2026-05-03T00:00:00");
        expect(isDateInSelectedWeek(new Date("2026-05-09T00:00:00"), selectedWeek)).toBe(true);
    });

    it("returns false for the day before the selected week", () => {
        const selectedWeek = new Date("2026-05-03T00:00:00");
        expect(isDateInSelectedWeek(new Date("2026-05-02T00:00:00"), selectedWeek)).toBe(false);
    });

    it("returns false for the day after the selected week", () => {
        const selectedWeek = new Date("2026-05-03T00:00:00");
        expect(isDateInSelectedWeek(new Date("2026-05-10T00:00:00"), selectedWeek)).toBe(false);
    });
});

const makeWorkout = (workoutId: number, workoutDate: string): WorkoutDTO => ({
    workoutId,
    activityType: "Workout",
    memberId: 1,
    title: "test",
    workoutType: "Cardio",
    exercises: [],
    volume: 0,
    calories: 0,
    durationMinutes: 0,
    workoutDate,
});

describe("sortWorkouts", () => {
    it("sorts workouts by workoutDate descending", () => {
        const workouts = [
            makeWorkout(1, "2026-01-01"),
            makeWorkout(2, "2026-05-01"),
            makeWorkout(3, "2026-03-01"),
        ];

        const sorted = sortWorkouts(workouts);

        expect(sorted.map(w => w.workoutId)).toEqual([2, 3, 1]);
    });
});

describe("sortWorkoutsAsc", () => {
    it("sorts workouts by workoutDate ascending", () => {
        const workouts = [
            makeWorkout(1, "2026-05-01"),
            makeWorkout(2, "2026-01-01"),
            makeWorkout(3, "2026-03-01"),
        ];

        const sorted = sortWorkoutsAsc(workouts);

        expect(sorted.map(w => w.workoutId)).toEqual([2, 3, 1]);
    });
});
