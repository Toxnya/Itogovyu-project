import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/Translation.json'
import translationRu from './locales/ru/Translation.json'

const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRu
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
