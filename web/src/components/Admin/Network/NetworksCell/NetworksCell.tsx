import type { FindNetworks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Networks from 'src/components/Admin/Network/Networks'
import { SkeletonList } from "src/components/Skeleton/Skeleton"

export const QUERY = gql`
  query FindNetworks {
    networks {
      id
      name
      url
      logo
      authorId
    }
  }
`

export const Loading = () => <SkeletonList/>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No networks yet. '}
      <Link
        to={routes.adminNewNetwork()}
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

export const Success = ({ networks }: CellSuccessProps<FindNetworks>) => {
  return <Networks networks={networks} />
}
