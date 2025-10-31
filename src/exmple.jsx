import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const LanguageSwitcher = () => {
 const changeLanguage = (lang) => i18n.changeLanguage(lang);
 return (
   <div>
     <button onClick={() => changeLanguage('En')}>English</button>
     <button onClick={() => changeLanguage('fr')}>French</button>
     <p>my name is mine </p>
   </div>
 );
};
export default LanguageSwitcher;