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

import PracticesCheckboxesCell from 'src/components/Practice/PracticesCheckboxesCell'
import OrganizationsSelectCell from 'src/components/Organization/OrganizationsSelectCell'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import md5 from 'md5'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

type FormUser = NonNullable<EditUserById['user']>

interface SignupFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const SignupForm = (props: SignupFormProps) => {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<FormUser>()
  const { t } = useTranslation()

  const onSubmit = (data: FormUser) => {
    debugger
    //@ts-ignore
    props.onSave({...userData, ...data}, props?.user?.id)
  }

  const onNextStep = (data, currentStep) => {
    debugger
    setUserData({...userData, ...data})
    setStep(currentStep+1);
  }

  return (
    <div className="wrapper">
      <ul className="steps steps-vertical mx-auto mt-8 mb-8 max-w-md lg:steps-horizontal">
        <li
          className={`step max-w-sm cursor-pointer text-sm uppercase ${
            step >= 0 && 'step-primary'
          }`}
          onClick={() => setStep(0)}
        >
          Authentification
        </li>
        <li
          className={`step max-w-sm cursor-pointer text-sm uppercase ${
            step >= 1 && 'step-primary'
          }`}
          onClick={() => setStep(1)}
        >
          Informations personnelles
        </li>
        <li
          className={`step max-w-sm cursor-pointer text-sm uppercase ${
            step >= 2 && 'step-primary'
          }`}
          onClick={() => setStep(2)}
        >
          Pratiques pédagogiques
        </li>
      </ul>

      <section
        className={`${step != 0 && 'hidden'} mx-auto mt-8 mb-8 max-w-md`}
      >
        <Form
          onSubmit={(data) => onNextStep(data, 0)}
          error={props.error}
          config={{ mode: 'onBlur' }}
        >
          <FormError
            error={props.error}
            wrapperClassName="alert alert-error"
            titleClassName="text-lg"
            listClassName="error-list"
          />
          {props.user?.cuid && (
            <TextField name="cuid" defaultValue={props.user?.cuid} hidden />
          )}
          <div className="mb-1">
            <Label
              name="email"
              className="label"
              errorClassName="label label-error"
            >
              {t('form.email-label')}
            </Label>
            <div className="relative">
              <TextField
                name="email"
                defaultValue={props.user?.email}
                // disabled
                className="input-bordered input pointer-events-none block w-full cursor-not-allowed opacity-50"
                errorClassName="input-bordered input block w-full input-error"
                validation={{ required: true }}
              />

              <div className="absolute right-4 top-3">
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            <FieldError name="email" className="rw-field-error" />
          </div>
          <div className="mb-1 text-left align-middle">
            <Label name="showEmail" className="label cursor-pointer">
              <span>{t('form.email-hide-label')}</span>
              <CheckboxField
                name="showEmail"
                defaultChecked={props.user?.showEmail}
                className="checkbox mr-2"
                errorClassName="input-error"
              />
            </Label>
          </div>
          <div>
            <Label
              name="phone"
              className="label"
              errorClassName="label label-error"
            >
              {t('form.phone-label')}
            </Label>
            <TelField
              name="phone"
              className="input-bordered input block w-full"
              errorClassName="input-bordered input block w-full input-error"
              validation={{ required: true }}
            />
            <FieldError name="phone" className="rw-field-error" />
          </div>
          <div className="mb-1 text-left align-middle">
            <Label name="showPhone" className="label cursor-pointer">
              <span>{t('form.phone-hide-label')}</span>
              <CheckboxField
                name="showPhone"
                defaultChecked={props.user?.showPhone}
                className="checkbox mr-2"
                errorClassName="input-error"
              />
            </Label>
          </div>
          <div>
            <Submit className="btn-primary btn">
              {step < 2 ? t('continue') : t('save')}
            </Submit>
          </div>
        </Form>
      </section>

      <section
        className={`${step != 1 && 'hidden'} mx-auto mt-8 mb-8 max-w-2xl`}
      >
        <Form
          onSubmit={(data) => onNextStep(data, 1)}
          error={props.error}
          config={{ mode: 'onBlur' }}
        >
          <FormError
            error={props.error}
            wrapperClassName="alert alert-error"
            titleClassName="text-lg"
            listClassName="error-list"
          />
          <div className="flex w-full flex-auto bg-slate-800 py-2 px-4">
            <div className="avatar mr-4 cursor-pointer">
              <div className="mask mask-squircle w-24">
                <img
                  src={`https://www.gravatar.com/avatar/${md5(
                    props.user?.email
                  )}?d=identicon`}
                />
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="mr-2">
                <Label
                  name="surname"
                  className="label"
                  errorClassName="label label-error"
                >
                  {t('form.surname')}
                </Label>

                <TextField
                  name="surname"
                  defaultValue={props.user?.surname}
                  className="input-bordered input w-36"
                  errorClassName="input input-error w-36"
                  validation={{ required: true }}
                />
                <FieldError name="surname" className="rw-field-error" />
              </div>
              <div className="mr-2">
                <Label
                  name="name"
                  className="label"
                  errorClassName="label label-error"
                >
                  {t('form.name')}
                </Label>

                <TextField
                  name="name"
                  defaultValue={props.user?.name}
                  className="input-bordered input w-36"
                  errorClassName="input input-error w-36"
                  validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />
              </div>
              <div className="mr-2">
                <Label
                  name="job"
                  className="label"
                  errorClassName="label label-error"
                >
                  {t('form.job')}
                </Label>
                <div className="text-left">
                  <div className="flex-center mb-1 flex">
                    <CheckboxField
                      name="job"
                      defaultChecked={true}
                      value="TEACHER"
                      className="checkbox mr-2"
                      errorClassName="checkbox mr-2 input-error"
                    />
                    <span>{t('form.teacher')}</span>
                  </div>
                  <div className="flex-center mb-1 flex">
                    <CheckboxField
                      name="job"
                      defaultChecked={false}
                      value="SUPPORT"
                      className="checkbox mr-2"
                      errorClassName="checkbox mr-2 input-error"
                    />
                    <span>{t('form.support')}</span>
                  </div>
                </div>
                <FieldError name="job" className="rw-field-error" />
              </div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div>
              <Label
                name="department"
                className="label"
                errorClassName="label label-error"
              >
                {t('form.department')}
              </Label>
              <TextField
                name="department"
                defaultValue={props.user?.department}
                className="input-bordered input"
                errorClassName="input input-error"
              />
              <FieldError name="department" className="rw-field-error" />
            </div>
            <div>
              <Label
                name="organizationId"
                className="label"
                errorClassName="label label-error"
              >
                {t('form.organization')}
              </Label>
              <OrganizationsSelectCell
                defaultValue={props.user?.organizationId}
              />
              <FieldError name="organizationId" className="rw-field-error" />
            </div>
          </div>
          <div>
            <Label
              name="shortPresentation"
              className="label"
              errorClassName="label label-error"
            >
              {t('form.short-presentation')}
            </Label>
            <TextAreaField
              name="shortPresentation"
              defaultValue={props.user?.shortPresentation}
              className="input-bordered input"
              errorClassName="input input-error"
            />
            <FieldError name="shortPresentation" className="rw-field-error" />
          </div>

          <div>
            <Submit className="btn-primary btn">
              {step < 2 ? t('continue') : t('save')}
            </Submit>
          </div>
        </Form>
      </section>

      <section className={step != 2 && 'hidden'}>
        <Form
          onSubmit={(data) => onSubmit(data)}
          error={props.error}
          config={{ mode: 'onBlur' }}
        >
          <FormError
            error={props.error}
            wrapperClassName="alert alert-error"
            titleClassName="text-lg"
            listClassName="error-list"
          />
          <Label
            name="practices"
            className="label"
            errorClassName="label label-error"
          >
            {t('practices')}
          </Label>
          <section className="ctp-practices-checkboxes">
            <PracticesCheckboxesCell
              name="practices"
              defaultValue={
                props.user?.practices?.map((practice) => practice.id) || []
              }
              valueAsNumber
            />
          </section>
          <FieldError name="practices" className="rw-field-error" />

          <Label
            name="presentation"
            className="label"
            errorClassName="label label-error"
          >
            {t('form.presentation')}
          </Label>
          <TextAreaField
            name="presentation"
            defaultValue={props.user?.presentation}
            className="input-bordered input"
            errorClassName="input input-error"
          />
          <FieldError name="presentation" className="rw-field-error" />

          <Label
            name="subjects"
            className="label"
            errorClassName="label label-error"
          >
            {t('subjects')}
          </Label>
          <TextAreaField
            name="subjects"
            defaultValue={props.user?.subjects}
            className="input-bordered input"
            errorClassName="input input-error"
          />
          <FieldError name="subjects" className="rw-field-error" />

          <div>
            <Submit className="btn-primary btn">{t('save')}</Submit>
          </div>
        </Form>
      </section>

      <div className="mockup-code hidden">
        <pre>
          <code>{JSON.stringify(userData, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}

export default SignupForm
