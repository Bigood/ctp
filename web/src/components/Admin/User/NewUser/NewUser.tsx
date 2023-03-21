import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useTranslation } from 'react-i18next'

import SignupForm from 'src/components/User/UserForm/SignupForm'

import type { CreateUserInput } from 'types/graphql'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const NewUser = ({values}) => {
  const { t } = useTranslation();
  const [createUser, { loading, error }] = useMutation(
    CREATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User created')
        navigate(routes.users())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserInput) => {
    createUser({ variables: { input } })
  }

  return (
    <div className="text-center">
      <Link to={routes.home()} className="btn-ghost btn text-xl normal-case">
        {t("site-title")}
      </Link>
      <div className="">
        <SignupForm
          onSave={onSave}
          loading={loading}
          error={error}
          user={values}
        />
      </div>
    </div>
  )
}

export default NewUser
