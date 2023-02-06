import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import UsersMapCell from 'src/components/User/UsersMapCell'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Les initiatives pédagogiques des enseignants des établissements membres UNIT</h1>
      <UsersMapCell />


    </>
  )
}

export default HomePage
