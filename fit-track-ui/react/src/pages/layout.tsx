import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { MemberDTO } from "../api/generated/models";
import { TopBar } from "../components/layout/TopBar/TopBar";
import WorkoutModal from "../components/common/modal/workout-modal/WorkoutModal.tsx";

export type LayoutContext = {
    member: MemberDTO;
    openWorkoutModal: () => void;
};

export const authenticatedMember = () => useOutletContext<LayoutContext>().member;
export const useOpenWorkoutModal = () => useOutletContext<LayoutContext>().openWorkoutModal;

const Layout = () => {
    const { member } = useAuth();
    const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

    if (!member) {
        return <div>Loading...</div>;
    }

    const openWorkoutModal = () => setIsWorkoutModalOpen(true);
    const closeWorkoutModal = () => setIsWorkoutModalOpen(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "var(--color-paper-canvas)",
            }}
        >
            <TopBar onAddWorkout={openWorkoutModal} />

            <main
                style={{
                    maxWidth: "var(--layout-max-width)",
                    margin: "0 auto",
                    padding: "var(--spacing-48) var(--layout-page-padding-x)",
                }}
            >
                <Outlet context={{ member, openWorkoutModal } satisfies LayoutContext} />
            </main>

            <WorkoutModal
                isOpen={isWorkoutModalOpen}
                onClose={closeWorkoutModal}
                member={member}
            />
        </div>
    );
};

export default Layout;