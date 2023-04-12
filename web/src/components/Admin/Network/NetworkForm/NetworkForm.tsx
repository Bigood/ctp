import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditNetworkById, UpdateNetworkInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormNetwork = NonNullable<EditNetworkById['network']>

interface NetworkFormProps {
  network?: EditNetworkById['network']
  onSave: (data: UpdateNetworkInput, id?: FormNetwork['id']) => void
  error: RWGqlError
  loading: boolean
}

const NetworkForm = (props: NetworkFormProps) => {
  const onSubmit = (data: FormNetwork) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.network?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormNetwork> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.network?.name}
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
            defaultValue={props.network?.url}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="logo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Logo
        </Label>
        
          <TextField
            name="logo"
            defaultValue={props.network?.logo}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="logo" className="rw-field-error" />

        <Label
          name="authorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author id
        </Label>
        
          <NumberField
            name="authorId"
            defaultValue={props.network?.authorId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="authorId" className="rw-field-error" />

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

export default NetworkForm
