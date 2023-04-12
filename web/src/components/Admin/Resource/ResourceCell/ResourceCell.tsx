import type { FindResourceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Resource from 'src/components/Admin/Resource/Resource'

export const QUERY = gql`
  query FindResourceById($id: Int!) {
    resource: resource(id: $id) {
      id
      name
      url
      filename
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Resource not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ resource }: CellSuccessProps<FindResourceById>) => {
  return <Resource resource={resource} />
}
