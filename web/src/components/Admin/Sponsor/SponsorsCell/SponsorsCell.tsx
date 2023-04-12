import type { FindSponsors } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Sponsors from 'src/components/Admin/Sponsor/Sponsors'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindSponsors {
    sponsors {
      id
      name
      url
      logo
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No sponsors yet. '}
      <Link
        to={routes.adminNewSponsor()}
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

export const Success = ({ sponsors }: CellSuccessProps<FindSponsors>) => {
  return <Sponsors sponsors={sponsors} />
}
