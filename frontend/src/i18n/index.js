import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import En from "./locals/en/translation.json";
import Ru from "./locals/ru/translation.json";
import Am from "./locals/am/translation.json";

const resources = {
  en: { translation: En },
  ru: { translation: Ru },
  am: { translation: Am },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"], 
      caches: ["localStorage"], 
    },
  });

export default i18n;
