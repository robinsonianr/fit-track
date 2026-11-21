import ReactDOM from "react-dom";
import {ActivityDetailDTO} from "../../../../api/generated/models";

export const WorkoutLogModal = ({isOpen, onClose, activity}: { isOpen: boolean, onClose: any, activity: ActivityDetailDTO}) => {
    const date = activity?.workoutDate ? new Date(activity.workoutDate) : null;

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-black/50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-[#333] relative z-[10] w-125 h-95 content-center rounded-md flex-col p-4">
                <span className="text-white cursor-pointer text-2xl absolute top-4 right-4"
                    onClick={onClose}>&times;</span>
                <h2 className="text-2xl font-bold mb-2">Activity: {date?.toDateString()}</h2>
                <div className="text-white">
                    <p><b>Name:</b> {activity.title}</p>
                    <p><b>Workout Type:</b> {activity.workoutType}</p>
                    <p><b>Calories:</b> {activity.calories} kcal</p>
                    <p><b>Volume:</b> {activity.volume} lbs</p>
                    <p><b>Duration:</b> {Math.floor(activity.durationMinutes! / 60)}hr(s)
                        &nbsp;{activity.durationMinutes! % 60} minute(s)</p>
                </div>
                <label className="font-bold">Exercises</label>
                <div
                    className="max-h-28 overflow-y-auto grid grid-cols-3 gap-4 border-gray-600 border-2 rounded-md p-2">
                    {/*{workout.exercises?.map((exercise, index) => (*/}
                    {/*    <div*/}
                    {/*        className="group overflow-hidden h-10 w-full text-white bg-[#222] p-2 border-3 border-white rounded-md flex text-center items-center"*/}
                    {/*        key={index}>*/}
                    {/*        <span*/}
                    {/*            className="text-xs whitespace-nowrap group-hover:animate-marquee">{exercise.title} - {exercise.sets}x{exercise.reps} @ {exercise.weightPerRep} lbs</span>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
                {/*<button className="bg-red-700 rounded-md p-2 mt-2 cursor-pointer"*/}
                {/*    onClick={() => removeWorkout(workout.id)}>Delete*/}
                {/*</button>*/}
            </div>
        </div>,
        document.body
    );
};

export default WorkoutLogModal;