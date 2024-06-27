import React, { useState } from 'react';
import './LorePage.css';
import LoreText from './LoreText';
import LoreSwiper from "./LoreSwiper";

const importAllImages = (context) => context.keys().map(context);
const images = importAllImages(require.context('../images', false, /\.(jpg)$/));

const LorePage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="lore-page">
            <div className="lore-content">
                <LoreSwiper images={images} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                <div className="lore-text">
                    <LoreText activeIndex={activeIndex} tabs={['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7']} />
                </div>
            </div>
        </div>
    );
};

export default LorePage;