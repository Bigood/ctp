import { useTranslation } from "react-i18next"
import Map from 'src/components/Map/Map'
import type { FindProfileQuery } from 'types/graphql'
import md5 from 'md5'
import { useAuth } from "@redwoodjs/auth"
import { Link } from "@redwoodjs/router"
import { routes } from "@redwoodjs/router"

const Profile = ({ user }: FindProfileQuery) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto grid min-h-screen grid-cols-6 gap-3">
      <main className="col-span-4 my-4">
        <section className="w-full rounded-md bg-base-100 text-base-content shadow-xl">
          <div className="flex p-4">
            <div className="avatar mr-2 flex-none">
              <div className="mask mask-squircle w-24">
                <img
                  src={
                    user.image ||
                    `https://www.gravatar.com/avatar/${md5(
                      user.email
                    )}?d=identicon`
                  }
                />
              </div>
            </div>
            <div className="flex-1 lg:ml-2">
              <h1 className="text-2xl">
                {user.surname} {user.name}
              </h1>
              <h2 className="text-lg">
                {user.job &&
                  t(`form.${user.job.toLowerCase()}`) + ` ${t('at')} `}{' '}
                {user.organization?.name}
                {user.department && ` - ${user.department}`}
              </h2>
            </div>
          </div>
          <div className="p-4">
            <p className="italic">{user.shortPresentation}</p>
          </div>
          <div className="flex gap-2 p-4">
            <div className="btn-primary btn gap-2">{t('contact')}</div>
            <div className="btn-secondary btn gap-2">
              {t('like')}
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
        <section className="mt-4 rounded-md bg-base-100  p-4 shadow-xl">
          {user.practices && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">{t('practices')}</h2>
              <div>
                {user.practices.map((practice) => (
                  <div className="badge-outline badge mr-2" key={practice.id}>
                    {practice.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="mt-4 rounded-md bg-base-100  p-4 shadow-xl">
          {user.presentation && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">{t('form.presentation')}</h2>
              <p className="whitespace-pre-line">{user.presentation}</p>
            </div>
          )}
          {user.subjects && (
            <div className="mb-4">
              <h2 className="mb-2 text-xl">{t('subjects')}</h2>
              <p className="whitespace-pre-line">{user.subjects}</p>
            </div>
          )}
        </section>
      </main>
      <aside className="col-span-2 my-4  rounded-md bg-base-100 p-4 shadow-xl">
        {isAuthenticated && (
          <section className="mb-2">
            <h1 className="mb-2 text-xl">{t('my-profile')}</h1>
            <Link to={routes.editProfile()}>
              <div className="btn-secondary btn">{t('edit-profile')}</div>
            </Link>
          </section>
        )}
        <section className="mb-2">
          <h1 className="mb-2 text-xl">{t('about-this-user')}</h1>
          <p className="text-sm">
            {t('updated-at')} {user.updatedAt}
          </p>
          <p className="text-sm">XX {t('views')}</p>
          <p className="text-sm">XX {t('likes')}</p>
        </section>
        <section>
          <h1 className="mb-2 text-xl">{t('form.organization')}</h1>
          {user.organization.name}
          {user.organization.logo && (
            <img src={user.organization.logo} className="mb-2 aspect-auto" />
          )}
          <Map
            markers={[user.organization]}
            zoomLevel={7}
            centerOnMarkers={true}
            className="mb-2 h-32"
          />
        </section>
        <section>
          <h1 className="mb-2 text-xl">{t('similar-users')}</h1>
        </section>
      </aside>
    </div>
  )
}

export default Profile
