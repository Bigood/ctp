import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Users from 'src/components/Admin/User/Users'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      createdAt
      updatedAt
      email
      name
      surname
      organization {
        id
        name
      }
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link
        to={routes.newUser()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<FindUsers>) => {
  return <Users users={users} />
}
