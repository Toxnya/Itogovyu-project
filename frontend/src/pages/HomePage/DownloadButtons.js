import React from 'react';


const appStoreButton = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534576/appstore_cno4a3.png';
const googlePlayButton = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534580/googleplay_wsexsj.png';
const windowsButton = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534638/windows_lgwna8.png';
const epicGamesButton = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534577/epicgames_kzrfyd.png';

const DownloadButtons = () => {
    return (
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
    );
};

export default DownloadButtons;