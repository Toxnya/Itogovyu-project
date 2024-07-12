import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/TabBar.css';

const TabBar = () => {
    const location = useLocation();

    const tabs = [
        { path: '/', label: 'Home' },
        { path: '/heroes', label: 'Heroes' },
        { path: '/lore', label: 'Lore'},
        { path: '/videos', label: 'Videos'},
        { path: '/last', label: 'Last'}
    ];

    if (location.pathname === '/profile' || location.pathname === '/forgot-reset-password') {
        return null;
    }

    const currentIndex = tabs.findIndex(tab => tab.path === location.pathname);
    const prevTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
    const nextTab = tabs[(currentIndex + 1) % tabs.length];

    return (
        <div className="tab-bar">
            {currentIndex !== 0 && <Link to={prevTab.path} className="arrow left-arrow">{'<'}</Link>}
            <div className="tabs-container">
                {tabs.map(tab => (
                    <Link key={tab.path} to={tab.path} className={`tab-item ${location.pathname === tab.path ? 'active' : ''}` }>
                       <span className="tab-dot"></span>
                    </Link>
                ))}
            </div>
            {currentIndex !== tabs.length - 1 && <Link to={nextTab.path} className="arrow right-arrow">{'>'}</Link>}
        </div>
    );
};

export default TabBar;
