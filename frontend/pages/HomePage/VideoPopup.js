import React from 'react';
import videoTrailer from '../../images/videopopup.mp4'

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