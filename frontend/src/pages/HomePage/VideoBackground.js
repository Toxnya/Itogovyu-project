import React from 'react';


const videoBackground = 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534634/video_ieuhr4.mp4';

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