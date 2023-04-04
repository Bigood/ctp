import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { Controller, FieldError, Form, FormError, Label, NumberField, Submit, TextField, useForm } from "@redwoodjs/forms"

import { useTranslation } from 'react-i18next'
import InputGeocoding from "../InputGeocoding/InputGeocoding"
import Map from "../Map/Map"
import { useAuth } from "@redwoodjs/auth"

Modal.setAppElement('#redwood-app')

const OrganizationModal = ({ visible, setVisible, organization, onSave, error, loading, data }) => {
  const { t } = useTranslation()
  const formMethods = useForm()
  const watchCoords = formMethods.watch(['latitude', 'longitude'])
  const { } = useAuth()

  const handleSubmit = async (data, e) => {
    e.preventDefault()
    e.stopPropagation()
    onSave(data, organization?.id)
  }
  useEffect(()=> {
    if(!error && data)
      setVisible(false)

  }, [error, data])
  const getLogo = (e) => {
    // const url = `https://opengraph.io/api/1.1/site/${inputValue}?app_id=YOUR_APP_ID`
    // const response = await fetch(url)
    // const data = await response.json()
    // setImageURL(data.hybridGraph.image)
  }

  return (
    <>
      <div className={`modal ${!!visible && 'modal-open'}`}>
        <Form
          error={error}
          config={{ mode: 'onBlur' }}
          formMethods={formMethods}
          className="modal-box"
        >
          <h2 className="text-lg">{t('form.organization')}</h2>
          <FormError
            error={error}
            wrapperClassName="alert alert-error"
            titleClassName="text-lg"
            listClassName="error-list"
          />
          <div className="mt-2 flex w-full flex-auto items-center">
            <div className="avatar">
              <div className="h-24 w-24 rounded border-base-300 bg-base-200">
                {organization?.logo && (
                  <img
                    className="mt-4"
                    src={organization?.logo}
                    alt="Organization logo"
                  />
                )}
              </div>
            </div>

            <div className="ml-2 grow">
              <div>
                <Label
                  name="name"
                  className="label uppercase"
                  errorClassName="label label-error"
                >
                  {t('form.name')}
                </Label>

                <TextField
                  name="name"
                  defaultValue={organization?.name}
                  className="input-bordered input w-full"
                  errorClassName="input input-error w-full"
                  validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />
              </div>
              <div>
                <Label
                  name="url"
                  className="label uppercase"
                  errorClassName="label label-error"
                >
                  {t('form.url')}
                </Label>
                <TextField
                  name="url"
                  className="input-bordered input w-full"
                  errorClassName="input input-error w-full"
                  placeholder="Website of the organization"
                  onChange={(e) => getLogo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Label
              name="address"
              className="label uppercase"
              errorClassName="label label-error"
            >
              {t('form.address')}
            </Label>

            <Controller
              name="address"
              defaultValue={organization?.address}
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

                    formMethods.setValue(
                      'longitude',
                      typeof _longitude == 'string'
                        ? parseFloat(_longitude)
                        : _longitude
                    )
                    formMethods.setValue(
                      'latitude',
                      typeof _latitude == 'string'
                        ? parseFloat(_latitude)
                        : _latitude
                    )
                    // setAddress(item.place_name_fr)
                  }}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <FieldError name="address" className="rw-field-error" />

            <Map
              centerOnMarkers
              markers={[
                {
                  latitude: watchCoords[0] || organization?.latitude,
                  longitude: watchCoords[1] || organization?.longitude,
                },
              ]}
            />
            <NumberField
              name="latitude"
              hidden
              defaultValue={organization?.latitude}
            />

            <NumberField
              name="longitude"
              hidden
              defaultValue={organization?.longitude}
            />
          </div>
          <div className="input-group">
            <div
              className="btn-secondary btn"
              onClick={() => setVisible(false)}
            >
              {t('cancel')}
            </div>
            <div className="btn-primary btn" onClick={formMethods.handleSubmit(handleSubmit)}>
              {t('save')}
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default OrganizationModal
