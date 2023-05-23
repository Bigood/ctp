import type { FindCompleteInitiativeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Initiative from 'src/components/Admin/Initiative/Initiative'

export const QUERY = gql`
  query FindCompleteInitiativeById($id: Int!) {
    initiative: initiative(id: $id) {
      id
      cuid
      idv1
      createdAt
      updatedAt
      image
      title
      outsideUsers
      contact

      descriptionMD
      conditionsMD
      evaluationMD
      strengthsMD
      transferabilityMD

      resources {
        id
        filename
        url
        name
        description
      }

      tags {
        id
        name
      }

      practices {
        id
        name
      }
      subjects {
        id
        name
      }
      levels {
        id
        name
      }
      competences {
        id
        type
        name
      }
      sponsors {
        id
        name
        url
        logo
      }
      author {
        id
        name
        surname
        email
        job
        organization {
          id
          name
          longitude
          latitude
          logo
        }
      }

      users {
        id
        name
        surname
        organization {
          id
          name
        }
      }

      networks {
        id
        name
        logo
        url
      }
    }
    similarInitiatives(id: $id) {
      id
      image
      title

      tags {
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Initiative not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ initiative, similarInitiatives }: CellSuccessProps<FindCompleteInitiativeById>) => {
  return <Initiative initiative={initiative} similarInitiatives={similarInitiatives} />
}
