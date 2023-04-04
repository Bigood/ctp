import { Redirect, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'


export const QUERY = gql`
  query UserExistsQuery($id: Int!) {
    user: user(id: $id) {
      id
    }
  }
`

export const Loading = () => <></>

export const Empty = () => <Redirect to={routes.signup()} />

export const Failure = ({ error }: CellFailureProps) => (
  <></>
)

export const Success = ({ userExists }: CellSuccessProps) => {
  return <Redirect to={routes.profile()} />
}
