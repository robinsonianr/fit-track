import React, {useEffect, useState} from "react";
import {ActivityDetailDTO, ActivitySummaryDTO} from "../../../api/generated/models";
import WorkoutLogModal from "../../common/modal/workout-log-modal/WorkoutLogModal.tsx";
import {authenticatedMember} from "../../../pages/layout.tsx";
import {getActivitiesApi} from "../../../api/generated/endpoints/activities-api/activities-api.ts";

const Logs = () => {
    const member = authenticatedMember();
    const {getActivitySummariesByMemberId, getActivityDetail} = getActivitiesApi();
    const [activitiesData, setActivitiesData] = useState<ActivitySummaryDTO[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedActivity, setSelectedActivity] = useState<ActivityDetailDTO>();
    const [hoverDay, setHoverDay] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                getActivitySummariesByMemberId(member.id).then(setActivitiesData);
            } catch (error) {
                console.error("Could not retrieve member: ", error);
            }
        };

        fetchData();
    }, []);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openWorkout = (activity: ActivitySummaryDTO) => {
        getActivityDetail(activity.id).then((detail) => {
            setSelectedActivity(detail)
            openModal();
        });
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
    const buildCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = startDayOfMonth(currentMonth);
        const daysArray: React.ReactNode[] = [];
        const today = new Date();
        const activities = []

        console.log(activitiesData);
        if (activitiesData.length > 0) {
            for (let i = 0; i < activitiesData.length; i++) {
                const date = new Date(activitiesData[i].activityTimestamp);
                if (date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()) {
                    activities.push(activitiesData[i]);
                }
            }
        }

        for (let i = 0; i < firstDay; i++) {
            daysArray.push(<div key={`empty-${i}`} className="flex bg-[#333] min-h-25 p-5 items-center justify-center rounded-md"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                today.getDate() === day &&
                today.getMonth() === currentMonth.getMonth() &&
                today.getFullYear() === currentMonth.getFullYear();

            let minutes: number | null = null;

            const activityForDay = activities.find((activity: ActivitySummaryDTO) => {
                const activityDate = new Date(activity.activityTimestamp);
                if (activityDate.getDate() === day) {
                    minutes = activity.durationMinutes ?? null;
                }
                return activityDate.getDate() === day;
            });

            const dayStyle: React.CSSProperties = {
                color: isToday
                    ? "white"
                    : activityForDay
                        ? "lightgreen"
                        : "#888",
                cursor: activityForDay ? "pointer" : "default",
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
                    onClick={() => activityForDay && openWorkout(activityForDay)}
                    onMouseEnter={() => activityForDay && setHoverDay(day)}
                    onMouseLeave={() => activityForDay && setHoverDay(null)}
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
            <WorkoutLogModal isOpen={isModalOpen} onClose={closeModal} activity={selectedActivity!}/>
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
                    <div className="grid grid-cols-7 gap-1 grow-1 text-center text-white w-full h-full">{buildCalendar()}</div>
                </div>
            </div>
        </div>
    );
};

export default Logs;
