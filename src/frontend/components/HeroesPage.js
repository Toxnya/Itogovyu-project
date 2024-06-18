import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import './HeroesPage.css';
import calcharoThumbnail from './images/nav-role-kakaluo-d8663151.png';
import jianxinThumbnail from './images/nav-role-jianxin-e8a5d783.png';
import yinlinThumbnail from './images/nav-role-yinlin-4359a950.png';
import verinaThumbnail from './images/nav-role-weilinai-61bf0f50.png';
import encoreThumbnail from './images/nav-role-anke-2b178fec.png';
import jiyanThumbnail from './images/nav-role-jiyan-880cc3f3.png';
import lingyangThumbnail from './images/nav-role-lingyang-c2625456.png';
import calcharoImage from './images/super_kakaluo-19b02a23.png';
import jianxinImage from './images/super_jianxin-7ae51570.png';
import yinlinImage from './images/super_yinlin-e98ed545.png';
import verinaImage from './images/super_weilinai-fb41e537.png';
import encoreImage from './images/super_anke-968ed264.png';
import jiyanImage from './images/super_jiyan-2b4d6442.png';
import lingyangImage from './images/super_lingyang-699f1f98.png';
import fireIcon from './images/pyro.png'
import iceIcon from './images/cryo.png'
import electroIcon from './images/electro.png'
import spectroIcon from './images/spetcro.png'
import anemoIcon from './images/anemo.png'

const HeroesPage = () => {
    const { t } = useTranslation();
    const heroes = [
        {
            id: 'jiyan',
            image: jiyanImage,
            avatar: jiyanThumbnail,
            icon: anemoIcon
        },
        {
            id: 'yinlin',
            image: yinlinImage,
            avatar: yinlinThumbnail,
            icon: electroIcon
        },
        {
            id: 'jianxin',
            image: jianxinImage,
            avatar: jianxinThumbnail,
            icon: fireIcon
        },
        {
            id: 'verina',
            image: verinaImage,
            avatar: verinaThumbnail,
            icon: spectroIcon
        },
        {
            id: 'encore',
            image: encoreImage,
            avatar: encoreThumbnail,
            icon: fireIcon
        },
        {
            id: 'lingyang',
            image: lingyangImage,
            avatar: lingyangThumbnail,
            icon: iceIcon
        },
        {
            id: 'calcharo',
            image: calcharoImage,
            avatar: calcharoThumbnail,
            icon: fireIcon
        },
    ];

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
                <button className="scroll-button" onClick={handleScrollUp}>▲</button>
                {displayedHeroes.map((hero) => (
                    <div
                        key={hero.id}
                        className={`sidebar-item ${selectedHero.id === hero.id ? 'selected' : ''}`}
                        onClick={() => setSelectedHero(hero)}
                    >
                        <motion.img
                            src={hero.avatar}
                            alt={t(`heroes.${hero.id}.name`)}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: selectedHero.id === hero.id ? 1 : 0.5 }}
                            transition={{ duration: 0.5 }}
                        />
                        <span className="hero-name">{t(`heroes.${hero.id}.name`)}</span>
                    </div>
                ))}
                <button className="scroll-button" onClick={handleScrollDown}>▼</button>
            </div>
            <div className="hero-content">
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={selectedHero.image}
                        src={selectedHero.image}
                        alt={t(`heroes.${selectedHero.id}.name`)}
                        className="hero-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedHero.id}
                        className="hero-description"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2>
                            <img src={selectedHero.icon} alt={`${t(`heroes.${selectedHero.id}.name`)} icon`} className="hero-icon" />
                            {t(`heroes.${selectedHero.id}.name`)}
                        </h2>
                        <p>{t(`heroes.${selectedHero.id}.description`)}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HeroesPage;
