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
import OrganizationsSearch from "src/components/OrganizationsSearch/OrganizationsSearch"

type FormUser = NonNullable<EditUserById['user']>

interface SignupFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const SignupForm = (props: SignupFormProps) => {
  const { t } = useTranslation()

  const onSubmit = (data: FormUser) => {
    //@ts-ignore
    props.onSave(data, props?.user?.id)
  }

  return (
    <Form onSubmit={onSubmit} error={props.error} config={{ mode: 'onBlur' }}>
      <FormError
        error={props.error}
        wrapperClassName="alert alert-error"
        titleClassName="text-lg"
        listClassName="error-list"
      />

      <div className="container mx-auto grid min-h-screen grid-cols-6 gap-3">
        <main className="col-span-4 my-4">
          <section className="w-full rounded-md bg-base-100 p-4 text-base-content shadow-xl">
            <div className="flex">
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
                    className="label uppercase"
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
                    className="label uppercase"
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
                    className="label uppercase"
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
                  className="label uppercase"
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
              <div className="grow">
                <Label
                  name="organizationId"
                  className="label uppercase"
                  errorClassName="label label-error"
                >
                  {t('form.organization')}
                </Label>
                <OrganizationsSearch
                  defaultValue={props.user?.organization}
                />
                <FieldError name="organizationId" className="rw-field-error" />
              </div>
            </div>
          </section>
          <section className="mt-4 w-full rounded-md bg-base-100 p-4 text-base-content shadow-xl">
            <Label
              name="practices"
              className="label uppercase"
              errorClassName="label label-error"
            >
              {t('practices')}
            </Label>
            <div className="flex max-h-80 flex-col flex-wrap">
              <PracticesCheckboxesCell
                name="practices"
                defaultValue={
                  props.user?.practices?.map((practice) => practice.id) || []
                }
                valueAsNumber
              />
            </div>
            <FieldError name="practices" className="rw-field-error" />
          </section>
          <section className="mt-4 w-full rounded-md bg-base-100 p-4 text-base-content shadow-xl">
            <div>
              <Label
                name="shortPresentation"
                className="label uppercase"
                errorClassName="label label-error"
              >
                {t('form.short-presentation')}
              </Label>
              <TextAreaField
                name="shortPresentation"
                defaultValue={props.user?.shortPresentation}
                className="input-bordered input h-fit w-full"
                errorClassName="input input-error w-full h-fit"
              />
              <FieldError name="shortPresentation" className="rw-field-error" />
            </div>

            <Label
              name="presentation"
              className="label uppercase"
              errorClassName="label label-error"
            >
              {t('form.presentation')}
            </Label>
            <TextAreaField
              name="presentation"
              defaultValue={props.user?.presentation}
              className="input-bordered input h-fit w-full"
              errorClassName="input input-error w-full h-fit"
            />
            <FieldError name="presentation" className="rw-field-error" />

            <Label
              name="subjects"
              className="label uppercase"
              errorClassName="label label-error"
            >
              {t('subjects')}
            </Label>
            <TextAreaField
              name="subjects"
              defaultValue={props.user?.subjects}
              className="input-bordered input h-fit w-full"
              errorClassName="input input-error w-full h-fit"
            />
            <FieldError name="subjects" className="rw-field-error" />
          </section>
        </main>
        <aside className="col-span-2 my-4  rounded-md bg-base-100 p-4 shadow-xl">
          <section className="mb-2">
            {props.user?.cuid && (
              <TextField name="cuid" defaultValue={props.user?.cuid} hidden />
            )}
            <div className="mb-1">
              <Label
                name="email"
                className="label uppercase"
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
                className="label uppercase"
                errorClassName="label label-error"
              >
                {t('form.phone-label')}
              </Label>
              <TelField
                name="phone"
                defaultValue={props.user?.phone}
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
          </section>
        </aside>
        <div>
          <Submit className="btn-primary btn">{t('save')}</Submit>
        </div>
      </div>
    </Form>
  )
}

export default SignupForm
