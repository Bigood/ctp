import { faBuilding, faFile, faLightbulb, faUser } from '@fortawesome/free-regular-svg-icons'
import { faA, faBook, faCircleNodes, faDollarSign, faGraduationCap, faList, faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, routes } from '@redwoodjs/router'
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
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
            <MenuItem to={routes.users()} icon={faUser} text={t("user", {count: 2})}/>
            <MenuItem to={routes.organizations()} icon={faBuilding} text={t("organization", {count: 2})}/>
            <MenuItem to={routes.practices()} icon={faList} text={t("practice", {count: 2})}/>
            <MenuItem to={routes.adminInitiatives()} icon={faLightbulb} text={t("initiative", {count: 2})}/>
            <MenuItem to={routes.adminNetworks()} icon={faCircleNodes} text={t("network", {count: 2})}/>
            <MenuItem to={routes.adminCompetences()} icon={faBook} text={t("competence", {count: 2})}/>
            <MenuItem to={routes.adminResources()} icon={faFile} text={t("resource", {count: 2})}/>
            <MenuItem to={routes.adminSponsors()} icon={faDollarSign} text={t("sponsor", {count: 2})}/>
            <MenuItem to={routes.adminSubjects()} icon={faA} text={t("subject", {count: 2})}/>
            <MenuItem to={routes.adminLevels()} icon={faGraduationCap} text={t("level", {count: 2})}/>
            <MenuItem to={routes.adminTags()} icon={faTags} text={t("tag", {count: 2})}/>
          </ul>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({to, icon, text}) => (
  <li>
    <Link to={to}>
      <FontAwesomeIcon icon={icon} className="w-5" />
      <span>{text}</span>
    </Link>
  </li>
)
export default AdminLayout
