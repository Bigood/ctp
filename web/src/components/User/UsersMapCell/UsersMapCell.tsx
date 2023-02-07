import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Users from 'src/components/User/Users'
import Map, { UsersMap } from 'src/components/Map/Map'

export const QUERY = gql`
  query FindUsersForMap {
    users {
      id
      name
      surname
      organization {
        id
        name
        address
        longitude
        latitude
      }
      instance {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = (props) => {
  return <UsersMap {...props} />
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users, ...props }: CellSuccessProps<FindUsers>) => {
  return <UsersMap markers={users} {...props}/>
}
