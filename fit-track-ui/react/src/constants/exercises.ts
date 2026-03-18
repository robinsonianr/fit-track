export interface PredefinedExercise {
    title: string;
    description: string;
    muscleGroup: string;
    concentration: string;
    equipment: string;
}

export const PREDEFINED_EXERCISES: PredefinedExercise[] = [
    // Chest
    {
        title: "Bench Press",
        description: "Flat barbell bench press for chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Barbell"
    },
    {
        title: "Incline Dumbbell Press",
        description: "Incline dumbbell press targeting upper chest",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Dumbbell"
    },
    {
        title: "Push-ups",
        description: "Bodyweight exercise for chest, shoulders, and triceps",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Bodyweight"
    },
    {
        title: "Cable Flyes",
        description: "Cable chest flyes for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Cable Machine"
    },
    {
        title: "Decline Bench Press",
        description: "Barbell or dumbbell press targeting lower chest",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Bench Press",
        description: "Flat dumbbell press for chest with greater range of motion",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Dumbbell"
    },
    {
        title: "Incline Barbell Press",
        description: "Incline barbell press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Barbell"
    },
    {
        title: "Hammerstrength Incline Chest Press",
        description: "Hammerstrength incline press for upper chest development",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Machine"
    },
    {
        title: "Chest Dips",
        description: "Leaning forward dips for lower chest emphasis",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Bodyweight"
    },
    {
        title: "Dumbbell Flyes",
        description: "Flat bench dumbbell flyes for chest stretch and isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Dumbbell"
    },
    {
        title: "Machine Chest Press",
        description: "Seated machine press for controlled chest pressing",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Machine"
    },
    {
        title: "Pec Deck",
        description: "Machine flye movement for chest isolation",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Machine"
    },
    {
        title: "Landmine Chest Press",
        description: "Single-arm landmine press for chest and shoulders",
        muscleGroup: "Chest",
        concentration: "Chest",
        equipment: "Landmine"
    },

    // Back
    {
        title: "Deadlift",
        description: "Compound exercise for overall back and posterior chain",
        muscleGroup: "Back",
        concentration: "Lower Back",
        equipment: "Barbell"
    },
    {
        title: "Pull-ups",
        description: "Bodyweight vertical pulling exercise",
        muscleGroup: "Back",
        concentration: "Lats",
        equipment: "Bodyweight"
    },
    {
        title: "Barbell Rows",
        description: "Bent-over barbell rows for back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Barbell"
    },
    {
        title: "Lat Pulldown",
        description: "Machine exercise for lat development",
        muscleGroup: "Back",
        concentration: "Lats",
        equipment: "Cable Machine"
    },
    {
        title: "Seated Cable Rows",
        description: "Cable rows for mid-back development",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Cable Machine"
    },
    {
        title: "Dumbbell Rows",
        description: "Single-arm dumbbell rows for lat and upper back",
        muscleGroup: "Back",
        concentration: "Lats",
        equipment: "Dumbbell"
    },
    {
        title: "T-Bar Rows",
        description: "T-bar row for mid-back thickness",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "T-Bar"
    },
    {
        title: "Chest Supported Rows",
        description: "Incline bench rows eliminating lower back strain",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Chest Supported Rows",
        description: "Incline dumbbell bench rows eliminating lower back strain",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Dumbbell"
    },
    {
        title: "Pendlay Rows",
        description: "Explosive barbell rows from the floor",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Barbell"
    },
    {
        title: "Chin-ups",
        description: "Underhand grip pull-ups for lats and biceps",
        muscleGroup: "Back",
        concentration: "Lats",
        equipment: "Bodyweight"
    },
    {
        title: "Straight Arm Pulldown",
        description: "Cable pulldown for lat isolation",
        muscleGroup: "Back",
        concentration: "Lats",
        equipment: "Cable Machine"
    },
    {
        title: "Machine Rows",
        description: "Plate-loaded or cable machine rows for back",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Machine"
    },
    {
        title: "Meadows Rows",
        description: "Landmine single-arm rows for upper back",
        muscleGroup: "Back",
        concentration: "Upper Back",
        equipment: "Landmine"
    },
    {
        title: "Rack Pulls",
        description: "Partial deadlift for upper back and trap development",
        muscleGroup: "Back",
        concentration: "Traps",
        equipment: "Barbell"
    },
    {
        title: "Hyperextensions",
        description: "Back extensions for lower back and glutes",
        muscleGroup: "Back",
        concentration: "Lower Back",
        equipment: "Bodyweight"
    },
    {
        title: "Seated Back Extension",
        description: "Seated back extensions for lower back",
        muscleGroup: "Back",
        concentration: "Lower Back",
        equipment: "Machine"
    },

    // Legs
    {
        title: "Squat",
        description: "Barbell back squat for overall leg development",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Barbell"
    },
    {
        title: "Leg Press",
        description: "Machine leg press for quad and glute development",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Machine"
    },
    {
        title: "Front Squat",
        description: "Barbell front squat for quad emphasis",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Barbell"
    },
    {
        title: "Hack Squat",
        description: "Machine hack squat for quad development",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Machine"
    },
    {
        title: "Sissy Squat",
        description: "Bodyweight quad isolation exercise",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Bodyweight"
    },
    {
        title: "Bulgarian Split Squat",
        description: "Single-leg squat with rear foot elevated",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Dumbbell"
    },
    {
        title: "Romanian Deadlift",
        description: "Hip-hinge movement for hamstrings and glutes",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Romanian Deadlift",
        description: "Hip-hinge movement for hamstrings and glutes while holding a pair of dumbbells next to your hips",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Dumbbell"
    },
    {
        title: "Leg Curls",
        description: "Machine exercise for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Machine"
    },
    {
        title: "Leg Extension",
        description: "Machine exercise for quad isolation",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Machine"
    },
    {
        title: "Stiff-Leg Deadlift",
        description: "Straight-leg deadlift for hamstring stretch and strength",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Barbell"
    },
    {
        title: "Good Mornings",
        description: "Barbell hip hinge for hamstrings and lower back",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Barbell"
    },
    {
        title: "Nordic Curls",
        description: "Bodyweight eccentric hamstring exercise",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Bodyweight"
    },
    {
        title: "Seated Leg Curls",
        description: "Seated machine leg curls for hamstring isolation",
        muscleGroup: "Legs",
        concentration: "Hamstrings",
        equipment: "Machine"
    },
    {
        title: "Hip Thrust",
        description: "Barbell hip thrust for glute activation and strength",
        muscleGroup: "Legs",
        concentration: "Glutes",
        equipment: "Barbell"
    },
    {
        title: "Glute Bridge",
        description: "Bodyweight or weighted glute bridge",
        muscleGroup: "Legs",
        concentration: "Glutes",
        equipment: "Bodyweight"
    },
    {
        title: "Cable Kickbacks",
        description: "Cable glute kickbacks for isolation",
        muscleGroup: "Legs",
        concentration: "Glutes",
        equipment: "Cable Machine"
    },
    {
        title: "Step-Ups",
        description: "Weighted step-ups for glutes and quads",
        muscleGroup: "Legs",
        concentration: "Glutes",
        equipment: "Dumbbell"
    },
    {
        title: "Calf Raises",
        description: "Standing or seated calf raises for calf development",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Bodyweight"
    },
    {
        title: "Lunges",
        description: "Walking or stationary lunges for legs and glutes",
        muscleGroup: "Legs",
        concentration: "Quads",
        equipment: "Dumbbell"
    },
    {
        title: "Seated Calf Raises",
        description: "Seated machine calf raises targeting the soleus",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Machine"
    },
    {
        title: "Standing Machine Calf Raises",
        description: "Standing machine calf raises targeting the soleus",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Machine"
    },
    {
        title: "Donkey Calf Raises",
        description: "Bent-over calf raises for deep stretch",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Machine"
    },
    {
        title: "Single-Leg Calf Raises",
        description: "Unilateral calf raises for balanced development",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Dumbbell"
    },
    {
        title: "Leg Press Calf Raises",
        description: "Calf raises performed on the leg press machine",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Machine"
    },
    {
        title: "Smith Machine Calf Raises",
        description: "Standing calf raises using the Smith machine",
        muscleGroup: "Legs",
        concentration: "Calves",
        equipment: "Smith Machine"
    },


    // Shoulders
    {
        title: "Overhead Press",
        description: "Standing or seated barbell overhead press",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Overhead Press",
        description: "Standing or seated dumbbell overhead press",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Dumbbell"
    },
    {
        title: "Lateral Raises",
        description: "Dumbbell lateral raises for side delts",
        muscleGroup: "Shoulders",
        concentration: "Side Delts",
        equipment: "Dumbbell"
    },
    {
        title: "Front Raises",
        description: "Front dumbbell raises for front delts",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Dumbbell"
    },
    {
        title: "Reverse Flyes",
        description: "Rear delt flyes for posterior delts",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts",
        equipment: "Dumbbell"
    },
    {
        title: "Arnold Press",
        description: "Rotating dumbbell press for overall shoulder development",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Dumbbell"
    },
    {
        title: "Face Pulls",
        description: "Cable face pulls for rear delts and rotator cuff",
        muscleGroup: "Shoulders",
        concentration: "Rear Delts",
        equipment: "Cable Machine"
    },
    {
        title: "Upright Rows",
        description: "Barbell or dumbbell upright rows for traps and side delts",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        equipment: "Barbell"
    },
    {
        title: "Shrugs",
        description: "Barbell shrugs for trap development",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Shrugs",
        description: "Dumbbell shrugs for trap development",
        muscleGroup: "Shoulders",
        concentration: "Traps",
        equipment: "Dumbbell"
    },
    {
        title: "Cable Lateral Raises",
        description: "Single-arm cable lateral raises for constant tension",
        muscleGroup: "Shoulders",
        concentration: "Side Delts",
        equipment: "Cable Machine"
    },
    {
        title: "Landmine Press",
        description: "Angled pressing movement for shoulders and upper chest",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Landmine"
    },
    {
        title: "Machine Shoulder Press",
        description: "Seated machine press for controlled shoulder pressing",
        muscleGroup: "Shoulders",
        concentration: "Front Delts",
        equipment: "Machine"
    },


    // Arms
    {
        title: "Barbell Curl",
        description: "Standing barbell curls for bicep development",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Barbell"
    },
    {
        title: "Dumbbell Curl",
        description: "Alternating or simultaneous dumbbell curls",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Dumbbell"
    },
    {
        title: "Hammer Curls",
        description: "Neutral grip dumbbell curls for biceps and forearms",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Dumbbell"
    },
    {
        title: "Tricep Dips",
        description: "Bodyweight or weighted dips for triceps",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Bodyweight"
    },
    {
        title: "Tricep Pushdown",
        description: "Cable pushdown for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Cable Machine"
    },
    {
        title: "Skull Crushers",
        description: "Lying tricep extensions with barbell",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "EZ Bar"
    },
    {
        title: "Dumbbell Skull Crushers",
        description: "Lying tricep extensions with dumbbells",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Dumbbell"
    },
    {
        title: "Preacher Curls",
        description: "Preacher bench curls for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "EZ Bar"
    },
    {
        title: "Single Arm Preacher Curl",
        description: "Preacher bench curl for bicep isolation",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Dumbbell"
    },
    {
        title: "Concentration Curls",
        description: "Seated single-arm curls for bicep peak",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Dumbbell"
    },
    {
        title: "Cable Curls",
        description: "Standing cable curls for constant tension on biceps",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Cable Machine"
    },
    {
        title: "Incline Dumbbell Curls",
        description: "Incline bench curls for stretched bicep position",
        muscleGroup: "Arms",
        concentration: "Biceps",
        equipment: "Dumbbell"
    },
    {
        title: "Overhead Tricep Extension",
        description: "Cable overhead extension for long head triceps",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Cable Machine"
    },
    {
        title: "Dumbbell Overhead Tricep Extension",
        description: "Dumbbell overhead extension for long head triceps",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Dumbbell"
    },
    {
        title: "Close-Grip Bench Press",
        description: "Narrow grip bench press for tricep strength",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Barbell"
    },
    {
        title: "Tricep Kickbacks",
        description: "Dumbbell kickbacks for tricep isolation",
        muscleGroup: "Arms",
        concentration: "Triceps",
        equipment: "Dumbbell"
    },
    {
        title: "Reverse Curls",
        description: "Barbell or dumbbell curls with overhand grip for forearms",
        muscleGroup: "Arms",
        concentration: "Forearms",
        equipment: "Barbell"
    },
    {
        title: "Wrist Curls",
        description: "Barbell or dumbbell wrist curls for forearm flexors",
        muscleGroup: "Arms",
        concentration: "Forearms",
        equipment: "Barbell"
    },


    // Core
    {
        title: "Plank",
        description: "Isometric core stabilization exercise",
        muscleGroup: "Core",
        concentration: "Abs",
        equipment: "Bodyweight"
    },
    {
        title: "Crunches",
        description: "Basic abdominal crunches",
        muscleGroup: "Core",
        concentration: "Abs",
        equipment: "Bodyweight"
    },
    {
        title: "Ab Crunch Machine",
        description: "Abdominal crunches while sitting upright",
        muscleGroup: "Core",
        concentration: "Abs",
        equipment: "Machine"
    },
    {
        title: "Russian Twists",
        description: "Rotational core exercise for obliques",
        muscleGroup: "Core",
        concentration: "Obliques",
        equipment: "Bodyweight"
    },
    {
        title: "Leg Raises",
        description: "Hanging or lying leg raises for lower abs",
        muscleGroup: "Core",
        concentration: "Abs",
        equipment: "Bodyweight"
    },
    {
        title: "Cable Woodchops",
        description: "Rotational cable exercise for core",
        muscleGroup: "Core",
        concentration: "Obliques",
        equipment: "Cable Machine"
    },
    {
        title: "Ab Wheel Rollout",
        description: "Ab wheel exercise for core strength",
        muscleGroup: "Core",
        concentration: "Abs",
        equipment: "Ab Wheel"
    },

    // Adductors & Abductors
    {
        title: "Hip Adduction Machine",
        description: "Machine exercise targeting the inner thigh muscles",
        muscleGroup: "Legs",
        concentration: "Adductors",
        equipment: "Machine"
    },
    {
        title: "Cable Hip Adduction",
        description: "Cable exercise for inner thigh adductor isolation",
        muscleGroup: "Legs",
        concentration: "Adductors",
        equipment: "Cable Machine"
    },
    {
        title: "Copenhagen Plank",
        description: "Bodyweight adductor exercise using a bench for support",
        muscleGroup: "Legs",
        concentration: "Adductors",
        equipment: "Bodyweight"
    },
    {
        title: "Hip Abduction Machine",
        description: "Machine exercise targeting the outer thigh and glute muscles",
        muscleGroup: "Legs",
        concentration: "Abductors",
        equipment: "Machine"
    },
    {
        title: "Cable Hip Abduction",
        description: "Cable exercise for outer thigh and hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        equipment: "Cable Machine"
    },
    {
        title: "Banded Clamshells",
        description: "Resistance band exercise for hip abductor activation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        equipment: "Resistance Band"
    },
    {
        title: "Side-Lying Hip Abduction",
        description: "Bodyweight or weighted exercise for hip abductor isolation",
        muscleGroup: "Legs",
        concentration: "Abductors",
        equipment: "Bodyweight"
    },
];
