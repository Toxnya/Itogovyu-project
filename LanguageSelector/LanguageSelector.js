import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import languageIcon from '../images/world.png'
import './LanguageSelector.css'

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="language-switcher">
            <img
                src={languageIcon}
                alt="Laguage"
                className="icon"
                onClick={toggleDropdown}
            />
            {dropdownOpen && (
                <ul className="language-dropdown">
                    <li onClick={() => changeLanguage('en')}>English</li>
                    <li onClick={() => changeLanguage('ru')}>Русский</li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;