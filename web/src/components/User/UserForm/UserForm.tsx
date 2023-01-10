import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditUserById, UpdateUserInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

import PracticesCheckboxesCell from 'src/components/PracticesCheckboxesCell'
import OrganizationsSelectCell from 'src/components/Organization/OrganizationsSelectCell'


type FormUser = NonNullable<EditUserById['user']>

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {













    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

          <TextField
            name="email"
            defaultValue={props.user?.email}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />


        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

          <TextField
            name="name"
            defaultValue={props.user?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />


        <FieldError name="name" className="rw-field-error" />

        <Label
          name="surname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Surname
        </Label>

          <TextField
            name="surname"
            defaultValue={props.user?.surname}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />


        <FieldError name="surname" className="rw-field-error" />

        <Label
          name="organizationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization
        </Label>
        <OrganizationsSelectCell defaultValue={props.user?.organizationId}/>


        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="practices"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Practices
        </Label>

        <PracticesCheckboxesCell
          name="practices"
          defaultValue={props.user?.practices.map(practice => practice.id) || []}
          valueAsNumber
          />

        <FieldError name="practices" className="rw-field-error" />

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

export default UserForm
