import { useEffect, useState } from "react"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const LOCALSTORAGE_KEY = "CTP-THEME"

const ThemeSwap = () => {
  const [theme, setTheme] = useState(localStorage.getItem(LOCALSTORAGE_KEY));
  const toggleTheme = () => {
    const nextValue = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextValue);
    localStorage.setItem(LOCALSTORAGE_KEY, nextValue)
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" defaultChecked={theme == "dark"}/>
      <div className="swap-on"><FontAwesomeIcon icon={faMoon}/></div>
      <div className="swap-off"><FontAwesomeIcon icon={faSun}/></div>
    </label>
  );
}
export default ThemeSwap
