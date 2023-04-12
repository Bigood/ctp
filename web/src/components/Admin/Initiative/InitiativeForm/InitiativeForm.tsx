import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditInitiativeById, UpdateInitiativeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormInitiative = NonNullable<EditInitiativeById['initiative']>

interface InitiativeFormProps {
  initiative?: EditInitiativeById['initiative']
  onSave: (data: UpdateInitiativeInput, id?: FormInitiative['id']) => void
  error: RWGqlError
  loading: boolean
}

const InitiativeForm = (props: InitiativeFormProps) => {
  const onSubmit = (data: FormInitiative) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.initiative?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInitiative> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="cuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cuid
        </Label>
        
          <TextField
            name="cuid"
            defaultValue={props.initiative?.cuid}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cuid" className="rw-field-error" />

        <Label
          name="idv1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Idv1
        </Label>
        
          <TextField
            name="idv1"
            defaultValue={props.initiative?.idv1}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="idv1" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>
        
          <TextField
            name="image"
            defaultValue={props.initiative?.image}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        
          <TextField
            name="title"
            defaultValue={props.initiative?.title}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="outsideUsers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Outside users
        </Label>
        
          <TextField
            name="outsideUsers"
            defaultValue={props.initiative?.outsideUsers}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="outsideUsers" className="rw-field-error" />

        <Label
          name="contact"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contact
        </Label>
        
          <TextField
            name="contact"
            defaultValue={props.initiative?.contact}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="contact" className="rw-field-error" />

        <Label
          name="descriptionMD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description md
        </Label>
        
          <TextField
            name="descriptionMD"
            defaultValue={props.initiative?.descriptionMD}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="descriptionMD" className="rw-field-error" />

        <Label
          name="conditionsMD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Conditions md
        </Label>
        
          <TextField
            name="conditionsMD"
            defaultValue={props.initiative?.conditionsMD}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="conditionsMD" className="rw-field-error" />

        <Label
          name="evaluationMD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Evaluation md
        </Label>
        
          <TextField
            name="evaluationMD"
            defaultValue={props.initiative?.evaluationMD}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="evaluationMD" className="rw-field-error" />

        <Label
          name="strengthsMD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Strengths md
        </Label>
        
          <TextField
            name="strengthsMD"
            defaultValue={props.initiative?.strengthsMD}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="strengthsMD" className="rw-field-error" />

        <Label
          name="transferabilityMD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Transferability md
        </Label>
        
          <TextField
            name="transferabilityMD"
            defaultValue={props.initiative?.transferabilityMD}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="transferabilityMD" className="rw-field-error" />

        <Label
          name="authorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author id
        </Label>
        
          <NumberField
            name="authorId"
            defaultValue={props.initiative?.authorId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
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

export default InitiativeForm
