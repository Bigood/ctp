import { Link, routes } from "@redwoodjs/router"
import _ from "lodash"
import { useContext } from "react"
import QueryContext from "src/providers/context/QueryContext"
import UserCard from "../User/UserCard/UserCard"
import InitiativeCard from "../Initiative/InitiativeCard/InitiativeCard"

const ExplorerSearchResults = (props) => {
  const { query, results, focused } = useContext(QueryContext)

  if(!results || !focused)
    return <></>
  return (
    <section className="max-h-screen overflow-scroll" {...props}>
      {_.intersectionWith(results, focused, (res, feat) => (res.id == (feat.id || feat.properties.id))).map((result) => (
        (result.__typename == "User" ?
          <UserCard user={result} key={result.id} className="w-full my-2"/>
          :
          <InitiativeCard initiative={result} key={result.id} className="w-full my-2"/>
        )
      ))}
    </section>
  )
}

export default ExplorerSearchResults