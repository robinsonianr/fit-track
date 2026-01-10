import React, {useMemo, useState} from "react";
import {addWorkout} from "../../../../services/client.ts";
import {Customer, Exercise} from "../../../../types";
import ReactDOM from "react-dom";
import {PREDEFINED_EXERCISES} from "../../../../constants/exercises.ts";


export const WorkoutModal = ({isOpen, onClose, customer}: {isOpen: boolean, onClose: any, customer: Customer | undefined}) => {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [exerciseTitle, setExerciseTitle] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
    const [selectedConcentration, setSelectedConcentration] = useState("");

    const muscleGroups = useMemo(() => {
        return [...new Set(PREDEFINED_EXERCISES.map(ex => ex.muscleGroup))];
    }, []);

    const concentrations = useMemo(() => {
        if (!selectedMuscleGroup) return [];
        return [...new Set(PREDEFINED_EXERCISES.filter(ex => ex.muscleGroup === selectedMuscleGroup)
            .map(ex => ex.concentration))];
    }, [selectedMuscleGroup]);

    const filteredExercises = useMemo(() => {
        return PREDEFINED_EXERCISES.filter(ex => {
            if (selectedMuscleGroup && ex.muscleGroup !== selectedMuscleGroup) return false;
            return !(selectedConcentration && ex.concentration !== selectedConcentration);
        });
    }, [selectedMuscleGroup, selectedConcentration]);

    const addExercise = (selectedTitle: string, sets: number, reps: number, weight: number) => {
        const predefined = PREDEFINED_EXERCISES.find(ex => ex.title === selectedTitle);
        if (!predefined) return;
        const newExercise: Exercise = {
            title: predefined.title,
            description: predefined.description,
            muscleGroup: predefined.muscleGroup,
            concentration: predefined.concentration,
            sets: sets,
            reps: reps,
            weightPerRep: weight
        };
        setSelectedExercises([...selectedExercises, newExercise]);
        setExerciseTitle("");
    };

    const handleClose = () => {
        setSelectedExercises([]);
        onClose();
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (customer?.id) {
            try {
                const inputs = new FormData(e.currentTarget);
                const formData = Object.fromEntries(inputs.entries());
                const workoutData = {
                    ...formData,
                    customer: {"id": customer.id},
                    exercises: selectedExercises,
                    workoutDate: new Date().toISOString()
                };
                await addWorkout(workoutData);
                onClose();

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } catch (error) {

                console.error("Could not add workout to customer", error);
            }
        }

    };


    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpen ? "open" : ""}`}>
            <div className="bg-black/50 absolute inset-0" onClick={handleClose}></div>
            <div className="bg-[#333] relative z-[10] w-175 h-170 content-center rounded-md flex-col p-4">
                <span className=" absolute cursor-pointer text-[#888] top-1 right-3.5" onClick={handleClose}>&times;</span>
                <h1 className="font-bold">Add Workout</h1>
                <form className="text-white flex flex-col gap-2 text-sm p-2 mt-2 " onSubmit={handleSubmit}>
                    <div>
                        <label className="font-bold">Workout Type</label>
                        <select className="rounded-md p-2 text-sm" name="workoutType" required>
                            <option value="">
                                Select Workout Type
                            </option>
                            <option value="Walking">Walking</option>
                            <option value="Running">Running</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Strength Training">Strength Training</option>
                            <option value="Cross Fit">Cross Fit</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div>
                            <label className="font-bold">Muscle Group</label>
                            <select
                                className="bg-[#222] text-white rounded-md p-2 text-sm w-full border border-gray-600"
                                value={selectedMuscleGroup}
                                onChange={(e) => {
                                    setSelectedMuscleGroup(e.target.value);
                                    setSelectedConcentration("");
                                    setExerciseTitle("");
                                }}
                            >
                                <option value="">All Muscle Groups</option>
                                {muscleGroups.map(mg => (
                                    <option key={mg} value={mg}>{mg}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">Concentration</label>
                            <select
                                className="bg-[#222] text-white rounded-md p-2 text-sm w-full border border-gray-600 disabled:opacity-50"
                                value={selectedConcentration}
                                onChange={(e) => {
                                    setSelectedConcentration(e.target.value);
                                    setExerciseTitle("");
                                }}
                                disabled={!selectedMuscleGroup}
                            >
                                <option value="">All Concentrations</option>
                                {concentrations.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">Exercise</label>
                            <select
                                className="bg-[#222] text-white rounded-md p-2 text-sm w-full border border-gray-600"
                                name="exerciseTitle"
                                onChange={(e) => setExerciseTitle(e.target.value)}
                            >
                                <option value="">Select Exercise</option>
                                {filteredExercises.map(ex => <option key={ex.title} value={ex.title}>{ex.title}</option>)}
                            </select>
                        </div>
                    </div>
                    {exerciseTitle !== "" && (
                        <>
                            <div className="flex flex-row gap-4 mt-2">
                                <div>
                                    <label className="font-bold">Sets</label>
                                    <input placeholder="Sets" type="number" onChange={(e) => setSets(parseInt(e.target.value))} className="text-sm rounded-md w-full p-2"/>
                                </div>
                                <div>
                                    <label className="font-bold">Reps</label>
                                    <input placeholder="Reps" type="number" onChange={(e) => setReps(parseInt(e.target.value))} className="text-sm rounded-md w-full p-2"/>
                                </div>
                                <div>
                                    <label className="font-bold">Weight Per Rep</label>
                                    <input placeholder="Weight" type="number" onChange={(e) => setWeight(parseFloat(e.target.value))} className="text-sm rounded-md w-full p-2"/>
                                </div>
                            </div>
                            <button className="bg-[#3f76c0] mt-4 rounded-md text-white cursor-pointer hover:bg-[#355a8f] duration-300 h-10 w-30" onClick={() => addExercise(exerciseTitle, sets, reps, weight)} type="button">Add Exercise</button>
                        </>
                    )}
                    <div className="h-28 overflow-y-auto grid grid-cols-3 gap-4 border-gray-600 border-2 rounded-md p-2">
                        {selectedExercises.map((exercise, index) => (
                            <div className="group overflow-hidden h-10 w-full text-white bg-[#222] p-2 border-3 border-white rounded-md flex text-center items-center" key={index}>
                                <span className="text-xs whitespace-nowrap group-hover:animate-marquee">{exercise.title} - {exercise.sets}x{exercise.reps} @ {exercise.weightPerRep} lbs</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="font-bold">Calories (kcal)</label>
                        <input className="rounded-md p-2" placeholder="Calories" type="number" name="calories" required/>
                    </div>
                    <div>
                        <label className="font-bold">Workout Duration (min)</label>
                        <input className="rounded-md p-2" placeholder="Duration" type="number" name="durationMinutes" required/>
                    </div>
                    <button className="bg-[#3f76c0] mt-2 rounded-md text-white hover:bg-[#355a8f] duration-300 cursor-pointer h-9  w-30" type="submit">Submit</button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default WorkoutModal;