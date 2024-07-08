import { useState, useEffect } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        if (token) {
            fetch('http://localhost:5000/api/auth/me', {
                headers: {
                    'x-access-token': token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.auth) {
                        setIsAuthenticated(true);
                        setUserId(data.id || storedUserId);
                    } else {
                        setIsAuthenticated(false);
                        setUserId(null);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsAuthenticated(false);
                    setUserId(null);
                });
        } else {
            setIsAuthenticated(false);
            setUserId(null);
        }
    }, []);

    const openAuthModal = (setAuthModalOpen) => {
        setAuthModalOpen(true);
    };

    const closeAuthModal = (setAuthModalOpen) => {
        setAuthModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUserId(null);
        setMessage('Successfully logged out!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAuthSuccess = (id, setAuthModalOpen) => {
        setIsAuthenticated(true);
        setUserId(id);
        localStorage.setItem('userId', id);
        setMessage('Successfully logged in!');
        setTimeout(() => setMessage(''), 3000);
        closeAuthModal(setAuthModalOpen);
    };

    return {
        isAuthenticated,
        userId,
        message,
        openAuthModal,
        closeAuthModal,
        handleLogout,
        handleAuthSuccess
    };
};

export default useAuth;
