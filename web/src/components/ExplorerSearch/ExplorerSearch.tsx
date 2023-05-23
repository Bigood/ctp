import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { debounce } from 'lodash'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import QueryContext from 'src/providers/context/QueryContext'
const ExplorerSearch = (props) => {
  const {setQuery} = useContext(QueryContext)
  const {t} = useTranslation()
  const _setQuery = debounce(setQuery, 1000)
  return (
    <section className={props.className}>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder={t("search")}
            className="input-bordered input w-full"
            onChange={(e) => _setQuery(e.target.value)}
          />
          <button className="btn-square btn">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ExplorerSearch
