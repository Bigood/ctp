import type { FindLevels } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Levels from 'src/components/Admin/Level/Levels'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindLevels {
    levels {
      id
      name
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No levels yet. '}
      <Link
        to={routes.adminNewLevel()}
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

export const Success = ({ levels }: CellSuccessProps<FindLevels>) => {
  return <Levels levels={levels} />
}
