import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, routes } from "@redwoodjs/router"
import { faBuilding, faUser } from "@fortawesome/free-regular-svg-icons"
import { faList } from "@fortawesome/free-solid-svg-icons"

const AdminPage = (props) => {
  return (
    <main className="grid grid-flow-col gap-8 p-4 container mx-auto">
      <Link to={routes.users()} className="text-center bg-base-300 p-8 shadow">
        <FontAwesomeIcon className="text-5xl" icon={faUser} />
        <h1 className="text-2xl">Users</h1>
      </Link>
      <Link to={routes.organizations()} className="text-center bg-base-300 p-8 shadow">
        <FontAwesomeIcon className="text-5xl" icon={faBuilding} />
        <h1 className="text-2xl">Organization</h1>
      </Link>
      <Link to={routes.practices()} className="text-center bg-base-300 p-8 shadow">
        <FontAwesomeIcon className="text-5xl" icon={faList} />
        <h1 className="text-2xl">Practices</h1>
      </Link>
    </main>
  )
}

export default AdminPage