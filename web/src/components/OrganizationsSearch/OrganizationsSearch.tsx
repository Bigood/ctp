import { SelectField } from '@redwoodjs/forms'
import { t } from "i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import OrganizationsSelectCell from "../Organization/OrganizationsSelectCell"
import { useState } from "react"
import { debounce } from "lodash"

const OrganizationsSearch = (props) => {
  const { defaultValue } = props;
  const [query, setQuery] = useState(defaultValue?.name || "")
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [organization, setOrganization] = useState(defaultValue)

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const _handleSearch = debounce(handleSearch, 400)
  const onSelect = (organization) => {
    setOrganization(organization);
    setDropdownVisible(false);
  }
  return (
    <div className="form-control relative">
      <div className="flex">
        <div className="relative grow">
          <input type="hidden" value={organization?.id} name="organization" />
          <input
            type="text"
            className="input-bordered input w-full pr-12"
            placeholder={t('form.organization-search')}
            value={!dropdownVisible && organization ? organization.name : undefined}
            onChange={_handleSearch}
            onFocus={() => setDropdownVisible(true)}
            // onBlur={() => setDropdownVisible(false)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className={`absolute top-1/2 right-3 -translate-y-1/2 transform text-base-content transition-all	ease-out ${
              dropdownVisible
                ? '-translate-x-2 opacity-100'
                : '-translate-x-4 opacity-0'
            }`}
          />
        </div>
        <div className="btn-primary btn btn-circle grow-0 ml-2">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <ul
        className={`absolute mt-2 max-h-56 overflow-y-auto transition-all	ease-out ${
          dropdownVisible
            ? 'z-10 translate-y-10 opacity-100'
            : '-z-10 translate-y-6 opacity-0'
        }`}
      >
        <OrganizationsSelectCell
          query={query}
          limit={20}
          defaultValue={defaultValue}
          onSelect={onSelect}
        />
      </ul>
    </div>
  )
}

export default OrganizationsSearch
