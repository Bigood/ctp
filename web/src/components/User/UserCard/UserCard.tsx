import { useTranslation } from "react-i18next"
import md5 from 'md5'

const UserCard = ({user}) => {
  const { t } = useTranslation()
  return (
    <div className="flex p-4 bg-base-200 rounded-md">
      <div className="avatar mr-2 flex-none">
        <div className="mask mask-squircle w-24">
          <img src={ user.image || `https://www.gravatar.com/avatar/${md5( user.email || "test" )}?d=identicon` } />
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
  )
}

export default UserCard
