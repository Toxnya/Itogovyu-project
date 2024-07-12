import React from 'react';
import { useTranslation } from "react-i18next";

const OfficialWebsiteButton = ({ handleWebsiteClick }) => {
    const { t } = useTranslation();

    return (
        <button className="official-website-button" onClick={handleWebsiteClick}>
            {t('officialWebsite')}
        </button>
    );
};

export default OfficialWebsiteButton;
