import type { FindCompetenceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Competence from 'src/components/Admin/Competence/Competence'

export const QUERY = gql`
  query FindCompetenceById($id: Int!) {
    competence: competence(id: $id) {
      id
      name
      url
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Competence not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ competence }: CellSuccessProps<FindCompetenceById>) => {
  return <Competence competence={competence} />
}
