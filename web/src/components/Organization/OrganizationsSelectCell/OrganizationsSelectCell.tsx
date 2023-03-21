import type { FindOrganizations } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { SelectField } from '@redwoodjs/forms'
import { t } from "i18next"

export const QUERY = gql`
  query FindOrganizationsQuery {
    organizations {
      id
      name
    }
  }
`

export const Loading = () => <div className="animate-pulse input ">{t('loading')}</div>

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
    <div className="flex flex-auto">
      <SelectField
        name="organizationId"
        defaultValue={defaultValue}
        className="select-bordered select w-full"
        errorClassName="select w-full select-error"
        validation={{ valueAsNumber: true }}
        // validation={{ required: true }}
      >
        <option disabled selected>
          {t('form.organization-placeholder')}
        </option>
        {organizations?.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </SelectField>
      <div className="ml-2">
        <div className="btn btn-primary btn-circle">+</div>
      </div>
    </div>
  )
}