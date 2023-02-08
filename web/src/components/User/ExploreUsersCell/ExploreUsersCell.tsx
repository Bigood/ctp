import type { ExploreUsersQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { UsersMap } from 'src/components/Map/Map'
import ExplorerSearch from 'src/components/ExplorerSearch/ExplorerSearch'
import ExplorerSearchResults from 'src/components/ExplorerSearchResults/ExplorerSearchResults'

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
  }
}


export const QUERY = gql`
  query ExploreUsersQuery($query: String) {
    usersWithQuery(query: $query) {
      id
      name
      surname
      image
      organization {
        id
        name
        address
        longitude
        latitude
      }
      instance {
        id
      }
    }
  }
`

// export const Loading = () => <div>Loading...</div>


export const Empty = (props) => {
  return (
    <>
      <ExplorerSearch />
      <UsersMap {...props} />
    </>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ usersWithQuery, ...props }: CellSuccessProps<ExploreUsersQuery>) => {
  return <>
    <ExplorerSearch />
    <ExplorerSearchResults users={usersWithQuery} />
    <UsersMap markers={usersWithQuery} {...props} />
  </>
}

export const Updating = Success