import { faBuilding, faFile, faLightbulb, faUser } from '@fortawesome/free-regular-svg-icons'
import { faA, faBook, faCircleNodes, faDollarSign, faGraduationCap, faList, faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, routes } from '@redwoodjs/router'

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
          <ul className="menu w-80 bg-base-200 p-4 text-base-content">
            <li>
              <Link to={routes.users()}>
                <FontAwesomeIcon icon={faUser} className="w-5"/>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to={routes.organizations()}>
                <FontAwesomeIcon icon={faBuilding} className="w-5"/>
                <span>Organization</span>
              </Link>
            </li>
            <li>
              <Link to={routes.practices()}>
                <FontAwesomeIcon icon={faList} className="w-5"/>
                <span>Practices</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminInitiatives()}>
                <FontAwesomeIcon icon={faLightbulb} className="w-5"/>
                <span>Initiatives</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminNetworks()}>
                <FontAwesomeIcon icon={faCircleNodes} className="w-5"/>
                <span>Networks</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminCompetences()}>
                <FontAwesomeIcon icon={faBook} className="w-5"/>
                <span>Competences</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminResources()}>
                <FontAwesomeIcon icon={faFile} className="w-5"/>
                <span>Resources</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminSponsors()}>
                <FontAwesomeIcon icon={faDollarSign} className="w-5"/>
                <span>Sponsors</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminSubjects()}>
                <FontAwesomeIcon icon={faA} className="w-5"/>
                <span>Subjects</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminLevels()}>
                <FontAwesomeIcon icon={faGraduationCap} className="w-5"/>
                <span>Levels</span>
              </Link>
            </li>
            <li>
              <Link to={routes.adminTags()}>
                <FontAwesomeIcon icon={faTags} className="w-5"/>
                <span>Tags</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
