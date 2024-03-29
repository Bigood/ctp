import { useAuth } from "src/auth"
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import QueryContext from 'src/providers/context/QueryContext'
import ExploreMap from 'src/components/Map/ExploreMap'
import HomeMapCell from 'src/components/User/HomeMapCell'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const [results, setResults] = useState([])
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <section className="flex items-center">
        <div className="flex-1">
          <Link to="/explore/users" >
            <QueryContext.Provider
              //@ts-ignore
              value={{
                setResults,
                results,
              }}
            >
              <ExploreMap
                className="relative h-75vh max-h-screen"
                style={{ width: '50vw', height: '75vh' }}
              >
                <HomeMapCell setResults={setResults} />
              </ExploreMap>
            </QueryContext.Provider>
          </Link>
        </div>
        <div className="flex-1 p-8">
          <h1 className="mb-8 text-4xl">
            {t('HomePage.title')}
          </h1>
          <div>
            <Link to="/explore/users" className="btn-primary btn-md btn mr-2">
              {t('user', {count:2})}
            </Link>
            <Link
              to="/explore/initiatives"
              className="btn-secondary btn-md btn mr-2"
            >
              {t('initiatives')}
            </Link>
          </div>
        </div>
      </section>
      <section className="hero bg-base-300 pb-8">
        <div className="hero-content">
          <div className="max-w-lg">
            <h1 className="mb-4 p-12 text-center text-4xl font-bold">
              Community focus
            </h1>
            <div className="columns-2">
              <p className="col-span-1">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.Provident cupiditate voluptatem et in.
                Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
                deleniti eaque aut repudiandae et a id nisi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hero bg-base-200 pb-8">
        <div className="hero-content">
          <div className="max-w-xl">
            <h1 className="mb-4 p-12 text-center text-4xl font-bold">
              Who's behind this?
            </h1>
            <div className="columns-2">
              <p className="col-span-1">
                Culpa qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptartem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi ropeior architecto
                beatae vitae dicta sunt explicabo. Nemo eniem ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia

                consequuntur magni dolores eosep quiklop ratione voluptatem
                sequi nesciunt. Neque porro quisquam est, quepi dolorem ipsum
                quia dolor srit amet, consectetur adipisci velit, seid quia non
                numquam eiuris modi tempora incidunt ut labore et dolore magnam
                aliquam quaerat iope voluptatem. Lorem ipsum dolor sit amet,
                consectetur adipisifwcing elit, sed do eiusmod tempor incididunt
                ut labore et dolore roipi magna aliqua. Ut enim ad minim
                veeniam, quis nostruklad exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in tufpoy voluptate velit esse cillum dolore eu
                fugiat nulla parieratur. Excepteur sint occaecat cupidatat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hero bg-base-100">
        <div className="hero-content">
          <div className="card w-96 bg-base-200">
            <div className="card-body items-center text-center">
              <h1 className="card-title">Join the community</h1>
              <p>You have to be in a partner organization to join. Ready?</p>
              <div className="card-actions">
                <Link to={routes.auth()}><div className="btn-primary btn">Join</div></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
