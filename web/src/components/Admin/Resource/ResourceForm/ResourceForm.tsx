import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditResourceById, UpdateResourceInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormResource = NonNullable<EditResourceById['resource']>

interface ResourceFormProps {
  resource?: EditResourceById['resource']
  onSave: (data: UpdateResourceInput, id?: FormResource['id']) => void
  error: RWGqlError
  loading: boolean
}

const ResourceForm = (props: ResourceFormProps) => {
  const onSubmit = (data: FormResource) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.resource?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormResource> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.resource?.name}
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
            defaultValue={props.resource?.url}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="filename"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Filename
        </Label>
        
          <TextField
            name="filename"
            defaultValue={props.resource?.filename}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="filename" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        
          <TextField
            name="description"
            defaultValue={props.resource?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="description" className="rw-field-error" />

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

export default ResourceForm
