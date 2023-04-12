import type { FindCompetences } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Competences from 'src/components/Admin/Competence/Competences'
import { SkeletonList } from "src/components/Skeleton/Skeleton"

export const QUERY = gql`
  query FindCompetences {
    competences {
      id
      name
      url
      type
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No competences yet. '}
      <Link
        to={routes.adminNewCompetence()}
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

export const Success = ({ competences }: CellSuccessProps<FindCompetences>) => {
  return <Competences competences={competences} />
}
