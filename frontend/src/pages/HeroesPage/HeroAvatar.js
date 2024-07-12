import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeroAvatar = ({ hero, selected, onSelect}) => {
    const { t } = useTranslation();

    return (
        <div
            className={`sidebar-item ${selected ? "selected" : ""}`}
            onClick={onSelect}
        >
            <motion.img
                src={hero.avatar}
                alt={t(`heroes.${hero.id}.name`)}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: selected ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
            />
            <span className="hero-name">{t(`heroes.${hero.id}.name`)}</span>
        </div>
    );
};
export default HeroAvatar;