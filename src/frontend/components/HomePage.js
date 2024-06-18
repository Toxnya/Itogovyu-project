import React, { useState } from "react";
import './HomePage.css';
import TopBar from "./TopBar";
import videoBackground from './images/video.mp4';
import playIcon from './images/icons8-play-100.png';
import videoTrailer from './images/Wuthering Waves Official Release Trailer Waking of a World.mp4';
import appStoreButton from './images/appstore.png';
import googlePlayButton from './images/googleplay.png';
import windowsButton from './images/windows.png';
import epicGamesButton from './images/epicgames.png';

function HomePage() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    const handleOverlayClick = () => {
        setIsPlaying(false);
    };

    return (
        <div>
            <TopBar />
            <div className="home-page">
                <div className="video-container">
                    <video autoPlay loop muted className="video-background">
                        <source src={videoBackground} type="video/mp4" />
                    </video>
                    {isPlaying && <div className="dim-overlay" onClick={handleOverlayClick}></div>}
                </div>
                <div className="video-overlay">
                    {!isPlaying && (
                        <button className="play-button" onClick={handlePlayClick}>
                            <img src={playIcon} alt="Play" className="play-icon" />
                        </button>
                    )}
                    {isPlaying && (
                        <div className="video-popup">
                            <video controls autoPlay className="popup-video">
                                <source src={videoTrailer} type="video/mp4" />
                            </video>
                            <button className="close-button" onClick={handleOverlayClick}>×</button>
                        </div>
                    )}
                </div>
                <div className="download-buttons">
                    <a href="https://apps.apple.com/us/app/wuthering-waves/id6475033368" target="_blank" rel="noopener noreferrer">
                        <img src={appStoreButton} alt="Download on the App Store" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.kurogame.wutheringwaves.global" target="_blank" rel="noopener noreferrer">
                        <img src={googlePlayButton} alt="Get it on Google Play" />
                    </a>
                    <a href="https://download.kurogames.net/transfer/mc_WnGtDn85y8lJB4mTmYHYuNjIl9n6YGVm/official/global/en/pc_app" target="_blank" rel="noopener noreferrer">
                        <img src={windowsButton} alt="Download for Windows" />
                    </a>
                    <a href="https://store.epicgames.com/ru/p/wuthering-waves-76ebc5" target="_blank" rel="noopener noreferrer">
                        <img src={epicGamesButton} alt="Get it on Epic Games" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;