export interface PredefinedExercise {
    title: string;
    description: string;
    muscleGroup: string;
    concentration: string;
    dumbbells: boolean;
}

export const PREDEFINED_EXERCISES: PredefinedExercise[] = [
    // Chest
    {
        title: "Bench Press",
        description: "Flat barbell bench press for chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Incline Dumbbell Press",
        description: "Incline dumbbell press targeting upper chest",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: true
    },
    {
        title: "Push-ups",
        description: "Bodyweight exercise for chest, shoulders, and triceps",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Cable Flyes",
        description: "Cable chest flyes for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Decline Bench Press",
        description: "Barbell or dumbbell press targeting lower chest",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Dumbbell Bench Press",
        description: "Flat dumbbell press for chest with greater range of motion",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: true
    },
    {
        title: "Incline Barbell Press",
        description: "Incline barbell press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Hammerstrength Incline Chest Press",
        description: "Hammerstrength incline press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Chest Dips",
        description: "Leaning forward dips for lower chest emphasis",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Dumbbell Flyes",
        description: "Flat bench dumbbell flyes for chest stretch and isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: true
    },
    {
        title: "Machine Chest Press",
        description: "Seated machine press for controlled chest pressing",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Pec Deck",
        description: "Machine flye movement for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },
    {
        title: "Landmine Chest Press",
        description: "Single-arm landmine press for chest and shoulders",
        muscleGroup: "Chest",
        concentration: "Chest",
        dumbbells: false
    },

    // Back
    {
        title: "Deadlift",
        description: "Compound exercise for overall back and posterior chain",
        muscleGroup: "Back",
        concentration: "Lower Back",
        dumbbells: false
    },
    {
        title: "Pull-ups",
        description: "Bodyweight vertical pulling exercise",
        muscleGroup: "Back",
        concentration: "Lats",
        dumbbells: false
    },
    {
        title: "Barbell Rows",
        description: "Bent-over barbell rows for back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Lat Pulldown",
        description: "Machine exercise for lat development",
        muscleGroup: "Back",
        concentration: "Lats",
        dumbbells: false
    },
    {
        title: "Seated Cable Rows",
        description: "Cable rows for mid-back development",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Dumbbell Rows",
        description: "Single-arm dumbbell rows for lat and upper back",
        muscleGroup: "Back",
        concentration: "Lats",
        dumbbells: true
    },
    {
        title: "T-Bar Rows",
        description: "T-bar row for mid-back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Chest Supported Rows",
        description: "Incline bench rows eliminating lower back strain",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Dumbbell Chest Supported Rows",
        description: "Incline dumbbell bench rows eliminating lower back strain",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: true
    },
    {
        title: "Pendlay Rows",
        description: "Explosive barbell rows from the floor",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Chin-ups",
        description: "Underhand grip pull-ups for lats and biceps",
        muscleGroup: "Back",
        concentration: "Lats",
        dumbbells: false
    },
    {
        title: "Straight Arm Pulldown",
        description: "Cable pulldown for lat isolation",
        muscleGroup: "Back",
        concentration: "Lats",
        dumbbells: false
    },
    {
        title: "Machine Rows",
        description: "Plate-loaded or cable machine rows for back",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Meadows Rows",
        description: "Landmine single-arm rows for upper back",
        muscleGroup: "Back",
        concentration: "Upper Back",
        dumbbells: false
    },
    {
        title: "Rack Pulls",
        description: "Partial deadlift for upper back and trap development",
        muscleGroup: "Back",
        concentration: "Traps",
        dumbbells: false
    },
    {
        title: "Hyperextensions",
        description: "Back extensions for lower back and glutes",
        muscleGroup: "Back",
        concentration: "Lower Back",
        dumbbells: false
    },
    {
        title: "Seated Back Extension",
        description: "Seated back extensions for lower back",
        muscleGroup: "Back",
        concentration: "Lower Back",
        dumbbells: false
    },

    // Legs
    {
        title: "Squat",
        description: "Barbell back squat for overall leg development",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Leg Press",
        description: "Machine leg press for quad and glute development",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Front Squat",
        description: "Barbell front squat for quad emphasis",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Hack Squat",
        description: "Machine hack squat for quad development",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Sissy Squat",
        description: "Bodyweight quad isolation exercise",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Bulgarian Split Squat",
        description: "Single-leg squat with rear foot elevated",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: true
    },
    {
        title: "Romanian Deadlift",
        description: "Hip-hinge movement for hamstrings and glutes",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Dumbbell Romanian Deadlift",
        description: "Hip-hinge movement for hamstrings and glutes while holding a pair of dumbbells next to your hips",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: true
    },
    {
        title: "Leg Curls",
        description: "Machine exercise for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Leg Extension",
        description: "Machine exercise for quad isolation",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: false
    },
    {
        title: "Stiff-Leg Deadlift",
        description: "Straight-leg deadlift for hamstring stretch and strength",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Good Mornings",
        description: "Barbell hip hinge for hamstrings and lower back",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Nordic Curls",
        description: "Bodyweight eccentric hamstring exercise",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Seated Leg Curls",
        description: "Seated machine leg curls for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        dumbbells: false
    },
    {
        title: "Hip Thrust",
        description: "Barbell hip thrust for glute activation and strength",
        muscleGroup: "Legs",
        concentration: "Glutes",
        dumbbells: false
    },
    {
        title: "Glute Bridge",
        description: "Bodyweight or weighted glute bridge",
        muscleGroup: "Legs",
        concentration: "Glutes",
        dumbbells: false
    },
    {
        title: "Cable Kickbacks",
        description: "Cable glute kickbacks for isolation",
        muscleGroup: "Legs",
        concentration: "Glutes",
        dumbbells: false
    },
    {
        title: "Step-Ups",
        description: "Weighted step-ups for glutes and quads",
        muscleGroup: "Legs",
        concentration: "Glutes",
        dumbbells: true
    },
    {
        title: "Calf Raises",
        description: "Standing or seated calf raises for calf development",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },
    {
        title: "Lunges",
        description: "Walking or stationary lunges for legs and glutes",
        muscleGroup: "Legs",
        concentration: "Quads",
        dumbbells: true
    },
    {
        title: "Seated Calf Raises",
        description: "Seated machine calf raises targeting the soleus",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },
    {
        title: "Standing Machine Calf Raises",
        description: "Standing machine calf raises targeting the soleus",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },
    {
        title: "Donkey Calf Raises",
        description: "Bent-over calf raises for deep stretch",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },
    {
        title: "Single-Leg Calf Raises",
        description: "Unilateral calf raises for balanced development",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: true
    },
    {
        title: "Leg Press Calf Raises",
        description: "Calf raises performed on the leg press machine",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },
    {
        title: "Smith Machine Calf Raises",
        description: "Standing calf raises using the Smith machine",
        muscleGroup: "Legs",
        concentration: "Calves",
        dumbbells: false
    },


    // Shoulders
    {
        title: "Overhead Press",
        description: "Standing or seated barbell overhead press",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: false
    },
    {
        title: "Dumbbell Overhead Press",
        description: "Standing or seated dumbbell overhead press",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: true
    },
    {
        title: "Lateral Raises",
        description: "Dumbbell lateral raises for side delts",
        muscleGroup: "Shoulders",
        concentration: "Side Delts",
        dumbbells: true
    },
    {
        title: "Front Raises",
        description: "Front dumbbell raises for front delts",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: true
    },
    {
        title: "Reverse Flyes",
        description: "Rear delt flyes for posterior delts",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts",
        dumbbells: true
    },
    {
        title: "Arnold Press",
        description: "Rotating dumbbell press for overall shoulder development",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: true
    },
    {
        title: "Face Pulls",
        description: "Cable face pulls for rear delts and rotator cuff",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts",
        dumbbells: false
    },
    {
        title: "Upright Rows",
        description: "Barbell or dumbbell upright rows for traps and side delts",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        dumbbells: false
    },
    {
        title: "Shrugs",
        description: "Barbell shrugs for trap development",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        dumbbells: false
    },
    {
        title: "Dumbbell Shrugs",
        description: "Dumbbell shrugs for trap development",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        dumbbells: true
    },
    {
        title: "Cable Lateral Raises",
        description: "Single-arm cable lateral raises for constant tension",
        muscleGroup: "Shoulders",
        concentration: "Side Delts",
        dumbbells: false
    },
    {
        title: "Landmine Press",
        description: "Angled pressing movement for shoulders and upper chest",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: false
    },
    {
        title: "Machine Shoulder Press",
        description: "Seated machine press for controlled shoulder pressing",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        dumbbells: false
    },


    // Arms
    {
        title: "Barbell Curl",
        description: "Standing barbell curls for bicep development",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: false
    },
    {
        title: "Dumbbell Curl",
        description: "Alternating or simultaneous dumbbell curls",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: true
    },
    {
        title: "Hammer Curls",
        description: "Neutral grip dumbbell curls for biceps and forearms",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: true
    },
    {
        title: "Tricep Dips",
        description: "Bodyweight or weighted dips for triceps",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: false
    },
    {
        title: "Tricep Pushdown",
        description: "Cable pushdown for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: false
    },
    {
        title: "Skull Crushers",
        description: "Lying tricep extensions with barbell or dumbbells",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: false
    },
    {
        title: "Preacher Curls",
        description: "Preacher bench curls for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: false
    },
    {
        title: "Single Arm Preacher Curl",
        description: "Preacher bench curl for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: true
    },
    {
        title: "Concentration Curls",
        description: "Seated single-arm curls for bicep peak",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: true
    },
    {
        title: "Cable Curls",
        description: "Standing cable curls for constant tension on biceps",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: false
    },
    {
        title: "Incline Dumbbell Curls",
        description: "Incline bench curls for stretched bicep position",
        muscleGroup: "Arms",
        concentration: "Biceps",
        dumbbells: true
    },
    {
        title: "Overhead Tricep Extension",
        description: "Dumbbell or cable overhead extension for long head triceps",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: false
    },
    {
        title: "Close-Grip Bench Press",
        description: "Narrow grip bench press for tricep strength",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: false
    },
    {
        title: "Tricep Kickbacks",
        description: "Dumbbell kickbacks for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps",
        dumbbells: true
    },
    {
        title: "Reverse Curls",
        description: "Barbell or dumbbell curls with overhand grip for forearms",
        muscleGroup: "Arms",
        concentration: "Forearms",
        dumbbells: false
    },
    {
        title: "Wrist Curls",
        description: "Barbell or dumbbell wrist curls for forearm flexors",
        muscleGroup: "Arms",
        concentration: "Forearms",
        dumbbells: false
    },


    // Core
    {
        title: "Plank",
        description: "Isometric core stabilization exercise",
        muscleGroup: "Core",
        concentration: "Abs",
        dumbbells: false
    },
    {
        title: "Crunches",
        description: "Basic abdominal crunches",
        muscleGroup: "Core",
        concentration: "Abs",
        dumbbells: false
    },
    {
        title: "Ab Crunch Machine",
        description: "Abdominal crunches while sitting upright",
        muscleGroup: "Core",
        concentration: "Abs",
        dumbbells: false
    },
    {
        title: "Russian Twists",
        description: "Rotational core exercise for obliques",
        muscleGroup: "Core",
        concentration: "Obliques",
        dumbbells: false
    },
    {
        title: "Leg Raises",
        description: "Hanging or lying leg raises for lower abs",
        muscleGroup: "Core",
        concentration: "Abs",
        dumbbells: false
    },
    {
        title: "Cable Woodchops",
        description: "Rotational cable exercise for core",
        muscleGroup: "Core",
        concentration: "Obliques",
        dumbbells: false
    },
    {
        title: "Ab Wheel Rollout",
        description: "Ab wheel exercise for core strength",
        muscleGroup: "Core",
        concentration: "Abs",
        dumbbells: false
    },

    // Adductors & Abductors
    {
        title: "Hip Adduction Machine",
        description: "Machine exercise targeting the inner thigh muscles",
        muscleGroup: "Legs",
        concentration: "Adductors",
        dumbbells: false
    },
    {
        title: "Cable Hip Adduction",
        description: "Cable exercise for inner thigh adductor isolation",
        muscleGroup: "Legs",
        concentration: "Adductors",
        dumbbells: false
    },
    {
        title: "Copenhagen Plank",
        description: "Bodyweight adductor exercise using a bench for support",
        muscleGroup: "Legs",
        concentration: "Adductors",
        dumbbells: false
    },
    {
        title: "Hip Abduction Machine",
        description: "Machine exercise targeting the outer thigh and glute muscles",
        muscleGroup: "Legs",
        concentration: "Abductors",
        dumbbells: false
    },
    {
        title: "Cable Hip Abduction",
        description: "Cable exercise for outer thigh and hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        dumbbells: false
    },
    {
        title: "Banded Clamshells",
        description: "Resistance band exercise for hip abductor activation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        dumbbells: false
    },
    {
        title: "Side-Lying Hip Abduction",
        description: "Bodyweight or weighted exercise for hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        dumbbells: false
    },
];