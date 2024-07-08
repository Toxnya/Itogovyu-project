import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { apiRequest } from "../api/api";
import { Link } from 'react-router-dom';
import '../../css/ForgotPasswordResetPassword.css';

const ForgotPasswordResetPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState('sendCode');

    const sendResetCode = async () => {
        if (!email) {
            setError(t('emailRequired'));
            return;
        }
        try {
            const response = await apiRequest('/api/auth/send-reset-code', 'POST', { email });
            setMessage(t('sendVerificationCodeSuccess'));
            setStep('resetPassword');
        } catch (error) {
            setError(error.message);
        }
    };

    const resetPassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }
        try {
            const response = await apiRequest('/api/auth/reset-password', 'POST', {
                email,
                verificationCode,
                newPassword,
            });
            setMessage(t('resetPasswordSuccess'));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="forgot-password-reset-password">
            <h2>{t('forgotPassword')}</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {step === 'resetPassword' && (
                <>
                    <input
                        type="text"
                        placeholder={t('verificationCode')}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
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
                </>
            )}
            <div className="buttons">
                {step === 'sendCode' && (
                    <button onClick={sendResetCode}>{t('sendVerificationCode')}</button>
                )}
                {step === 'resetPassword' && (
                    <button onClick={resetPassword}>{t('resetPassword')}</button>
                )}
            </div>
            <Link to="/profile" className="go-home-button">{t('goBack')}</Link>
        </div>
    );
};

export default ForgotPasswordResetPassword;
