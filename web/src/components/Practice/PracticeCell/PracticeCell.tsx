import type { FindPracticeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Practice from 'src/components/Practice/Practice'

export const QUERY = gql`
  query FindPracticeById($id: Int!) {
    practice: practice(id: $id) {
      id
      cuid
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Practice not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ practice }: CellSuccessProps<FindPracticeById>) => {
  return <Practice practice={practice} />
}
