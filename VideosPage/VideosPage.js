import React from 'react';
import { useTranslation } from "react-i18next";
import './VideosPage.css';
import video1 from '../images/v1.mp4';
import video2 from '../images/v2.mp4';
import video3 from '../images/v3.mp4';
import video4 from '../images/v4.mp4';
import video5 from '../images/v5.mp4';
import video6 from '../images/v6.mp4';

const videoData = [
    { src: video1, description: "1" },
    { src: video2, description: "2" },
    { src: video3, description: "3" },
    { src: video4, description: "4" },
    { src: video5, description: "5" },
    { src: video6, description: "6" },
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
