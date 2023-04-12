import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditLevelById, UpdateLevelInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormLevel = NonNullable<EditLevelById['level']>

interface LevelFormProps {
  level?: EditLevelById['level']
  onSave: (data: UpdateLevelInput, id?: FormLevel['id']) => void
  error: RWGqlError
  loading: boolean
}

const LevelForm = (props: LevelFormProps) => {
  const onSubmit = (data: FormLevel) => {
  
    
    
  
    props.onSave(data, props?.level?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLevel> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.level?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

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

export default LevelForm
