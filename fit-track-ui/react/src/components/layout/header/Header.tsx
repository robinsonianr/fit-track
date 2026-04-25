import React from "react";
import { useNavigate } from "react-router-dom";
import {buildProfileImage} from "../../../services/client.ts";
import { ThemeToggle } from "../../ui/theme-toggle";
import "./header.css";
import {MemberDTO} from "../../../api/generated/models";

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    member: MemberDTO;
    title: string;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, member, title}) => {
    const navigate = useNavigate();
    const defaultImg = "/assets/user.png";
    const pfp = member != null ? buildProfileImage(member.id) : defaultImg;

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <header className="header">
            {/* Left side - Menu button and title */}
            <div className="header-left">
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="menu-button"
                    aria-label="Toggle sidebar"
                    title="Toggle sidebar"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                
                {/* Dashboard title - visible on all screens */}
                <h1 className="dashboard-title">{title}</h1>
            </div>

            {/* Right side - Theme toggle and profile */}
            <div className="header-right">
                {/* Theme toggle - visible on all screens */}
                <ThemeToggle />
                
                {/* Profile */}
                <div 
                    className="profile-group"
                    onClick={handleProfileClick}
                >
                    <img 
                        src={pfp}
                        alt="profile"
                        className="profile-image"
                    />
                    <span className="profile-name">{member.name || "User"}</span>
                </div>
            </div>
        </header>
    );
};

export default Header; 