import React from 'react';
import { useTranslation } from "react-i18next";
import '../../css/VideosPage.css';

const videoData = [
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534704/v1_gsvbxq.mp4', description: "1" },
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534701/v2_siepn7.mp4', description: "2" },
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534632/v3_toxxnn.mp4', description: "3" },
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720536786/v4_je5nkk.mp4', description: "4" },
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534654/v5_jul5i1.mp4', description: "5" },
    { src: 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534636/v6_edmh8g.mp4', description: "6" },
];

const VideosPage = () => {
    const { t } = useTranslation();

    return (
        <div className="world-videos-page">
            <h2>{t(`world`)}</h2>
            <div className="world-videos-grid">
                <div className="world-video-item world-video-item-1">
                    <p>{t(`videosLore.tabs.tab2.content`)}</p>
                    <video autoPlay loop muted>
                        <source src={videoData[0].src} type="video/mp4" />
                    </video>
                </div>
                <div className="world-video-item world-video-item-2">
                    <p>{t(`videosLore.tabs.tab1.content`)}</p>
                    <video autoPlay loop muted>
                        <source src={videoData[1].src} type="video/mp4" />
                    </video>
                </div>
                <div className="world-video-item world-video-item-3">
                    <video autoPlay loop muted>
                        <source src={videoData[2].src} type="video/mp4"/>
                    </video>
                    <p>{t(`videosLore.tabs.tab5.content`)}</p>
                </div>
                <div className="world-video-item world-video-item-4">
                    <video autoPlay loop muted>
                        <source src={videoData[3].src} type="video/mp4"/>
                    </video>
                    <p>{t(`videosLore.tabs.tab4.content`)}</p>
                </div>
                <div className="world-video-item world-video-item-5">
                    <p>{t(`videosLore.tabs.tab3.content`)}</p>
                    <video autoPlay loop muted>
                        <source src={videoData[4].src} type="video/mp4" />
                    </video>
                </div>
                <div className="world-video-item world-video-item-6">
                    <p>{t(`videosLore.tabs.tab6.content`)}</p>
                    <video autoPlay loop muted>
                        <source src={videoData[5].src} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default VideosPage;
