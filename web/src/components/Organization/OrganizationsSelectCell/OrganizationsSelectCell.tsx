import type { FindOrganizations } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { SelectField } from '@redwoodjs/forms'

export const QUERY = gql`
  query FindOrganizationsQuery {
    organizations {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindOrganizations>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface OrganizationsSelect extends FindOrganizations {
  defaultValue: any;
}

export const Success = ({
  organizations,
  ...rest
}: CellSuccessProps<OrganizationsSelect>) => {
  return <OrganizationsSelect organizations={organizations} {...rest}/>
}


const OrganizationsSelect = (props) => {
  const { organizations, defaultValue } = props;
  return (
    <SelectField
      name="organizationId"
      defaultValue={defaultValue}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    // validation={{ required: true }}
    >
      <option>Choisir un établissement</option>
      {organizations?.map(organization => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
    </SelectField>
  )
}