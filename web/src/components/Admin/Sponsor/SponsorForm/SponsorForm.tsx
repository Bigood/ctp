import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditSponsorById, UpdateSponsorInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormSponsor = NonNullable<EditSponsorById['sponsor']>

interface SponsorFormProps {
  sponsor?: EditSponsorById['sponsor']
  onSave: (data: UpdateSponsorInput, id?: FormSponsor['id']) => void
  error: RWGqlError
  loading: boolean
}

const SponsorForm = (props: SponsorFormProps) => {
  const onSubmit = (data: FormSponsor) => {
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.sponsor?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormSponsor> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.sponsor?.name}
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
            defaultValue={props.sponsor?.url}
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
            defaultValue={props.sponsor?.logo}
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

export default SponsorForm
