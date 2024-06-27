import React, { useState } from 'react';
import './AuthForm.css';
import { apiRequest } from "../../backend/api";
import { useTranslation } from "react-i18next";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = ({ onClose, onAuthSuccess }) => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await apiRequest('/api/auth/login', 'POST', { usernameOrEmail, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);
            onAuthSuccess(data.id);
        } catch (error) {
            setError(t('networkError') + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        try {
            const data = await apiRequest('/api/auth/register', 'POST', { username, email, password, verificationCode });

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);
            onAuthSuccess(data.id);
        } catch (error) {
            setError(t('networkError') + error.message);
        }
    };

    const sendVerificationCode = async () => {
        setError('');

        try {
            await apiRequest('/api/auth/send-verification-code', 'POST', { email });

            setIsCodeSent(true);
        } catch (error) {
            setError(t('networkError') + error.message);
        }
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="auth-modal-close" onClick={onClose}>×</button>
                <h2>{isLogin ? t('login') : t('register')}</h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {isLogin ? (
                        <LoginForm
                            usernameOrEmail={usernameOrEmail}
                            password={password}
                            setUsernameOrEmail={setUsernameOrEmail}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                        />
                    ) : (
                        <RegisterForm
                            username={username}
                            email={email}
                            password={password}
                            confirmPassword={confirmPassword}
                            verificationCode={verificationCode}
                            setUsername={setUsername}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword}
                            setVerificationCode={setVerificationCode}
                            sendVerificationCode={sendVerificationCode}
                            handleRegister={handleRegister}
                            isCodeSent={isCodeSent}
                        />
                    )}
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p className="auth-switch">
                    {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? t('register') : t('login')}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;