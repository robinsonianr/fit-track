export interface Customer {
    id?: number;
    name?: string;
    email?: string;
    gender?: string;
    age?: number;
    weight?: number;
    height?: number;
    weightGoal?: number;
    activity?: string;
    bodyFat?: number;
    memberSince?: Date;
    roles?: string[];
    username?: string;
    profileImageId?: string;
}


export interface Workout {
    id?: number;
    customerId?: string;
    workoutType?: string;
    calories?: number;
    durationMinutes?: number;
    workoutDate: Date;
    exercises?: Exercise[];
}

export interface Exercise {
    title: string;
    description: string;
    muscleGroup: string;
    concentration: string;
    sets: number;
    reps: number;
    weightPerRep: number;
}
