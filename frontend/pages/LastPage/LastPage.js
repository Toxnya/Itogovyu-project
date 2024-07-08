import React, {useRef, useEffect} from "react";
import '../../css/LastPage.css';
import videoLoop from '../../images/loopVideo.mp4';
import overlayGif from '../../images/1.gif'


const LastPage = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const loopStartTime = 7;
        const loopEndTime = 13;
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            if (video.currentTime >= loopEndTime) {
                video.currentTime = loopStartTime;
                video.play();
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div className="loop-video-container">
            <video ref={videoRef} className="loop-video" autoPlay muted loop>
                <source src={videoLoop} type="video/mp4" />
            </video>
            <div className="overlay-gif-container">
                <img src={overlayGif} alt="Overlay GIF" className="overlay-gif" />
            </div>
        </div>
    );
};

export default LastPage;
