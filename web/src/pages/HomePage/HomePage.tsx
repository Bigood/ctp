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

      <section className="flex items-center">
        <div className="flex-1">
          <UsersMapCell className="relative h-75vh max-h-screen" />
        </div>
        <div className="flex-1 p-2">
          <h1>
            Les initiatives pédagogiques des enseignants des établissements
            membres UNIT
          </h1>
        </div>
      </section>
    </>
  )
}

export default HomePage
