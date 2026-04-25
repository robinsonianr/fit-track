import {Outlet, useLocation, useOutletContext} from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRef, useState} from "react";

import { Sidebar } from "../components/layout/sidebar/Sidebar";
import Header from "../components/layout/header/Header";

import { cn } from "../utils/cn";
import "./layout.css";
import {useAuth} from "../context/AuthContext.tsx";
import {MemberDTO} from "../api/generated/models";


export type LayoutContext = {member: MemberDTO}
export const authenticatedMember = () => useOutletContext<LayoutContext>().member;

const Layout = () => {
    const {member} = useAuth();
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const sidebarRef = useRef(null);

    if (!member) {
        return <div>Loading...</div>;
    }

    const getHeaderTitle = () :string  =>  {
        const currentPage = location.pathname.split("/")[1];

        switch (currentPage) {
        case "dashboard":
            return "Dashboard";
        case "profile":
            return "Profile";
        case "logs":
            return "Logs";
        default:
            return "Dashboard";
        }
    };

    // Auto-close sidebar on mobile when clicking outside
    const handleOverlayClick = () => {
        if (!isLargeScreen) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="layout-container">
            {/* Mobile overlay */}
            {sidebarOpen && !isLargeScreen && (
                <div className="mobile-overlay" onClick={handleOverlayClick} />
            )}
            
            {/* Sidebar - hidden on mobile, visible on large screens */}
            <div className={cn(
                "sidebar-container",
                isLargeScreen ? "sidebar-visible" : sidebarOpen ? "sidebar-visible" : "sidebar-hidden"
            )}>
                <Sidebar 
                    ref={sidebarRef} 
                    collapsed={false} 
                    member={member}
                    onClose={() => setSidebarOpen(false)}
                />
            </div>
            
            {/* Main content area */}
            <div className={cn(
                "main-content",
                isLargeScreen ? "main-content-desktop" : "main-content-mobile"
            )}>
                <Header 
                    collapsed={false}
                    setCollapsed={() => setSidebarOpen(!sidebarOpen)}
                    member={member}
                    title={getHeaderTitle()}
                />
                <div className="content-area">
                    <Outlet context={{ member } satisfies LayoutContext} />
                </div>
            </div>
        </div>
    );
};
 
export default Layout;