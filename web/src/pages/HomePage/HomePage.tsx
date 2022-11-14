import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UsersCell from 'src/components/User/UsersCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Les initiatives pédagogiques des enseignants des établissements membres UNIT</h1>
      <UsersCell />
    </>
  )
}

export default HomePage
