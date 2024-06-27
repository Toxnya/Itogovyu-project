import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './HeroesPage.css';
import HeroAvatar from './HeroAvatar';
import HeroDetails from './HeroDetails';
import heroes from './heroesData';

const HeroesPage = () => {
    const { t } = useTranslation();
    const [selectedHero, setSelectedHero] = useState(heroes[0]);
    const [startIndex, setStartIndex] = useState(0);

    const handleScrollUp = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleScrollDown = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + 1, heroes.length - 5));
    };

    const displayedHeroes = heroes.slice(startIndex, startIndex + 5);

    return (
        <div className="hero-details-container">
            <div className="sidebar">
                {startIndex > 0 && (
                    <button className="scroll-button" onClick={handleScrollUp}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                )}
                <div className="sidebar-content">
                    {displayedHeroes.map((hero) => (
                        <HeroAvatar
                            key={hero.id}
                            hero={hero}
                            selected={selectedHero.id === hero.id}
                            onSelect={() => setSelectedHero(hero)}
                        />
                    ))}
                </div>
                {startIndex < heroes.length - 5 && (
                    <button className="scroll-button" onClick={handleScrollDown}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                )}
            </div>
            <div className="hero-content">
                <AnimatePresence mode="wait">
                    <HeroDetails key={selectedHero.id} hero={selectedHero} />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HeroesPage;
