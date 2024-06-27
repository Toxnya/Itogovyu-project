import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoreText = ({ activeIndex, tabs }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                <h2>{t(`lore.tabs.${tabs[activeIndex]}.title`)}</h2>
                <p>{t(`lore.tabs.${tabs[activeIndex]}.content`)}</p>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoreText;