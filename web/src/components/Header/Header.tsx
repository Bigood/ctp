import { useAuth } from "@redwoodjs/auth"
import { Link, routes } from "@redwoodjs/router"
import { useTranslation } from "react-i18next";
import md5 from "md5";

const menuItems = (t, isVertical) => (
<>
<li><Link to={routes.explorer_initiatives()}>{t('initiatives')}</Link></li>
<li><Link to={routes.explorer_users()}>{t('users')}</Link></li>
<li tabIndex={0}>
  <Link to={routes.home()} className="justify-between">
    {t('project')}
    {isVertical
    ? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
    : <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
    }
  </Link>
  <ul className="p-2">
    <li><Link to={routes.home()}>Why</Link></li>
    <li><Link to={routes.home()}>Who</Link></li>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
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
        <ul className="menu menu-horizontal px-1 bg-base-100">{menuItems(t, false)}</ul>
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
                  src={`https://www.gravatar.com/avatar/${md5( currentUser.email )}?d=identicon`}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link to={routes.profile()} className="justify-between">
                  {t('profile')}
                  {/* <span className="badge">new</span> */}
                </Link>
                <Link to={routes.editProfile()} className="justify-between">
                  {t('edit-profile')}
                  {/* <span className="badge">new</span> */}
                </Link>
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
                    <Link to={routes.users()}>{t('users')}</Link>
                  </li>
                  <li>
                    <Link to={routes.organizations()}>
                      {t('organizations')}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.practices()}>{t('practices')}</Link>
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
