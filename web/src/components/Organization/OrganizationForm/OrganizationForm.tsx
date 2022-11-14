import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditOrganizationById, UpdateOrganizationInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormOrganization = NonNullable<EditOrganizationById['organization']>

interface OrganizationFormProps {
  organization?: EditOrganizationById['organization']
  onSave: (data: UpdateOrganizationInput, id?: FormOrganization['id']) => void
  error: RWGqlError
  loading: boolean
}

const OrganizationForm = (props: OrganizationFormProps) => {
  const onSubmit = (data: FormOrganization) => {













    props.onSave(data, props?.organization?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormOrganization> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="authorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author id
        </Label>

          <NumberField
            name="authorId"
            defaultValue={props.organization?.authorId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />


        <FieldError name="authorId" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

          <TextField
            name="name"
            defaultValue={props.organization?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />


        <FieldError name="name" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

          <TextField
            name="address"
            defaultValue={props.organization?.address}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />


        <FieldError name="address" className="rw-field-error" />

        <Label
          name="logo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Logo
        </Label>

          <TextField
            name="logo"
            defaultValue={props.organization?.logo}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />


        <FieldError name="logo" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationForm
