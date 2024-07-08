import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TopBar.css";
import Logo from './Logo';
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import AuthForm from "../AuthForm/AuthForm";
import UserInfo from './UserInfo';
import AuthIcon from './AuthIcon';
import OfficialWebsiteButton from './OfficialWebsiteButton';
import useAuth from "./useAuth";

const TopBar = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();

    const {
        isAuthenticated,
        userId,
        message,
        openAuthModal,
        closeAuthModal,
        handleLogout,
        handleAuthSuccess
    } = useAuth();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleWebsiteClick = () => {
        window.open('https://wutheringwaves.kurogames.com/en/main', '_blank');
    };

    return (
        <div className="top-bar">
            <div className="top-bar-content">
                <Logo />
                <div className="top-bar-icons">
                    <LanguageSelector />
                    {isAuthenticated ? (
                        <UserInfo
                            userId={userId}
                            handleLogout={handleLogout}
                            handleProfileClick={handleProfileClick}
                        />
                    ) : (
                        <AuthIcon openAuthModal={() => openAuthModal(setAuthModalOpen)} />
                    )}
                    <OfficialWebsiteButton handleWebsiteClick={handleWebsiteClick} />
                </div>
            </div>
            {authModalOpen && <AuthForm onClose={() => closeAuthModal(setAuthModalOpen)} onAuthSuccess={(id) => handleAuthSuccess(id, setAuthModalOpen)} />}
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default TopBar;
