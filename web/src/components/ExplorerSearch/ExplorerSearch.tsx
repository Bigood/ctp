import { debounce } from 'lodash'
import { useContext } from 'react'
import QueryContext from 'src/providers/context/QueryContext'
const ExplorerSearch = () => {
  const {setQuery} = useContext(QueryContext)
  const _setQuery = debounce(setQuery, 1000)
  return (
    <section className="absolute left-2 top-2 z-10">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input-bordered input"
            onChange={(e) => _setQuery(e.target.value)}
          />
          <button className="btn-square btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ExplorerSearch
