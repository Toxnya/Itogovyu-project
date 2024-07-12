import React, { useState } from 'react';
import { apiRequest } from "../api/api";
import { useTranslation } from "react-i18next";

const ChangeUsername = ({ onClose }) => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleUpdateUsername = async () => {
        setError('');
        setMessage('');

        try {
            await apiRequest('/api/auth/update-username', 'POST', { currentPassword, newUsername });
            setMessage('Username updated successfully.');
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
            <div className="change-username">
                <h2>{t('changeUsername')}</h2>
                <input
                    type="password"
                    placeholder={t('currentPassword')}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                 type="text"
                    placeholder={t('newUsername')}
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleUpdateUsername}>{t('updateUsername')}</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <button onClick={onClose}>{t('close')}</button>
            </div>
    );
};
export default ChangeUsername;