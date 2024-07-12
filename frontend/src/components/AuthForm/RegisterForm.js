import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const RegisterForm = ({username, email, password, confirmPassword, verificationCode, setUsername, setEmail, setPassword, setConfirmPassword, setVerificationCode, sendVerificationCode, handleRegister, isCodeSent }) => {
    const { t } = useTranslation();

    return (
        <>
            <input
                type="text"
                placeholder={t('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={sendVerificationCode}>{t('sendVerificationCode')}</button>
            {isCodeSent && (
                <input
                    type="text"
                    placeholder={t('verificationCode')}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
            )}
            <button type="submit">{t('register')}</button>
        </>
    );
};

export default RegisterForm;