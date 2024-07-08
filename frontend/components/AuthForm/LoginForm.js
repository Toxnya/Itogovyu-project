import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const LoginForm = ({ usernameOrEmail, password, setUsernameOrEmail, setPassword, handleLogin }) => {
    const { t } = useTranslation();
    return (
        <>
            <input
                type="text"
                placeholder={t('usernameOrEmail')}
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{t('login')}</button>
        </>
    );
};

export default LoginForm;