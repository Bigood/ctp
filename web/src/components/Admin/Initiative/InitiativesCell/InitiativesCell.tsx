import type { FindInitiatives } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Initiatives from 'src/components/Admin/Initiative/Initiatives'
import { SkeletonList } from 'src/components/Skeleton/Skeleton'

export const QUERY = gql`
  query FindInitiatives {
    initiatives {
      id
      cuid
      idv1
      createdAt
      updatedAt
      image
      title
      outsideUsers
      contact
      descriptionMD
      conditionsMD
      evaluationMD
      strengthsMD
      transferabilityMD
      authorId
    }
  }
`

export const Loading = () => <SkeletonList />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No initiatives yet. '}
      <Link
        to={routes.adminNewInitiative()}
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

export const Success = ({ initiatives }: CellSuccessProps<FindInitiatives>) => {
  return <Initiatives initiatives={initiatives} />
}
