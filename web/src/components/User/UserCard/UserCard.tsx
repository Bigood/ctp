import { useTranslation } from "react-i18next"
import md5 from 'md5'
import { Link, routes } from "@redwoodjs/router"

const UserCard = ({user, className}) => {
  const { t } = useTranslation()
  return (
    <Link to={routes.showUser({id: user.id})}>
      <div className={`flex p-4 bg-base-200 rounded-md  transition hover:bg-base-300 active:scale-95 items-start ${className}`}>
        <div className="avatar mr-2 flex-none">
          <div className="mask mask-squircle w-24">
            <img src={ user.image || `https://www.gravatar.com/avatar/${md5( user.email)}?d=identicon` } />
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
          <div>
            {user?.practices?.slice(0,3).map((practice) => (
              <div className="badge-outline badge badge-lg mr-2 mb-1 text-ellipsis overflow-hidden items-start justify-start" key={practice.id}>
                {practice.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserCard
