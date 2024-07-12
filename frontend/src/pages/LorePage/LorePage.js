import React, { useState } from 'react';
import '../../css/LorePage.css';
import LoreText from './LoreText';
import LoreSwiper from "./LoreSwiper";

const images = [
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534575/1_rc0rtj.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534575/2_aepahs.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534576/3_yrpubz.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534575/4_eiupyk.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534574/5_frc19w.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534575/6_kquvho.jpg',
    'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534576/7_sy8bpn.jpg'
]

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