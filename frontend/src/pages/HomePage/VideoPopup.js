import React from 'react';


const videoTrailer = 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534673/videopopup_bh32y4.mp4';

const VideoPopup = ({ onClose }) => {
    return (
        <div className="video-popup">
            <video controls autoPlay className="popup-video">
                <source src={videoTrailer} type="video/mp4" />
            </video>
            <button className="close-button" onClick={onClose}>×</button>
        </div>
    );
};

export default VideoPopup;