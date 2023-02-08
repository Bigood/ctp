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
          <h1 className="mb-8 text-4xl">
            Discover initiatives and users of this community
          </h1>
          <div>
            <Link to="/explore/users" className="btn-primary btn-md btn mr-2">
              Users
            </Link>
            <Link
              to="/explore/initiatives"
              className="btn-secondary btn-md btn mr-2"
            >
              Initiatives
            </Link>
          </div>
        </div>
      </section>
      <section className="hero bg-base-200">
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
      <section className="hero bg-base-100">
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
                <img
                  src="https://placekitten.com/300/220"
                  className="mb-4 mt-4"
                />
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
      <section className="hero bg-base-200">
        <div className="hero-content">
          <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h1 className="card-title">Join the community</h1>
              <p>
                You have to be in a partner organization to join. Ready?
              </p>
              <div className="card-actions">
                <button className="btn-primary btn">Join</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
