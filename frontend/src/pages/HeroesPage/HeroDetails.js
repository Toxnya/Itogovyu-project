import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeroDetails = ({ hero }) => {
    const { t } = useTranslation();

    return (
        <>
            <motion.img
                src={hero.image}
                alt={t(`heroes.${hero.id}.name`)}
                className="hero-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
            <motion.div
                className="hero-description"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2>
                    <img
                        src={hero.icon}
                        alt={`${t(`heroes.${hero.id}.name`)} icon`}
                        className="hero-icon"
                    />
                    {t(`heroes.${hero.id}.name`)}
                </h2>
                <p>{t(`heroes.${hero.id}.description`)}</p>
            </motion.div>
        </>
    );
};

export default HeroDetails;