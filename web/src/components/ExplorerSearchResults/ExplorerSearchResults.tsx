import { Link, routes } from "@redwoodjs/router"
import _ from "lodash"
import { useContext } from "react"
import QueryContext from "src/providers/context/QueryContext"

const ExplorerSearchResults = (props) => {
  const { query, results, focused } = useContext(QueryContext)

  if(!results || !focused)
    return <></>
  return (
    <section className="max-h-screen overflow-scroll" {...props}>
      {_.intersectionWith(results, focused, (res, feat) => (res.id == (feat.id || feat.properties.id))).map((result) => (
        (result.__typename == "User" ?
          <ExplorerSearchResultUser user={result} key={result.id} />
          :
          <ExplorerSearchResultInitiative initiative={result} key={result.id} />
        )
      ))}
    </section>
  )
}

export default ExplorerSearchResults

const ExplorerSearchResultUser = ({user}) => {
  return (
    <Link
      to={routes.showUser({ id: user.id })}
      title={'Show user ' + user.id + ' detail'}
    >
      <div className="btn-block btn mb-1 flex overflow-hidden p-0">
        <div className="avatar relative mr-2 w-10 h-10 flex-none">
          <div className="absolute -left-3 -top-1 h-12 w-12 rounded-full bg-slate-300">
            <img src={user.image || 'https://gravatar.com/avatar'} />
          </div>
        </div>
        <div className="flex-1 p-1 text-left">
          <h2 className="text-sm">
            {user.surname} {user.name}
          </h2>
          <h3 className="text-xs">{user.organization?.name}</h3>
        </div>
      </div>
    </Link>
  )
}

const ExplorerSearchResultInitiative = ({initiative}) => {
  return (
    <Link
      to={routes.showInitiative({ id: initiative.id })}
      title={'Show initiative ' + initiative.id + ' detail'}
    >
      <div className="btn-block btn mb-1 flex overflow-hidden p-0">
        <div className="flex-1 p-1 text-left">
          <h2 className="text-sm">
            {initiative.title}
          </h2>
          <h3 className="text-xs">{initiative.author?.name} {initiative.author?.surname}</h3>
          {/* <h3 className="text-xs">{initiative.author?.organization?.name}</h3> */}
        </div>
      </div>
    </Link>
  )
}