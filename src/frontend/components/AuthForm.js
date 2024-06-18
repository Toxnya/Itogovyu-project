import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ onClose, onAuthSuccess }) => {
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
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernameOrEmail, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);
            onAuthSuccess(data.id);
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, verificationCode })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);
            onAuthSuccess(data.id);
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    const sendVerificationCode = async () => {
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setIsCodeSent(true);
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="auth-modal-close" onClick={onClose}>×</button>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {isLogin ? (
                        <>
                            <input
                                type="text"
                                placeholder="Username or Email"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button type="button" onClick={sendVerificationCode}>Send Verification Code</button>
                            {isCodeSent && (
                                <input
                                    type="text"
                                    placeholder="Verification Code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                            )}
                        </>
                    )}
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p className="auth-switch">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
