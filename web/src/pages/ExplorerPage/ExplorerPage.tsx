import { useParams } from "@redwoodjs/router";
import { useRouterState } from "@redwoodjs/router/dist/router-context";
import { MetaTags } from '@redwoodjs/web';
import { useState } from 'react';
import ExplorerSearch from 'src/components/ExplorerSearch/ExplorerSearch';
import ExplorerSearchResults from 'src/components/ExplorerSearchResults/ExplorerSearchResults';
import ExploreMap from 'src/components/Map/ExploreMap';
import ExploreUsersCell from 'src/components/User/ExploreUsersCell';
import ExploreInitiativesCell from 'src/components/Initiative/ExploreInitiativesCell';
import QueryContext from 'src/providers/context/QueryContext';

const ALLOWED_QUERY_TYPES = ["users", "initiatives"]

const ExplorerPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState([]);
  const { type } = useParams();
  if(ALLOWED_QUERY_TYPES.indexOf(type) == -1)
    return <NotFoundPage />

  return (
    <div className="relative">
      <MetaTags title="Explorer" description="Explorer page" />
      <QueryContext.Provider
        value={{ query, setQuery, setResults, results, setFocused, focused }}
      >
        <ExploreMap
          className="relative h-screen w-screen"
          style={{ width: '100vw', height: '100vh' }}
          pathToCoordinates={type == "users" ? "organization" : "author.organization"}
        >
          <div className="absolute left-2 top-2 ">
            <ExplorerSearch className="z-10" />
            {type == "users" && (
              <ExploreUsersCell query={query} setResults={setResults} />
            )}
            {type == "initiatives" && (
              <ExploreInitiativesCell query={query} setResults={setResults} />
              )}
            <ExplorerSearchResults />
          </div>
        </ExploreMap>
      </QueryContext.Provider>
    </div>
  )
}

export default ExplorerPage

