import type { FindProfileQuery, FindProfileQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Profile from '../Profile'

export const QUERY = gql`
  query FindProfileQuery($id: Int!) {
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
        logo
        latitude
        longitude
      }
      practices {
        id
        name
      }
      instance {
        id
        host
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindProfileQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindProfileQuery, FindProfileQueryVariables>) => {
  return <Profile user={user}/>
}
