import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../backend/api';

const ChangePassword = ({ onClose }) => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const changePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await apiRequest('/api/auth/change-password', 'POST', {
                currentPassword,
                newPassword,
                confirmNewPassword
            }, {
                'x-access-token': token,
            });
            if (response.error) {
                setError(response.error);
            } else {
                setMessage(response.message);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Failed to change password. Please try again later.');
        }
    };

    return (
        <div className="change-password">
            <h2>{t('changePassword')}</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <input
                type="password"
                placeholder={t('currentPassword')}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('newPassword')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('confirmNewPassword')}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button onClick={changePassword}>{t('changePassword')}</button>
            <button onClick={onClose}>{t('cancel')}</button>
        </div>
    );
};

export default ChangePassword;
