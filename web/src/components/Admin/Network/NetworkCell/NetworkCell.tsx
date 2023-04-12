import type { FindNetworkById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Network from 'src/components/Admin/Network/Network'

export const QUERY = gql`
  query FindNetworkById($id: Int!) {
    network: network(id: $id) {
      id
      name
      url
      logo
      authorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Network not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ network }: CellSuccessProps<FindNetworkById>) => {
  return <Network network={network} />
}
