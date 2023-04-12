import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPracticeById, UpdatePracticeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormPractice = NonNullable<EditPracticeById['practice']>

interface PracticeFormProps {
  practice?: EditPracticeById['practice']
  onSave: (data: UpdatePracticeInput, id?: FormPractice['id']) => void
  error: RWGqlError
  loading: boolean
}

const PracticeForm = (props: PracticeFormProps) => {
  const onSubmit = (data: FormPractice) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.practice?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPractice> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.practice?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="synonym"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Synonym
        </Label>
        
          <TextField
            name="synonym"
            defaultValue={props.practice?.synonym}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="synonym" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        
          <TextField
            name="description"
            defaultValue={props.practice?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="shortDescription"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Short description
        </Label>
        
          <TextField
            name="shortDescription"
            defaultValue={props.practice?.shortDescription}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="shortDescription" className="rw-field-error" />

        <Label
          name="sources"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sources
        </Label>
        
          <TextField
            name="sources"
            defaultValue={props.practice?.sources}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="sources" className="rw-field-error" />

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

export default PracticeForm
