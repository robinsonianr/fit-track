import React, {useEffect, useState} from "react";
import {getAllWorkoutsByCustomerId} from "../../../services/client.ts";
import "./logs.scss";
import {Workout} from "../../../types/index.ts";
import WorkoutLogModal from "../../common/modal/workout-log-modal/WorkoutLogModal.tsx";

const Logs = () => {
    const [workoutData, setWorkoutData] = useState<Workout[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
    const [hoverDay, setHoverDay] = useState<number | null>(null);

    // Fetch customer data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem("customerId");
                const testRes = await getAllWorkoutsByCustomerId(id);
                setWorkoutData(testRes.data);
            } catch (error) {
                console.error("Could not retrieve customer: ", error);
            }
        };

        fetchData();
    }, []); // Run only once when the component mounts

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openWorkout = (workout: any) => {
        setSelectedWorkout(workout);
        openModal();
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const startDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = startDayOfMonth(currentMonth);
        const daysArray: any[] = [];
        const today = new Date();
        const workouts: any[] = [];

        // Get workouts for the current month
        if (workoutData.length > 0) {
            for (let i = 0; i < workoutData.length; i++) {
                const date = new Date(workoutData[i].workoutDate);
                if (date.getMonth() === currentMonth.getMonth() && date.getFullYear() == currentMonth.getFullYear()) {
                    workouts.push(workoutData[i]);
                }
            }
        }

        // Fill in previous month's blank days
        for (let i = 0; i < firstDay; i++) {
            daysArray.push(<div key={`empty-${i}`} className="flex bg-[#333] min-h-25 p-5 items-center justify-center rounded-md"></div>);
        }

        // Fill in the days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                today.getDate() === day &&
                today.getMonth() === currentMonth.getMonth() &&
                today.getFullYear() === currentMonth.getFullYear();

            let minutes: any = null;

            const workoutForDay = workouts.find((workout) => {
                const workoutDate = new Date(workout.workoutDate);
                if (workoutDate.getDate() === day) {
                    minutes = workout.durationMinutes;
                }
                return workoutDate.getDate() === day;
            });

            const dayStyle: React.CSSProperties = {
                color: isToday
                    ? "white"
                    : workoutForDay
                        ? "lightgreen"
                        : "#888",
                cursor: workoutForDay ? "pointer" : "default",
                backgroundColor: isToday
                    ? hoverDay === day
                        ? "inherit"
                        : "#3f76c0"
                    : hoverDay === day
                        ? "#333"
                        : "inherit",
                transition: hoverDay === day ? `background-color ${0.3}s` : "inherit"
            };

            daysArray.push(
                <div
                    key={day}
                    className={"flex border border-[#333] min-h-25 p-5 items-center justify-center rounded-md"}
                    onClick={() => workoutForDay && openWorkout(workoutForDay)}
                    onMouseEnter={() => workoutForDay && setHoverDay(day)}
                    onMouseLeave={() => workoutForDay && setHoverDay(null)}
                    style={dayStyle}
                >
                    {day}
                    {minutes ? <><br/>{minutes} min</> : ""}
                </div>
            );
        }

        return daysArray;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    return (
        <div className="flex p-6">
            <WorkoutLogModal isOpen={isModalOpen} onClose={closeModal} workout={selectedWorkout!}/>
            <div className="flex flex-col items-center justify-center w-full h-full ">
                <div className="flex items-center justify-between w-full p-2 mb-4">
                    <button className="bg-[#3f76c0] rounded-md cursor-pointer p-1" onClick={handlePreviousMonth}>{"<"}</button>
                    <h2 className="text-white text-xl font-semibold">
                        {currentMonth.toLocaleString("default", {month: "long"})}{" "}
                        {currentMonth.getFullYear()}
                    </h2>
                    <button className="bg-[#3f76c0] rounded-md cursor-pointer p-1" onClick={handleNextMonth}>{">"}</button>
                </div>

                <div className="flex flex-col w-full h-full">
                    {/* Days of the week */}
                    <div className="grid grid-cols-7 gap-1 text-center text-white w-full text-sm font-semibold mb-2">
                        {daysOfWeek.map((day) => (
                            <div key={day} >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1 grow-1 text-center text-white w-full h-full">{renderCalendarDays()}</div>
                </div>
            </div>
        </div>
    );
};

export default Logs;
