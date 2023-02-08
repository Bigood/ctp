import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import ExplorerSearch from 'src/components/ExplorerSearch/ExplorerSearch';
import ExploreUsersCell from 'src/components/User/ExploreUsersCell'
import QueryContext from 'src/providers/context/QueryContext';

const ExplorerPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative">
      <MetaTags title="Explorer" description="Explorer page" />
      <QueryContext.Provider value={{query, setQuery}}>
        <ExploreUsersCell className="relative h-screen w-screen" query={query} />
      </QueryContext.Provider>
    </div>
  )
}

export default ExplorerPage

