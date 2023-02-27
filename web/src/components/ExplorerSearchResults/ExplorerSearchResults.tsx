import { Link, routes } from "@redwoodjs/router"
import _ from "lodash"
import { useContext } from "react"
import QueryContext from "src/providers/context/QueryContext"

const ExplorerSearchResults = (props) => {
  const { query, results, focused } = useContext(QueryContext)

  if(!results || !focused)
    return <></>

  return (
    <section className="bg-slate-800" {...props}>
      {_.intersectionWith(results, focused, (res, feat) => (res.id == (feat.id || feat.properties.id))).map((user) => (
        <ExplorerSearchResult user={user} key={user.id} />
      ))}
    </section>
  )
}

export default ExplorerSearchResults

const ExplorerSearchResult = ({user}) => {
  return (
    <Link
      to={routes.showUser({ id: user.id })}
      title={'Show user ' + user.id + ' detail'}
    >
      <div className="btn-block btn flex p-1">
        <div className="avatar mr-2 flex-none">
          <div className="h-8 w-8 rounded-full">
            <img src={user.image || 'https://gravatar.com/avatar'} />
          </div>
        </div>
        <div className="flex-1">
          <h2>
            {user.surname} {user.name}
          </h2>
          <h3>{user.organization?.name}</h3>
        </div>
      </div>
    </Link>
  )
}