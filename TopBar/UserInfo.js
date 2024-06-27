import React from 'react';
import { Link } from 'react-router-dom';
import registerIcon from '../images/icons8-user-90.png';
import { useTranslation } from "react-i18next";

const UserInfo = ({ userId, handleLogout, handleProfileClick }) => {
    const { t } = useTranslation();

    return (
        <div className="user-info">
            <Link to="/profile" className="user-profile-link">
                <img src={registerIcon} alt="User Profile" className="icon" />
            </Link>
            <span>User ID: {userId}</span>
            <button className="logout-button" onClick={handleLogout}>{t('exit')}</button>
            <div className="profile-click" onClick={handleProfileClick}></div>
        </div>
    );
};

export default UserInfo;
