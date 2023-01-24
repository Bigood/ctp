import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import UsersCell from 'src/components/User/UsersCell'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Les initiatives pédagogiques des enseignants des établissements membres UNIT</h1>
      {!isAuthenticated ? <Auth /> : (
        <div>
          <UsersCell />
        </div>
      )}


    </>
  )
}

export default HomePage
