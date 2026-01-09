export interface PredefinedExercise {
    title: string;
    description: string;
    muscleGroup: string;
    concentration: string;
}

export const PREDEFINED_EXERCISES: PredefinedExercise[] = [
    // Chest
    {
        title: "Bench Press",
        description: "Flat barbell bench press for chest development",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Incline Dumbbell Press",
        description: "Incline dumbbell press targeting upper chest",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Push-ups",
        description: "Bodyweight exercise for chest, shoulders, and triceps",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Cable Flyes",
        description: "Cable chest flyes for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Decline Bench Press",
        description: "Barbell or dumbbell press targeting lower chest",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Dumbbell Bench Press",
        description: "Flat dumbbell press for chest with greater range of motion",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Incline Barbell Press",
        description: "Incline barbell press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Hammerstrength Incline Chest Press",
        description: "Hammerstrength incline press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Chest Dips",
        description: "Leaning forward dips for lower chest emphasis",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Dumbbell Flyes",
        description: "Flat bench dumbbell flyes for chest stretch and isolation",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Machine Chest Press",
        description: "Seated machine press for controlled chest pressing",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Pec Deck",
        description: "Machine flye movement for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest"
    },
    {
        title: "Landmine Chest Press",
        description: "Single-arm landmine press for chest and shoulders",
        muscleGroup: "Chest",
        concentration: "Chest"
    },

    // Back
    {
        title: "Deadlift",
        description: "Compound exercise for overall back and posterior chain",
        muscleGroup: "Back",
        concentration: "Lower Back"
    },
    {
        title: "Pull-ups",
        description: "Bodyweight vertical pulling exercise",
        muscleGroup: "Back",
        concentration: "Lats"
    },
    {
        title: "Barbell Rows",
        description: "Bent-over barbell rows for back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Lat Pulldown",
        description: "Machine exercise for lat development",
        muscleGroup: "Back",
        concentration: "Lats"
    },
    {
        title: "Seated Cable Rows",
        description: "Cable rows for mid-back development",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Dumbbell Rows",
        description: "Single-arm dumbbell rows for lat and upper back",
        muscleGroup: "Back",
        concentration: "Lats"
    },
    {
        title: "T-Bar Rows",
        description: "T-bar row for mid-back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Chest Supported Rows",
        description: "Incline bench rows eliminating lower back strain",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Pendlay Rows",
        description: "Explosive barbell rows from the floor",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Chin-ups",
        description: "Underhand grip pull-ups for lats and biceps",
        muscleGroup: "Back",
        concentration: "Lats"
    },
    {
        title: "Straight Arm Pulldown",
        description: "Cable pulldown for lat isolation",
        muscleGroup: "Back",
        concentration: "Lats"
    },
    {
        title: "Machine Rows",
        description: "Plate-loaded or cable machine rows for back",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Meadows Rows",
        description: "Landmine single-arm rows for upper back",
        muscleGroup: "Back",
        concentration: "Upper Back"
    },
    {
        title: "Rack Pulls",
        description: "Partial deadlift for upper back and trap development",
        muscleGroup: "Back",
        concentration: "Traps"
    },
    {
        title: "Hyperextensions",
        description: "Back extensions for lower back and glutes",
        muscleGroup: "Back",
        concentration: "Lower Back"
    },

    // Legs
    {
        title: "Squat",
        description: "Barbell back squat for overall leg development",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Leg Press",
        description: "Machine leg press for quad and glute development",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Front Squat",
        description: "Barbell front squat for quad emphasis",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Hack Squat",
        description: "Machine hack squat for quad development",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Sissy Squat",
        description: "Bodyweight quad isolation exercise",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Bulgarian Split Squat",
        description: "Single-leg squat with rear foot elevated",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Romanian Deadlift",
        description: "Hip-hinge movement for hamstrings and glutes",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Leg Curls",
        description: "Machine exercise for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Leg Extension",
        description: "Machine exercise for quad isolation",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Stiff-Leg Deadlift",
        description: "Straight-leg deadlift for hamstring stretch and strength",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Good Mornings",
        description: "Barbell hip hinge for hamstrings and lower back",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Nordic Curls",
        description: "Bodyweight eccentric hamstring exercise",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Seated Leg Curls",
        description: "Seated machine leg curls for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings"
    },
    {
        title: "Hip Thrust",
        description: "Barbell hip thrust for glute activation and strength",
        muscleGroup: "Legs",
        concentration: "Glutes"
    },
    {
        title: "Glute Bridge",
        description: "Bodyweight or weighted glute bridge",
        muscleGroup: "Legs",
        concentration: "Glutes"
    },
    {
        title: "Cable Kickbacks",
        description: "Cable glute kickbacks for isolation",
        muscleGroup: "Legs",
        concentration: "Glutes"
    },
    {
        title: "Step-Ups",
        description: "Weighted step-ups for glutes and quads",
        muscleGroup: "Legs",
        concentration: "Glutes"
    },
    {
        title: "Calf Raises",
        description: "Standing or seated calf raises for calf development",
        muscleGroup: "Legs",
        concentration: "Calves"
    },
    {
        title: "Lunges",
        description: "Walking or stationary lunges for legs and glutes",
        muscleGroup: "Legs",
        concentration: "Quads"
    },
    {
        title: "Seated Calf Raises",
        description: "Seated machine calf raises targeting the soleus",
        muscleGroup: "Legs",
        concentration: "Calves"
    },
    {
        title: "Donkey Calf Raises",
        description: "Bent-over calf raises for deep stretch",
        muscleGroup: "Legs",
        concentration: "Calves"
    },
    {
        title: "Single-Leg Calf Raises",
        description: "Unilateral calf raises for balanced development",
        muscleGroup: "Legs",
        concentration: "Calves"
    },
    {
        title: "Leg Press Calf Raises",
        description: "Calf raises performed on the leg press machine",
        muscleGroup: "Legs",
        concentration: "Calves"
    },
    {
        title: "Smith Machine Calf Raises",
        description: "Standing calf raises using the Smith machine",
        muscleGroup: "Legs",
        concentration: "Calves"
    },


    // Shoulders
    {
        title: "Overhead Press",
        description: "Standing or seated barbell/dumbbell overhead press",
        muscleGroup: "Shoulders",
        concentration: "Front Delts"
    },
    {
        title: "Lateral Raises",
        description: "Dumbbell lateral raises for side delts",
        muscleGroup: "Shoulders",
        concentration: "Side Delts"
    },
    {
        title: "Front Raises",
        description: "Front dumbbell raises for front delts",
        muscleGroup: "Shoulders",
        concentration: "Front Delts"
    },
    {
        title: "Reverse Flyes",
        description: "Rear delt flyes for posterior delts",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts"
    },
    {
        title: "Arnold Press",
        description: "Rotating dumbbell press for overall shoulder development",
        muscleGroup: "Shoulders",
        concentration: "Front Delts"
    },
    {
        title: "Face Pulls",
        description: "Cable face pulls for rear delts and rotator cuff",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts"
    },
    {
        title: "Upright Rows",
        description: "Barbell or dumbbell upright rows for traps and side delts",
        muscleGroup: "Shoulders",
        concentration: "Traps"
    },
    {
        title: "Shrugs",
        description: "Barbell or dumbbell shrugs for trap development",
        muscleGroup: "Shoulders",
        concentration: "Traps"
    },
    {
        title: "Cable Lateral Raises",
        description: "Single-arm cable lateral raises for constant tension",
        muscleGroup: "Shoulders",
        concentration: "Side Delts"
    },
    {
        title: "Landmine Press",
        description: "Angled pressing movement for shoulders and upper chest",
        muscleGroup: "Shoulders",
        concentration: "Front Delts"
    },
    {
        title: "Machine Shoulder Press",
        description: "Seated machine press for controlled shoulder pressing",
        muscleGroup: "Shoulders",
        concentration: "Front Delts"
    },


    // Arms
    {
        title: "Barbell Curl",
        description: "Standing barbell curls for bicep development",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Dumbbell Curl",
        description: "Alternating or simultaneous dumbbell curls",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Hammer Curls",
        description: "Neutral grip dumbbell curls for biceps and forearms",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Tricep Dips",
        description: "Bodyweight or weighted dips for triceps",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Tricep Pushdown",
        description: "Cable pushdown for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Skull Crushers",
        description: "Lying tricep extensions with barbell or dumbbells",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Preacher Curls",
        description: "Preacher bench curls for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Single Arm Preacher Curl",
        description: "Preacher bench curl for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Concentration Curls",
        description: "Seated single-arm curls for bicep peak",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Cable Curls",
        description: "Standing cable curls for constant tension on biceps",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Incline Dumbbell Curls",
        description: "Incline bench curls for stretched bicep position",
        muscleGroup: "Arms",
        concentration: "Biceps"
    },
    {
        title: "Overhead Tricep Extension",
        description: "Dumbbell or cable overhead extension for long head triceps",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Close-Grip Bench Press",
        description: "Narrow grip bench press for tricep strength",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Tricep Kickbacks",
        description: "Dumbbell kickbacks for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps"
    },
    {
        title: "Reverse Curls",
        description: "Barbell or dumbbell curls with overhand grip for forearms",
        muscleGroup: "Arms",
        concentration: "Forearms"
    },
    {
        title: "Wrist Curls",
        description: "Barbell or dumbbell wrist curls for forearm flexors",
        muscleGroup: "Arms",
        concentration: "Forearms"
    },


    // Core
    {
        title: "Plank",
        description: "Isometric core stabilization exercise",
        muscleGroup: "Core",
        concentration: "Abs"
    },
    {
        title: "Crunches",
        description: "Basic abdominal crunches",
        muscleGroup: "Core",
        concentration: "Abs"
    },
    {
        title: "Russian Twists",
        description: "Rotational core exercise for obliques",
        muscleGroup: "Core",
        concentration: "Obliques"
    },
    {
        title: "Leg Raises",
        description: "Hanging or lying leg raises for lower abs",
        muscleGroup: "Core",
        concentration: "Abs"
    },
    {
        title: "Cable Woodchops",
        description: "Rotational cable exercise for core",
        muscleGroup: "Core",
        concentration: "Obliques"
    },
    {
        title: "Ab Wheel Rollout",
        description: "Ab wheel exercise for core strength",
        muscleGroup: "Core",
        concentration: "Abs"
    },

    // Adductors & Abductors
    {
        title: "Hip Adduction Machine",
        description: "Machine exercise targeting the inner thigh muscles",
        muscleGroup: "Legs",
        concentration: "Adductors"
    },
    {
        title: "Cable Hip Adduction",
        description: "Cable exercise for inner thigh adductor isolation",
        muscleGroup: "Legs",
        concentration: "Adductors"
    },
    {
        title: "Copenhagen Plank",
        description: "Bodyweight adductor exercise using a bench for support",
        muscleGroup: "Legs",
        concentration: "Adductors"
    },
    {
        title: "Hip Abduction Machine",
        description: "Machine exercise targeting the outer thigh and glute muscles",
        muscleGroup: "Legs",
        concentration: "Abductors"
    },
    {
        title: "Cable Hip Abduction",
        description: "Cable exercise for outer thigh and hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors"
    },
    {
        title: "Banded Clamshells",
        description: "Resistance band exercise for hip abductor activation",
        muscleGroup: "Legs",
        concentration: "Abductors"
    },
    {
        title: "Side-Lying Hip Abduction",
        description: "Bodyweight or weighted exercise for hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors"
    },
];