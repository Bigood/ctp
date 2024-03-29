import type { FindUserById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import User from 'src/components/Admin/User/User'

export const QUERY = gql`
  query FindUserById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<FindUserById>) => {
  return <User user={user} />
}
