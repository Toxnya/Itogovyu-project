import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfile.css';
import ChangeUsername from './UsernameUpdate';
import ChangePassword from "./ChangePassword";
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../api/api';


const UserProfile = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message] = useState('');
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                }

                const response = await apiRequest('/api/auth/me', 'GET', null, { 'x-access-token': token });
                setUsername(response.username);
                setEmail(response.email);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div className="user-profile">
            <h2>{t('userProfile')}</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <div className="profile-info">
                <div className="profile-field">
                    <label>{t('username')}:</label>
                    <span>{username}</span>
                </div>
                <div className="profile-field">
                    <label>{t('email')}:</label>
                    <span>{email}</span>
                </div>
                <div className="profile-field password-field">
                    <label>{t('password')}:</label>
                    <span>{showPassword ? 'actual_password' : '********'}</span>
                </div>
            </div>
            <div className="profile-buttons">
                <button onClick={() => setIsChangeUsernameOpen(true)}>{t('changeUsername')}</button>
                <button onClick={() => setIsChangePasswordOpen(true)}>{t('changePassword')}</button>
                <Link to="/forgot-reset-password" className="forgot-password-button">{t('forgotPassword')}</Link>
                <Link to="/" className="go-home-button">{t('goHome')}</Link>
            </div>

            {isChangeUsernameOpen && <ChangeUsername onClose={() => setIsChangeUsernameOpen(false)} />}
            {isChangePasswordOpen && <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />}
        </div>
    );
};

export default UserProfile;
