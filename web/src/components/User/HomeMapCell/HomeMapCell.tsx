import type { FindUsers } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useEffect } from 'react'

export const QUERY = gql`
  query Users {
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
  return <div>Empty</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users, ...props }: CellSuccessProps<FindUsers>) => {
  useEffect(() => {
    props.setResults(users)
  }, [users])
  return <div>Ok</div>
}
