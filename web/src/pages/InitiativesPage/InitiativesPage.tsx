import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InitiativesPage = () => {
  return (
    <>
      <MetaTags title="Initiatives" description="Initiatives page" />

      <h1>InitiativesPage</h1>
      <p>
        Find me in <code>./web/src/pages/InitiativesPage/InitiativesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>initiatives</code>, link to me with `
        <Link to={routes.initiatives()}>Initiatives</Link>`
      </p>
    </>
  )
}

export default InitiativesPage
