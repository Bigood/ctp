import type { FindPractices } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { CheckboxField, Label, useController } from '@redwoodjs/forms'
import { Controller, RegisterOptions, useErrorStyles } from '@redwoodjs/forms'

export const QUERY = gql`
  query FindPractices {
    practices {
      id
      createdAt
      updatedAt
      name
      synonym
      description
      shortDescription
      sources
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ControlledCheckboxes extends FindPractices {
  defaultValue: any;
  name: string;
  valueAsNumber: boolean;
}
export const Success = ({ practices, ...rest }: CellSuccessProps<ControlledCheckboxes>) => {
  return (
    <ControlledCheckboxes {...rest} options={practices} />
  )
}
// Composant controlé, pour que les checkbox renvoient des entiers, valueAsNumber de React Hook Form ne marche pas sur les CheckboxField (seulement sur les input type text, cf docs)
const ControlledCheckboxes = (props) => {
  const {
    name,
    className,
    errorClassName,
    defaultValue = [],
    validation,
    style,
    valueAsNumber,
    ...propsRest
  } = props

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={validation}
      {...propsRest}
      render={({ field: { onChange, onBlur, value, name, ref } }) =>
          props.options.map((practice, index) => (
            <div key={practice.id}>
              <input
              name="practices"
              id={practice.id}
              value={practice.id}
              title={practice.name}
              defaultChecked={defaultValue.indexOf(practice.id) != -1}
              onChange={(e) => {
                let valueCopy = [...value],
                checkboxValue = valueAsNumber ? parseInt(e.target.value) : e.target.value;

                if(e.target.checked)
                  valueCopy.push(checkboxValue)
                else
                  valueCopy.splice(valueCopy.indexOf(checkboxValue), 1)

                // send data to react hook form
                onChange(valueCopy);

              }}
              ref={ref}
              // checked={value.includes(option.id)}
              type="checkbox"
              />
              <Label name={practice.name} htmlFor={practice.id} />
          </div>
        )
      )}
    />
  )
}