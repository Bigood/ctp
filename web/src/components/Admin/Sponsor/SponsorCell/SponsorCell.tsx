import type { FindSponsorById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Sponsor from 'src/components/Admin/Sponsor/Sponsor'

export const QUERY = gql`
  query FindSponsorById($id: Int!) {
    sponsor: sponsor(id: $id) {
      id
      name
      url
      logo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Sponsor not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ sponsor }: CellSuccessProps<FindSponsorById>) => {
  return <Sponsor sponsor={sponsor} />
}
