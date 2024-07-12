import React, { useState } from 'react';
import '../../css/HomePage.css';
import SocialIcons from "./SocialIcons";
import VideoBackground from './VideoBackground';
import PlayButton from './PlayButton';
import VideoPopup from './VideoPopup';
import DownloadButtons from './DownloadButtons';

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
            <SocialIcons />
            <div className="home-page">
                <VideoBackground />
                <div className="video-overlay">
                    {!isPlaying && (
                        <PlayButton onClick={handlePlayClick} />
                    )}
                    {isPlaying && (
                        <VideoPopup onClose={handleOverlayClick} />
                    )}
                </div>
                <DownloadButtons />
            </div>
        </div>
    );
}

export default HomePage;