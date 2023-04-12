import type { FindSubjects } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Subjects from 'src/components/Admin/Subject/Subjects'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindSubjects {
    subjects {
      id
      name
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No subjects yet. '}
      <Link
        to={routes.adminNewSubject()}
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

export const Success = ({ subjects }: CellSuccessProps<FindSubjects>) => {
  return <Subjects subjects={subjects} />
}
