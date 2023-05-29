import { useRegister } from '@redwoodjs/forms'
import { t } from "i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import OrganizationsSelectCell from "../Organization/OrganizationsSelectCell"
import { useState } from "react"
import { debounce } from "lodash"
import OrganizationModalCell from '../OrganizationModalCell'
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { useAuth } from "src/auth"

const OrganizationsSearch = (props) => {
  //https://stackoverflow.com/a/68623501/1437016
  const register = useRegister({name:"organizationId", validation: {required: true, valueAsNumber: true} })

  const { defaultValue } = props;
  const [query, setQuery] = useState(defaultValue?.name || "")
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [organization, setOrganization] = useState(defaultValue)
  const { currentUser, hasRole } = useAuth()

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
          <input {...register} type="number" {...(organization ? {value:parseInt(organization?.id)} : {})} />
          <input
            type="text"
            className="input-bordered input w-full pr-12"
            placeholder={t('form.organization-search')}
            value={
              !dropdownVisible && organization ? organization.name : undefined
            }
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
        {!dropdownVisible && organization &&
          (organization?.authorId == currentUser.id || hasRole('admin')) && (
            <div
              className="btn-secondary btn-circle btn ml-2 grow-0"
              onClick={() => setModalVisible(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>
          )}
        {(!organization || dropdownVisible) && (
          <div
            className="btn-primary btn-circle btn ml-2 grow-0"
            onClick={() => {
              setOrganization(null)
              setModalVisible(true)
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
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

      <OrganizationModalCell
        visible={modalVisible}
        setVisible={setModalVisible}
        id={organization?.id || 0}
      />
    </div>
  )
}

export default OrganizationsSearch
