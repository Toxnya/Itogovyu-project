import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faYoutube, faXTwitter, faFacebook, faReddit, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './SocialIcons.css'
const SocialIcons = () => {
    return (
        <nav className="social-icons">
            <ul>
                <li>
                    <a href="https://discord.com/invite/wutheringwaves" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faDiscord} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@WutheringWaves" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/Wuthering_Waves" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/@wutheringwaves_official" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTiktok} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/WutheringWaves.Official" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://www.reddit.com/r/WutheringWaves/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faReddit} className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/wuthering_waves" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="icon" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default SocialIcons;
