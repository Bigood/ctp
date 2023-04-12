import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, routes } from "@redwoodjs/router"
import {
  faBuilding,
  faFile,
  faLightbulb,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import {
  faA,
  faBook,
  faCircleNodes,
  faDollarSign,
  faGraduationCap,
  faList,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next"
const AdminPage = (props) => {
  const { t } = useTranslation()
  return (
    <main className="container mx-auto grid grid-flow-col grid-rows-4 gap-8 p-4">
      <MenuItem to={routes.users()} icon={faUser} text={t("user", {count: 2})} className="row-span-2"/>
      <MenuItem to={routes.organizations()} icon={faBuilding} text={t("organization", {count: 2})} />
      <MenuItem to={routes.practices()} icon={faList} text={t("practice", {count : 2})} />
      <MenuItem to={routes.adminInitiatives()} icon={faLightbulb} text={t("initiative", {count : 2})}  className="row-span-2 col-span-2"/>
      <MenuItem to={routes.adminNetworks()} icon={faCircleNodes} text={t("network", {count : 2})} />
      <MenuItem to={routes.adminCompetences()} icon={faBook} text={t("competence", {count : 2})} />
      <MenuItem to={routes.adminResources()} icon={faFile} text={t("resource", {count : 2})} />
      <MenuItem to={routes.adminSponsors()} icon={faDollarSign} text={t("sponsor", {count : 2})} />
      <MenuItem to={routes.adminSubjects()} icon={faA} text={t("subject", {count : 2})} />
      <MenuItem to={routes.adminLevels()} icon={faGraduationCap} text={t("level", {count : 2})} />
    </main>
  )
}

const MenuItem = ({to, icon, text, className = ""}) => (
  <Link
    to={to}
  >
  <div className={`flex btn  flex-col items-center justify-center bg-base-300 p-8 text-center shadow h-full ${className}`}>
    <FontAwesomeIcon icon={icon} className="text-5xl" />
    <h1 className="text-xl mt-2">{text}</h1>
    </div>
  </Link>
)

export default AdminPage