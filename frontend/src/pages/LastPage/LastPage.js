import React, {useRef, useEffect} from "react";
import '../../css/LastPage.css';

const videoLoopUrl = 'https://res.cloudinary.com/dg3rglilr/video/upload/v1720534603/loopVideo_kt2izp.mp4';
const overlayGifUrl = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534575/1_z2xu7r.gif';


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
                <source src={videoLoopUrl} type="video/mp4" />
            </video>
            <div className="overlay-gif-container">
                <img src={overlayGifUrl} alt="Overlay GIF" className="overlay-gif" />
            </div>
        </div>
    );
};

export default LastPage;
