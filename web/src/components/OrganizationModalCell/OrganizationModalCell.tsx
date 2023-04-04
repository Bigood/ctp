import type { FindOrganizationModalQuery, FindOrganizationModalQueryVariables, UpdateOrganizationInput } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from "@redwoodjs/web/dist/toast"
import OrganizationModal from "../OrganizationModal/OrganizationModal"
import { createPortal } from "react-dom"

export const QUERY = gql`
  query FindOrganizationModalQuery($id: Int!) {
    organization(id: $id) {
      id
      name
      address
      logo
      longitude
      latitude
      author {
        id
        name
        surname
      }
      createdAt
      updatedAt
    }
  }
`

const UPSERT_ORGANIZATION_MUTATION = gql`
  mutation UpsertOrganizationMutation($id: Int!, $input: UpdateOrganizationInput!) {
    upsertOrganization(id: $id, input: $input) {
      id
      name
      address
      logo
      longitude
      latitude
      author {
        id
        name
        surname
      }
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindOrganizationModalQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  organization,
  visible,
  setVisible
}: CellSuccessProps<FindOrganizationModalQuery, FindOrganizationModalQueryVariables>) => {

  const [upsertOrganization, { loading, error, data }] = useMutation(UPSERT_ORGANIZATION_MUTATION, {

    onCompleted: () => {
      toast.success('Organization upserted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateOrganizationInput, id: Number) => {
    upsertOrganization({ variables: { id, input } })
  }

  return (
    <ModalPortal>
      <OrganizationModal
        data={data}
        loading={loading}
        error={error}
        onSave={onSave}
        organization={organization}
        visible={visible}
        setVisible={setVisible}
      />
    </ModalPortal>
  )
}


const ModalPortal = (props: any) => {
  /**
   * Issue #2: Cannot nest forms directly in DOM
   * https://html.spec.whatwg.org/multipage/forms.html#the-form-element
   * This is a basic html spec, the fix is using portals to unest Modals
   * https://reactjs.org/docs/portals.html
   */
  return createPortal(props.children, document.getElementById('modal-portal'))
}
