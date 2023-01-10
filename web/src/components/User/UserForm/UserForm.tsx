import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  TextAreaField,
  CheckboxField,
  TelField,
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
        <div>
          <Label
            name="email"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Email - showOnProfile
            <CheckboxField
              name="showEmail"
              defaultChecked={props.user?.showEmail}
              errorClassName="rw-input rw-input-error"
            />
          </Label>
          <TextField
            name="email"
            defaultValue={props.user?.email}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
          <FieldError name="email" className="rw-field-error" />
        </div>
        <section className="ctp-inline-group">
          <div>
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
          </div>
          <div>
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
          </div>
        </section>
        <section className="ctp-inline-group">
          <div>
            <Label
              name="phone"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Phone - showOnProfile
              <CheckboxField
                name="showPhone"
                defaultChecked={props.user?.showPhone}
                errorClassName="rw-input rw-input-error"
              />
            </Label>
            <TelField
              name="phone"
              defaultValue={props.user?.phone}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="phone" className="rw-field-error" />
          </div>
          <div>
            <Label
              name="job"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Job
            </Label>
            <TextField
              name="job"
              defaultValue={props.user?.job}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="job" className="rw-field-error" />
          </div>
        </section >

        <section className="ctp-inline-group">
          <div>
            <Label
              name="organizationId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Organization
            </Label>
            <OrganizationsSelectCell defaultValue={props.user?.organizationId} />
            <FieldError name="organizationId" className="rw-field-error" />
          </div>
          <div>

            <Label
              name="department"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Department
            </Label>
            <TextField
              name="department"
              defaultValue={props.user?.department}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="department" className="rw-field-error" />

          </div>
        </section>
        <Label
          name="practices"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Practices
        </Label>
        <section className="ctp-practices-checkboxes">
          <PracticesCheckboxesCell
            name="practices"
            defaultValue={props.user?.practices.map(practice => practice.id) || []}
            valueAsNumber
          />
        </section>
        <FieldError name="practices" className="rw-field-error" />

        <Label
          name="shortPresentation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Presentation courte
        </Label>
        <TextAreaField
          name="shortPresentation"
          defaultValue={props.user?.shortPresentation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="shortPresentation" className="rw-field-error" />

        <Label
          name="presentation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Presentation
        </Label>
        <TextAreaField
          name="presentation"
          defaultValue={props.user?.presentation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="presentation" className="rw-field-error" />

        <Label
          name="subjects"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          subjects
        </Label>
        <TextAreaField
          name="subjects"
          defaultValue={props.user?.subjects}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="subjects" className="rw-field-error" />

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
