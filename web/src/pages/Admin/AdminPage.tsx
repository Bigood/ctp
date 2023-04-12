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
  return (
    <main className="container mx-auto grid grid-flow-col grid-rows-4 gap-8 p-4">
      <MenuItem to={routes.users()} icon={faUser} text={"users"} className="row-span-2"/>
      <MenuItem to={routes.organizations()} icon={faBuilding} text={"organization"} />
      <MenuItem to={routes.practices()} icon={faList} text={"practices"} />
      <MenuItem to={routes.adminInitiatives()} icon={faLightbulb} text={"initiatives"}  className="row-span-2 col-span-2"/>
      <MenuItem to={routes.adminNetworks()} icon={faCircleNodes} text={"networks"} />
      <MenuItem to={routes.adminCompetences()} icon={faBook} text={"competences"} />
      <MenuItem to={routes.adminResources()} icon={faFile} text={"resources"} />
      <MenuItem to={routes.adminSponsors()} icon={faDollarSign} text={"sponsors"} />
      <MenuItem to={routes.adminSubjects()} icon={faA} text={"subjects"} />
      <MenuItem to={routes.adminLevels()} icon={faGraduationCap} text={"levels"} />
    </main>
  )
}

const MenuItem = ({to, icon, text, className = ""}) => {
  const { t } = useTranslation()

  return (
    <Link
      to={to}
    >
    <div className={`flex btn  flex-col items-center justify-center bg-base-300 p-8 text-center shadow h-full ${className}`}>
      <FontAwesomeIcon icon={icon} className="text-5xl" />
      <h1 className="text-xl mt-2">{t(text)}</h1>
      </div>
    </Link>
    )
}
export default AdminPage