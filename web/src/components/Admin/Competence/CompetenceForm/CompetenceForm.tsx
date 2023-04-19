import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField
} from '@redwoodjs/forms'

import type { RWGqlError } from '@redwoodjs/forms'
import type { EditCompetenceById, UpdateCompetenceInput } from 'types/graphql'




type FormCompetence = NonNullable<EditCompetenceById['competence']>

interface CompetenceFormProps {
  competence?: EditCompetenceById['competence']
  onSave: (data: UpdateCompetenceInput, id?: FormCompetence['id']) => void
  error: RWGqlError
  loading: boolean
}

const CompetenceForm = (props: CompetenceFormProps) => {
  const onSubmit = (data: FormCompetence) => {










    props.onSave(data, props?.competence?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCompetence> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.competence?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.competence?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <TextField
          name="type"
          defaultValue={props.competence?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="type" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CompetenceForm
