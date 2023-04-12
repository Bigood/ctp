import type { FindOrganizations } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Organizations from 'src/components/Admin/Organization/Organizations'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindOrganizations {
    organizations {
      id
      createdAt
      updatedAt
      authorId
      name
      address
      logo
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No organizations yet. '}
      <Link
        to={routes.newOrganization()}
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

export const Success = ({ organizations }: CellSuccessProps<FindOrganizations>) => {
  return <Organizations organizations={organizations} />
}
