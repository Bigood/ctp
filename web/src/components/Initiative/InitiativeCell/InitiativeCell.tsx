import type { FindInitiativeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Initiative from 'src/components/Admin/Initiative/Initiative'

export const QUERY = gql`
  query FindInitiativeById($id: Int!) {
    initiative: initiative(id: $id) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Initiative not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ initiative }: CellSuccessProps<FindInitiativeById>) => {
  return <Initiative initiative={initiative} />
}
