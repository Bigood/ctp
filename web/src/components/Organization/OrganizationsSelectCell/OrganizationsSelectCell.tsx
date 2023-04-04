import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { t } from "i18next"
import type { FindOrganizations } from 'types/graphql'

export const QUERY = gql`
  query FindOrganizationsQuery($query: String, $limit: Int) {
    organizations(query: $query, limit: $limit) {
      id
      name
      address
    }
  }
`

export const Loading = () => (
  <li className="border-b border-base-200 bg-base-100 p-2">
    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
  </li>
)

export const Empty = () => (
  <li className="cursor-pointer border-b border-base-200 bg-base-100 p-2 hover:text-primary">
    {t('form.organization-empty')}
  </li>
)

export const Failure = ({ error }: CellFailureProps<FindOrganizations>) => (
  <li className=" border-b border-base-200 bg-base-100 p-2 italic">
    {t('fetch-error')}
  </li>
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
  const { organizations, onSelect } = props
  return (
    <>
      {organizations.map((organization) => (
        <li
          key={organization.id}
          className="border-b border-base-200 p-2 hover:text-primary bg-base-100 cursor-pointer"
          onClick={() => onSelect(organization)}
        >
          <h3 className="text-sm font-medium">{organization.name}</h3>
          <p className="text-xs">{organization.address}</p>
        </li>
      ))}
    </>
  )
}