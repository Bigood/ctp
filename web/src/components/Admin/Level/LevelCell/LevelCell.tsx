import type { FindLevelById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Level from 'src/components/Admin/Level/Level'

export const QUERY = gql`
  query FindLevelById($id: Int!) {
    level: level(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Level not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ level }: CellSuccessProps<FindLevelById>) => {
  return <Level level={level} />
}
