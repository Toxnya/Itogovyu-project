import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ScrollHandler.css';

function ScrollHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrollDirection, setScrollDirection] = useState(null);
    const [isThrottled, setIsThrottled] = useState(false);

    useEffect(() => {
        const handleScroll = (e) => {
            if (isThrottled) return;

            const scrollDelta = e.deltaY;
            if (scrollDelta > 0 && location.pathname === '/') {
                setScrollDirection("down");
            } else if (scrollDelta < 0 && location.pathname === '/heroes') {
                setScrollDirection("up");
            } else if (scrollDelta > 0 && location.pathname === '/heroes') {
                setScrollDirection("down");
            } else if (scrollDelta < 0 && location.pathname === '/lore') {
                setScrollDirection("up");
            } else if (scrollDelta > 0 && location.pathname === '/lore') {
                setScrollDirection("down");
            } else if (scrollDelta < 0 && location.pathname === '/videos') {
                setScrollDirection("up");
            } else if (scrollDelta > 0 && location.pathname === '/videos') {
                setScrollDirection("down");
            } else if (scrollDelta < 0 && location.pathname === '/last') {
                setScrollDirection("up");
            }

            setIsThrottled(true);
            setTimeout(() => {
                setIsThrottled(false);
            }, 1000);
        };

        window.addEventListener("wheel", handleScroll);
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [location, isThrottled]);

    useEffect(() => {
        if (scrollDirection) {
            if (scrollDirection === "down" && location.pathname === '/') {
                navigate('/heroes');
            } else if (scrollDirection === "up" && location.pathname === '/heroes') {
                navigate('/');
            } else if (scrollDirection === "down" && location.pathname === '/heroes') {
                navigate("/lore");
            } else if (scrollDirection === "up" && location.pathname === '/lore') {
                navigate('/heroes');
            } else if (scrollDirection === "down" && location.pathname === '/lore') {
                navigate('/videos');
            } else if (scrollDirection === "up" && location.pathname === '/videos') {
                navigate('/lore');
            } else if (scrollDirection === "down" && location.pathname === '/videos') {
                navigate('/last');
            } else if (scrollDirection === "up" && location.pathname === '/last') {
                navigate('/videos');
            }
            setScrollDirection(null);
        }
    }, [scrollDirection, navigate, location]);

    return null;
}

export default ScrollHandler;
