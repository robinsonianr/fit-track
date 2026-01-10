import { Workout } from "../types";

/**
 * Gets the start of the current week (Monday at 00:00:00)
 * Weeks run Monday-Sunday
 */
export const getWeekStart = (date: Date = new Date()): Date => {
    const current = new Date(date);
    const day = current.getDay();

    // Calculate days to subtract to get to Monday
    // If Sunday (0), go back 6 days; if Monday (1), go back 0 days
    const diff = day === 0 ? 6 : day - 1;

    current.setDate(current.getDate() - diff );
    current.setHours(0, 0, 0, 0); // Set to start of day

    return current;
};

/**
 * Gets the end of the current week (Sunday at 23:59:59)
 */
export const getWeekEnd = (date: Date = new Date()): Date => {
    const weekStart = getWeekStart(date);
    const weekEnd = new Date(weekStart);

    weekEnd.setDate(weekStart.getDate() + 6); // Add 6 days to get to Sunday
    weekEnd.setHours(23, 59, 59, 999); // Set to end of day

    return weekEnd;
};

/**
 * Checks if a date falls within the current week (Monday-Sunday)
 */
export const isDateInCurrentWeek = (date: Date | string): boolean => {
    const checkDate = typeof date === "string" ? new Date(date) : date;
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    return checkDate >= weekStart && checkDate <= weekEnd;
};

/**
 * Filters workout to only include current week
 */
export const filterWorkoutsThisWeek = (workouts: Workout[]): Workout[] => {
    if (!workouts || workouts.length === 0) return [];

    return workouts.filter(workout => 
        isDateInCurrentWeek(workout.workoutDate)
    );
};

/**
 * Calculates total calories burned from workouts
 * Handles null / undefined values safely 
 */
export const calculateTotalCalories = (workouts: Workout[]): number => {
    if (!workouts || workouts.length === 0) return 0;

    return workouts.reduce((total, workout) => {
        const calories = workout.calories ?? 0; 
        return total + calories;
    }, 0);
};

/**
 * Calculates total active minutes from workouts
 */
export const calculateTotalMinutes = (workouts: Workout[]): number => {
    if (!workouts || workouts.length === 0) return 0;

    return workouts.reduce((total, workout) => {
        const minutes = workout.durationMinutes ?? 0;
        return total + minutes;
    }, 0);
};

/**
 * Calculates total volume lifted from workouts
 * Only count workouts that have volume (typically strength training)
 * If volume is not provided, calculates it from exercises (sets * reps * weightPerRep)
 */
export const calculateTotalVolume = (workouts: Workout[]): number => {
    if (!workouts || workouts.length === 0) return 0;

    return workouts.reduce((total, workout) => {
        // If volume is already provided, use it
        if (workout.volume !== undefined && workout.volume !== null) {
            return total + workout.volume;
        }

        // Otherwise, calculate from exercises
        if (workout.exercises && workout.exercises.length > 0) {
            const workoutVolume = workout.exercises.reduce((exerciseTotal, exercise) => {
                const sets = exercise.sets ?? 0;
                const reps = exercise.reps ?? 0;
                const weightPerRep = exercise.weightPerRep ?? 0;
                return exerciseTotal + (sets * reps * weightPerRep);
            }, 0);
            return total + workoutVolume;
        }

        return total;
    }, 0);
};

/**
 * Formats large numbers with commas (e.g., 46220 -> "46,220") 
 */
export const formatNumber = (nums: number): string => {
    return nums.toLocaleString("en-US");
};

/**
 * Calculates percentage change from last week's volume
 * Returns formatted string like "+12%" or "-5%"
 */
export const calculateVolumeChange = (
    currentWeekWorkouts: Workout[],
    allWorkouts: Workout[]
): string => {
    // Get last week's date range
    const lastWeekStart = new Date(getWeekStart());
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const lastWeekEnd = new Date(getWeekEnd());
    lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

    // Filter workouts from last week
    const lastWeekWorkouts = allWorkouts.filter(workout => {
        const workoutDate = new Date(workout.workoutDate);
        return workoutDate >= lastWeekStart && workoutDate <= lastWeekEnd;
    });

    const currentVolume = calculateTotalVolume(currentWeekWorkouts);
    const lastWeekVolume = calculateTotalVolume(lastWeekWorkouts);

    // Handle division by zero
    if (lastWeekVolume === 0) {
        return currentVolume > 0 ? "+100%" : "0%";
    }

    const percentChange = ((currentVolume - lastWeekVolume) / lastWeekVolume) * 100;
    const sign = percentChange >= 0 ? "+" : "-";

    return `${sign}${Math.round(percentChange)}%`; 
};