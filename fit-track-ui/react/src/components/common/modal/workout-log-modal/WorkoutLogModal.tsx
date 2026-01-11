import {Workout} from "../../../../types";
import ReactDOM from "react-dom";

export const WorkoutLogModal = ({isOpen, onClose, workout}: { isOpen: boolean, onClose: any, workout: Workout }) => {
    let date;
    if (workout) {
        date = new Date(workout.workoutDate);
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-black/50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-[#333] relative z-[10] w-125 h-75 content-center rounded-md flex-col p-4">
                <span className="text-white cursor-pointer text-2xl absolute top-4 right-4" onClick={onClose}>&times;</span>
                <h2 className="text-2xl font-bold mb-2">Workout: {date?.toDateString()}</h2>
                <div className="text-white">
                    <p><b>Workout Type:</b> {workout.workoutType}</p>
                    <p><b>Calories:</b> {workout.calories} kcal</p>
                    <p><b>Volume:</b> {workout.volume} lbs</p>
                    <p><b>Duration:</b> {Math.floor(workout.durationMinutes! / 60)}hr(s)
                        &nbsp;{workout.durationMinutes! % 60} minute(s)</p>
                </div>
                <label className="font-bold">Exercises</label>
                <div className="max-h-28 overflow-y-auto grid grid-cols-3 gap-4 border-gray-600 border-2 rounded-md p-2">
                    {workout.exercises?.map((exercise, index) => (
                        <div className="group overflow-hidden h-10 w-full text-white bg-[#222] p-2 border-3 border-white rounded-md flex text-center items-center" key={index}>
                            <span className="text-xs whitespace-nowrap group-hover:animate-marquee">{exercise.title} - {exercise.sets}x{exercise.reps} @ {exercise.weightPerRep} lbs</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default WorkoutLogModal;