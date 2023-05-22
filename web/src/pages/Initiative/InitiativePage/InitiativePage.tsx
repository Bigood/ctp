import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import InitiativeCell from "src/components/Initiative/InitiativeCell"

const InitiativePage = ({id}) => {
  return (
    <>
      <MetaTags title="Initiative" description="Initiative page" />
      <InitiativeCell id={id} />
    </>
  )
}

export default InitiativePage
