import React, {useEffect, useRef, useState} from "react";
import {getMemberApi} from "../../api/generated/endpoints/member-api/member-api.ts";
import {Fitness, Gender, MemberUpdateRequest} from "../../api/generated/models";
// import {getActivitiesApi} from "../../api/generated/endpoints/activities-api/activities-api.ts";
import {buildProfileImage} from "../../services/client.ts";
import {toast} from "sonner";
import {authenticatedMember} from "../layout.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {calculateAge} from "../../utils/utilities.ts";


export const Profile = () => {
    const member = authenticatedMember();
    const {refreshMember} = useAuth();
    // const [workoutData, setWorkoutData] = useState<WorkoutDTO[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dobInputRef = useRef<HTMLInputElement>(null);
    const {updateMember, uploadMemberProfileImage} = getMemberApi();
    // const {getMemberActivitiesByActivityType} = getActivitiesApi();
    const [isEditable, setIsEditable] = useState(false);
    const [pendingDob, setPendingDob] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (member) {
                    // getMemberActivitiesByActivityType(member.id, {"Workout"}).then(setWorkoutData);
                }
            } catch (error) {
                console.error("Could not retrieve member: ", error);
            }
        };
        fetchData();
    }, [member]);

    if (!member) {
        return <div>Loading...</div>;
    }


    const profile = {
        name: member.name,
        email: member.email,
        memberSince: member.memberSince
    };

    const healthInfo = {
        age: calculateAge(member.dateOfBirth),
        gender: member.gender,
        weight: member.weight,
        height: member.height,
        weightGoal: member.weightGoal,
        fitness: member.fitness,
        bodyFat: member.bodyFat
    };


    const profileMember = profile.memberSince?.toString();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const month = new Date(profileMember!).getMonth();
    const memberDate = monthNames[month] + " " + new Date(profileMember!).getFullYear();
    const defaultImg = "/assets/user.png";
    const pfp = member.profileImageId ? buildProfileImage(member.id) : defaultImg;


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            await uploadPFP(file);
        }
    };

    const uploadPFP = async (file: File) => {
        try {
            if (member.id) {
                const msg = await uploadMemberProfileImage(member.id, {file});
                toast.success(msg.message);
            }
        } catch (error) {
            console.error("File upload failed", error);
            toast.error("Failed to upload profile image.");
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const saveDob = async (dateOfBirth: string) => {
        if (!member.id) return;
        try {
            await updateMember(member.id, {dateOfBirth});
            toast.success("Date of Birth updated successfully!");
            setPendingDob(null);
            await refreshMember();
        } catch (error) {
            console.error("Failed to update member.", error);
            toast.error("Failed to update date of birth.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEditable) {
            setIsEditable(true);
            return;
        }
        const formData = new FormData(e.currentTarget);
        formData.append("name", formData.get("firstName") + " " + formData.get("lastName"));

        const update: MemberUpdateRequest = {
            name: String(formData.get("name")),
            email: formData.get("email") as string,
            gender: formData.get("gender") as Gender,
            weight: Number(formData.get("weight")) || undefined,
            height: Number(formData.get("height")) || undefined,
            weightGoal: Number(formData.get("weightGoal")) || undefined,
            fitness: formData.get("fitness") as Fitness || undefined,
            bodyFat: Number(formData.get("bodyFat")) || undefined
        };

        if (member.id) {
            try {
                await updateMember(member.id, update);
                toast.success("Profile updated successfully!");
                setIsEditable(false);
            } catch (error) {
                console.error("Failed to update member.", error);
                toast.error("Failed to update profile.");
            }
        }
    };


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-[90%]">
                <div className=" bg-white dark:bg-[#333] rounded-lg border dark:border-gray-600 p-4 lg:col-span-1">
                    <div className="pb-6 mb-6">
                        <div className="flex items-center justify-between bold text-xl">
                            Profile Summary
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 relative">
                            <img className="rounded-[50%] object-cover w-20 h-20 z-1"
                                src={pfp} alt="pfp"/>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{display: "none"}}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button
                                className="flex items-center justify-center absolute bottom-4 right-3 w-6 h-6 dark:bg-[#3f76c0] hover:bg-[#355a8f] border-none rounded-full cursor-pointer p-0"
                                onClick={handleButtonClick}>✎
                            </button>
                        </div>
                        <h2 className="text-2xl text-black dark:text-white mb-2 font-bold">{member.name}</h2>
                        <p className="text-xl text-black dark:text-gray-400 mb-2">Fitness
                            Experience: {healthInfo.fitness}</p>
                        <div className="grid grid-cols-2 gap-4 w-full text-center p-6">
                            <div className="bg-[#222] rounded-md p-3 text-white">
                                <p className="text-lg font-bold text-black dark:text-white">Member Since</p>
                                <p className="text-black dark:text-gray-400">{memberDate}</p>
                            </div>
                            <div className="bg-[#222] rounded-md p-3 text-white">
                                <p className="text-2xl font-bold text-black dark:text-white">{10}</p>
                                <p className="text-black dark:text-gray-400">Workouts</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-white dark:bg-[#333] rounded-lg border dark:border-gray-600 p-4 lg:col-span-2">
                    <div className="pb-6 mb-6">
                        <div className="flex items-center justify-between bold text-xl">
                            Health Information
                        </div>
                    </div>
                    <div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName">First Name</label>
                                    <input name="firstName" type="text" defaultValue={member.name?.split(" ")[0]}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input name="lastName" type="text" defaultValue={member.name?.split(" ")[1]}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="age">Age</label>
                                    <input name="age" type="text" value={healthInfo.age} disabled={true} readOnly
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                    <input ref={dobInputRef} type="date" name="dateOfBirth"
                                        defaultValue={member.dateOfBirth || ""}
                                        max={new Date().toISOString().slice(0, 10)} min="1900-01-01"
                                        onChange={(e) => setPendingDob(e.currentTarget.value)}
                                        className="absolute opacity-0 pointer-events-none w-0 h-0"/>
                                    <button type="button"
                                        onClick={() => dobInputRef.current?.showPicker()}
                                        className="bg-[#3f76c0] hover:bg-[#355a8f] duration-300 mt-1 p-2 rounded-md cursor-pointer">
                                        Edit Date of Birth
                                    </button>
                                    {pendingDob && pendingDob !== member.dateOfBirth && (
                                        <div className="mt-2 flex gap-2 items-center">
                                            <span className="text-sm">New: {pendingDob}</span>
                                            <button type="button" onClick={() => saveDob(pendingDob)}
                                                className="bg-[#3f76c0] hover:bg-[#355a8f] duration-300 p-1 px-2 rounded-md cursor-pointer text-sm">
                                                Save
                                            </button>
                                            <button type="button" onClick={() => setPendingDob(null)}
                                                className="bg-gray-500 hover:bg-gray-600 duration-300 p-1 px-2 rounded-md cursor-pointer text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="weight">Weight (lbs)</label>
                                    <input name="weight" type="text" defaultValue={healthInfo.weight}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="height">Height (inches)</label>
                                    <input name="height" type="number" defaultValue={healthInfo.height}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="bodyFat">Body Fat%</label>
                                    <input name="bodyFat" type="number" defaultValue={healthInfo.bodyFat}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="gender">Gender</label>
                                    {member && (
                                        <select name="gender" defaultValue={healthInfo.gender} disabled={!isEditable}
                                            className="border-2 border-gray-600 rounded-md p-2 w-full">
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Forbidden">Forbidden</option>
                                        </select>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="fitness">Fitness Experience</label>
                                    {member && (
                                        <select name="fitness" defaultValue={healthInfo.fitness}
                                            disabled={!isEditable}
                                            className="border-2 border-gray-600 rounded-md p-2 w-full">
                                            <option value="">
                                                Select Fitness Experience
                                            </option>
                                            <option value={Fitness.Advanced}>Advanced</option>
                                            <option value={Fitness.Intermediate}>Intermediate</option>
                                            <option value={Fitness.Beginner}>Beginner</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4 w-full">
                                <div className="space-y-2">
                                    <label htmlFor="email">Email</label>
                                    <input name="email" type="text" defaultValue={member.email}
                                        disabled={!isEditable}
                                        className="border-2 border-gray-600 rounded-md p-2 w-full"/>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                <button
                                    className="w-full h-12 bg-[#3f76c0] hover:bg-[#355a8f] duration-300 mt-2 rounded-md cursor-pointer">
                                    {isEditable ? "Save Changes" : "Edit Health Information"}
                                </button>
                                {isEditable && (
                                    <button className="w-full h-12 bg-[#3f76c0] hover:bg-[#355a8f] duration-300 mt-2 rounded-md cursor-pointer"
                                        onClick={() => setIsEditable(false)}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;