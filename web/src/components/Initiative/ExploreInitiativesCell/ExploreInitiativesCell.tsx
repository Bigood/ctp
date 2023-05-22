import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { t } from 'i18next'
import { useEffect } from 'react'
import type { ExploreInitiativesCell } from 'types/graphql'

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
  }
}


export const QUERY = gql`
  query ExploreInitiativesCell($query: String) {
    initiativesWithQuery(query: $query) {
      id
      title
      author {
        id
        name
        surname
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


export const Success = ({ initiativesWithQuery, ...props }: CellSuccessProps<ExploreInitiativesCell>) => {
  useEffect(()=> {
    //@ts-ignore
    props.setResults(initiativesWithQuery);
  }, [initiativesWithQuery])
  return (
    <span className="white">
      {t('search-result-length', {length: initiativesWithQuery.length})}
    </span>
  )
}

export const Updating = Success