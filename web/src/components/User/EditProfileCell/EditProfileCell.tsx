import type { EditUserById, UpdateUserInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EditForm from 'src/components/User/UserForm/EditForm'

export const QUERY = gql`
  query EditProfile($id: Int!) {
    user: user(id: $id) {
      id
      createdAt
      updatedAt
      email
      image
      name
      surname
      phone
      showEmail
      showPhone
      job
      department
      shortPresentation
      presentation
      subjects
      organization {
        id
        name
        authorId
      }
      practices {
        id
      }
      instance {
        id
        host
      }
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      email
      image
      name
      surname
      phone
      showEmail
      showPhone
      job
      department
      shortPresentation
      presentation
      subjects
      organizationId
      practices {
        id
      }
      instance {
        id
        host
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserById>) => {
  const [updateUser, { loading, error }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User updated')
        navigate(routes.profile())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserInput,
    id: EditUserById['user']['id']
  ) => {
    updateUser({ variables: { id, input } })
  }

  return (
    <EditForm user={user} onSave={onSave} error={error} loading={loading} />
  )
}
