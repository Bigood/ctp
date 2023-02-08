import Map from 'src/components/Map/Map'
import type { FindProfileQuery } from 'types/graphql'
const Profile = ({ user }: FindProfileQuery) => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-3">
      <main className="col-span-4">
        <section className="bg-zinc-800">
          <div className="flex bg-zinc-900 p-4">
            <div className="avatar mr-2 flex-none">
              <div className="w-24 rounded-full">
                <img src={user.image || '//placekitten.com/200/200'} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl">
                {user.surname} {user.name}
              </h1>
              <h2 className="text-lg">
                {user.job} at {user.organization?.name} - {user.department}
              </h2>
            </div>
          </div>
          <div className="p-4">
            <p className="italic">{user.shortPresentation}</p>
          </div>
          <div className="flex gap-2 p-4">
            <div className="btn-primary btn gap-2">Contact</div>
            <div className="btn-secondary btn gap-2">
              Like
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </section>
        <section className="mt-4 bg-zinc-800 p-4">
          {user.presentation && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">Presentation</h2>
              <p className="whitespace-pre-line">{user.presentation}</p>
            </div>
          )}

          {user.practices && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">Practices</h2>
              <div>
                {user.practices.map((practice) => (
                  <div className="badge-outline badge mr-2" key={practice.id}>
                    {practice.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.subjects && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">Subjects</h2>
              <p className="whitespace-pre-line">{user.subjects}</p>
            </div>
          )}
        </section>
      </main>
      <aside className="col-span-2">
        <section className="mb-2">
          <h1 className="mb-2 text-xl">About this user</h1>
          <p className="text-sm">Updated at {user.updatedAt}</p>
          <p className="text-sm">XX views</p>
          <p className="text-sm">XX likes</p>
        </section>
        <section>
          <h1 className="mb-2 text-xl">Organization</h1>
          <img
            src={user.organization.logo || 'https://placekitten.com/500/400'}
            className="mb-2 aspect-auto"
          />
          <Map
            markers={[user.organization]}
            zoomLevel={7}
            centerOnMarkers={true}
            className="mb-2 h-32"
          />
        </section>
        <section>
          <h1 className="mb-2 text-xl">Similar users</h1>
        </section>
      </aside>
    </div>
  )
}

export default Profile
