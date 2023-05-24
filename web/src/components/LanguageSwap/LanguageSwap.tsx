import { useTranslation } from 'react-i18next'
import { useState } from "react"


const LanguageSwap = () => {
  const {i18n, t} = useTranslation();
  const [theme, setTheme] = useState(i18n.language);
  const toggleTheme = () => {
    const nextValue = theme === 'fr' ? 'en' : 'fr'
    setTheme(nextValue);
    i18n.changeLanguage(nextValue)
  };

  return (
    <label className="swap">
      <input onClick={toggleTheme} type="checkbox" defaultChecked={theme == "en"}/>
      <div className="swap-on">{t('english')}</div>
      <div className="swap-off">{t('french')}</div>
    </label>
  );
}
export default LanguageSwap
