import { useAuth } from "@redwoodjs/auth"
import { Link, routes } from "@redwoodjs/router"
import { useTranslation } from "react-i18next";
import md5 from "md5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

const menuItems = (t, isVertical) => (
  <>
    <li>
      <Link to={routes.explorer({type: "initiatives"})}>
        {t('initiative', { count: 2 })}
      </Link>
    </li>
    <li>
      <Link to={routes.explorer({type: "users"})}>{t('user', { count: 2 })}</Link>
    </li>
    <li tabIndex={0}>
      <Link to={routes.home()} className="justify-between">
        {t('project')}
        {isVertical ? (
          <FontAwesomeIcon icon={faCaretRight} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </Link>
      <ul className="p-2">
        <li>
          <Link to={routes.home()}>Why</Link>
        </li>
        <li>
          <Link to={routes.home()}>Who</Link>
        </li>
      </ul>
    </li>
  </>
)
const Header = () => {
  const { isAuthenticated, currentUser, hasRole, logOut } = useAuth();
  const {t} = useTranslation();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {menuItems(t, true)}
          </ul>
        </div>
        <Link to={routes.home()} className="btn-ghost btn text-xl normal-case">
          {t('site-title')}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal bg-base-100 px-1">
          {menuItems(t, false)}
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder={t('search')}
            className="input-bordered input"
          />
        </div>
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img
                  src={`https://www.gravatar.com/avatar/${md5(
                    currentUser.email
                  )}?d=identicon`}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link to={routes.profile()} className="justify-between">
                  {t('my')} {i18next.format(t('profile'), "lowercase")}
                  {/* <span className="badge">new</span> */}
                </Link>
                {/* <Link to={routes.initiatives()} className="justify-between">
                  {t('my', {count: 2})} {i18next.format(t('initiative', {count: 2}), "lowercase")}
                </Link> */}
              </li>
              <li onClick={logOut}>
                <span>{t('logout')}</span>
              </li>
              {hasRole('admin') && (
                <>
                  <li className="menu-title">
                    <span>{t('administration')}</span>
                  </li>
                  <li>
                    <Link to={routes.users()}>{t('user', { count: 2 })}</Link>
                  </li>
                  <li>
                    <Link to={routes.adminInitiatives()}>
                      {t('initiative', { count: 2 })}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.admin()}>{t('administration')}</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : (
          <button className="btn-primary btn">
            <Link to={routes.auth()}>{t('login')}</Link>
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
