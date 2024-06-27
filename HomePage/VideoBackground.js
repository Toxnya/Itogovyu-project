import React from 'react';
import videoBackground from '../images/video.mp4'

const VideoBackground = () => {
    return (
        <div className="video-container">
            <video autoPlay loop muted className="video-background">
                <source src={videoBackground} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoBackground;