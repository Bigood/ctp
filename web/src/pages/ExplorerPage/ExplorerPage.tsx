import { MetaTags } from '@redwoodjs/web';
import { useState } from 'react';
import ExplorerSearch from 'src/components/ExplorerSearch/ExplorerSearch';
import ExplorerSearchResults from 'src/components/ExplorerSearchResults/ExplorerSearchResults';
import ExploreMap from 'src/components/Map/ExploreMap';
import ExploreUsersCell from 'src/components/User/ExploreUsersCell';
import QueryContext from 'src/providers/context/QueryContext';

const ExplorerPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState([]);

  return (
    <div className="relative">
      <MetaTags title="Explorer" description="Explorer page" />
      <QueryContext.Provider
        value={{ query, setQuery, setResults, results, setFocused, focused }}
      >
        <ExploreMap
          className="relative h-screen w-screen"
          style={{ width: '100vw', height: '100vh' }}
        >
          <div className="absolute left-2 top-2 ">
            <ExplorerSearch className="z-10" />
            <ExploreUsersCell query={query} setResults={setResults} />
            <ExplorerSearchResults />
          </div>
        </ExploreMap>
      </QueryContext.Provider>
    </div>
  )
}

export default ExplorerPage

