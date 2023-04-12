import type { FindPractices } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Practices from 'src/components/Admin/Practice/Practices'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindPractices {
    practices {
      id
      createdAt
      updatedAt
      name
      synonym
      description
      shortDescription
      sources
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No practices yet. '}
      <Link
        to={routes.newPractice()}
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

export const Success = ({ practices }: CellSuccessProps<FindPractices>) => {
  return <Practices practices={practices} />
}
