import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { t } from 'i18next'
import { useEffect } from 'react'
import type { ExploreUsersQuery } from 'types/graphql'

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
      practices {
        id
        name
      }
    }
  }
`

export const Loading = (props) => {
  return (
    <>
      <span>Loading…</span>
    </>
  )
}


export const Empty = (props) => {
  useEffect(() => {
    props.setResults([])
  }, [])
  return ( <span>No results to show. Try something else?</span> )
}

export const Failure = ({ error }: CellFailureProps) => {
  toast.error("An error occured with with your search, please try again later.")
  console.error(error);
  return (<></>);
}


export const Success = ({ usersWithQuery, ...props }: CellSuccessProps<ExploreUsersQuery>) => {
  useEffect(()=> {
    //@ts-ignore
    props.setResults(usersWithQuery);
  }, [usersWithQuery])
  return (
    <span className="white">
      {t('search-result-length', {length: usersWithQuery.length})}
    </span>
  )
}

export const Updating = Success