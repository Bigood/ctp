import type { FindOrganizationById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Organization from 'src/components/Admin/Organization/Organization'

export const QUERY = gql`
  query FindOrganizationById($id: Int!) {
    organization: organization(id: $id) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Organization not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organization }: CellSuccessProps<FindOrganizationById>) => {
  return <Organization organization={organization} />
}
