import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "@redwoodjs/router"
import {faDiscord, faYoutube, faLinkedin, faMailchimp} from "@fortawesome/free-brands-svg-icons"
import { useTranslation } from 'react-i18next'
import ThemeSwap from "../ThemeSwap/ThemeSwap"
import LanguageSwap from "../LanguageSwap/LanguageSwap"

const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer className="footer bg-base-300 p-10 text-base-content">
      <div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>
          {t('footer.connect-with-ctp')}
          <br />
          {t('footer.connect-subtitle')}
        </p>
      </div>
      <div>
        <span className="footer-title">{t('services')}</span>
        <Link to="/contact" className="link-hover link">
          {t('contact')}
        </Link>
        <Link to="/admin" className="link-hover link">
          {t('administration')}
        </Link>

        <LanguageSwap/>
        <ThemeSwap/>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link to="https://www.cartotalents.fr" className="link-hover link">
          {t('footer.community-site')}
        </Link>
        <Link to="#" className="link-hover link">
          {t('personal-data')}
        </Link>
        <Link to="#" className="link-hover link">
          {t('footer.legal')}
        </Link>
        <Link to="#" className="link-hover link">
          {t('cgu')}
        </Link>
      </div>

      <div>
        <span className="footer-title">{t('social')}</span>
        <div className="grid grid-flow-col gap-4 text-lg">
          <Link to="https://discord.com/invite/PncyZGejNT">
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
          <Link to="https://www.youtube.com/channel/UCtsn3Yy6d5bj_1Fh8nClRiA/videos">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
          <Link to="https://www.linkedin.com/company/la-communaut%C3%A9-des-talents-p%C3%A9dagogiques">
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>
          <Link to="https://cartotalents.us19.list-manage.com/subscribe?u=df17c4269e5d3d36fb74d3062&id=0883be1bdc">
            <FontAwesomeIcon icon={faMailchimp} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
