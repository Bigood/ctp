import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
  Controller,
  useForm,
} from '@redwoodjs/forms'

import type {
  EditOrganizationById,
  UpdateOrganizationInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import InputGeocoding from 'src/components/InputGeocoding/InputGeocoding'
import Map from 'src/components/Map/Map'

type FormOrganization = NonNullable<EditOrganizationById['organization']>

interface OrganizationFormProps {
  organization?: EditOrganizationById['organization']
  onSave: (data: UpdateOrganizationInput, id?: FormOrganization['id']) => void
  error: RWGqlError
  loading: boolean
}

const OrganizationForm = (props: OrganizationFormProps) => {
  const formMethods = useForm()
  const watchCoords = formMethods.watch(["latitude", "longitude"])

  const onSubmit = (data: FormOrganization) => {
    props.onSave(data, props?.organization?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form
        //<FormOrganization>
        formMethods={formMethods}
        onSubmit={onSubmit}
        error={props.error}
      >
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

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>
        <Controller
          name="address"
          defaultValue={props.organization?.address}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <InputGeocoding
              name={name}
              ref={ref}
              onSelect={(item) => {
                const [_longitude, _latitude] =
                  typeof item.center === 'string'
                    ? item.center.split(',')
                    : item.center

                formMethods.setValue('longitude', _longitude)
                formMethods.setValue('latitude', _latitude)
                // setAddress(item.place_name_fr)
              }}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="latitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Latitude
        </Label>

        <TextField
          name="latitude"
          defaultValue={props.organization?.latitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="latitude" className="rw-field-error" />

        <Label
          name="longitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Longitude
        </Label>

        <TextField
          name="longitude"
          defaultValue={props.organization?.longitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="longitude" className="rw-field-error" />
        <Map
          markers={[
            {
              latitude: watchCoords[0],
              longitude: watchCoords[1],
            },
          ]}
        />
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationForm
