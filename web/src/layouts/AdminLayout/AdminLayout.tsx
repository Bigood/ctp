import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import Header from "src/components/Header/Header"
import { faBuilding, faUser } from '@fortawesome/free-regular-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const AdminLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div>
      <div className="drawer-mobile drawer">
        <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <header className="rw-header">
            <label
              htmlFor="admin-sidebar"
              className="btn-primary drawer-button btn lg:hidden"
            >
              Open drawer
            </label>
            <h1 className="rw-heading rw-heading-primary">
              <Link to={routes[titleTo]()} className="rw-link">
                {title}
              </Link>
            </h1>
            <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
              <div className="rw-button-icon">+</div> {buttonLabel}
            </Link>
          </header>
          <main className="rw-main">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="admin-sidebar" className="drawer-overlay"></label>
          <ul className="menu w-80 bg-base-100 p-4 text-base-content">
            <li>
              <Link to={routes.users()}>
                <FontAwesomeIcon icon={faUser} />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to={routes.organizations()}>
                <FontAwesomeIcon icon={faBuilding} />
                <span>Organization</span>
              </Link>
            </li>
            <li>
              <Link to={routes.practices()}>
                <FontAwesomeIcon icon={faList} />
                <span>Practices</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
