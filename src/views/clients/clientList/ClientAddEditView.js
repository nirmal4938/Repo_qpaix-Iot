import classNames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import useClient from './hooks/useClient'
export const ClientAddEditView = ({
  isDisable,
  isValid,
  errors,
  touched,
  values,
  setFieldValue,
  selectionOnly,
}) => {
  const { countries, states } = useSelector((store) => store.constant)
  const { clientDropdown: clients } = useClient({ id: null, will_refetch: true })
  console.log('clients', clients)
  return (
    <React.Fragment>
      <div className="formgrid grid">
        {selectionOnly && (
          <div className="field col-12">
            <label htmlFor="client" className="font-medium text-base line-height-1">
              Client <span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              as="select"
              id="client"
              name="client.encryptedId"
              className={classNames({
                'surface-200 opacity-100 font-semibold': isDisable,
                'text-base text-color p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                'p-invalid border-red-400': errors['client.encryptedId'],
                'border-1': !errors['client.encryptedId'],
              })}
              disabled={isDisable}
              onChange={(e) => {
                console.log('onChange', e.target.value)
                const selectedClient = clients.find(
                  (client) => client?.encryptedId === e.target.value,
                )
                setFieldValue('client', selectedClient || { encryptedId: '', name: '' })
              }}
              value={values?.client?.encryptedId}
            >
              <option value="">Select a Client</option>
              {clients.map((clientsOption, index) => (
                <option key={clientsOption.encryptedId} value={clientsOption?.encryptedId}>
                  {clientsOption.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="client.encryptedId" component="span" className="text-danger" />
          </div>
        )}
        {!selectionOnly && (
          <>
            <div className="field col-12">
              <label htmlFor="name" className="font-medium text-base line-height-1">
                Name<span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                id="name"
                maxLength="200"
                type="text"
                name="clientInfo.name"
                className={classNames({
                  'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'p-invalid border-red-400': errors['clientInfo.name'],
                  'border-1': !errors['clientInfo.name'],
                })}
                disabled={isDisable}
              />
              <ErrorMessage name="clientInfo.name" component="span" className="text-danger" />
            </div>
            <div className="field col-12">
              <label htmlFor="address" className="font-medium text-base line-height-1">
                Address <span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                as="textarea"
                id="address"
                type="text"
                maxLength="250"
                name="clientInfo.address"
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'p-invalid border-red-400': errors['clientInfo.address'],
                  'border-1': !errors['clientInfo.address'],
                })}
                // onChange={(e) => handleChange('clientInfo', e)}
                // value={address}
                disabled={isDisable}
              />
              <ErrorMessage name="clientInfo.address" component="span" className="text-danger" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="country" className="font-medium text-base line-height-1">
                Country <span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                as="select"
                id="country"
                name="clientInfo.country"
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'text-base text-color p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'p-invalid border-red-400': errors['clientInfo.country'],
                  'border-1': !errors['clientInfo.country'],
                })}
                disabled={isDisable}
                // onChange={(e) => handleChange('clientInfo', e)}
                // value={country}
                onChange={(e) => {
                  const selectedCountry = countries.find(
                    (country) => country.id === parseInt(e.target.value),
                  )
                  setFieldValue('clientInfo.country', selectedCountry || { id: '', name: '' })
                }}
                value={values?.clientInfo?.country?.id}
              >
                <option value="">Select a Country</option>
                {countries.map((countryOption, index) => (
                  <option key={countryOption.id} value={countryOption?.id}>
                    {countryOption.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="clientInfo.country.id" component="span" className="text-danger" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="state" className="font-medium text-base line-height-1">
                State <span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                as="select"
                id="state"
                name="clientInfo.state"
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'text-base text-color p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'p-invalid border-red-400': errors['clientInfo.state'],
                  'border-1': !errors['clientInfo.state'],
                })}
                disabled={!values?.clientInfo?.country?.id || isDisable}
                // onChange={(e) => handleChange('clientInfo', e)}
                // value={state}
                onChange={(e) => {
                  const selectedState = states.find(
                    (state) => state.id === parseInt(e.target.value),
                  )
                  setFieldValue('clientInfo.state', selectedState || { id: '', name: '' })
                }}
                value={values?.clientInfo?.state?.id}
              >
                <option value="">Select a State</option>
                {states.map((stateOption) => (
                  <option key={stateOption.id} value={stateOption.id}>
                    {stateOption.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="clientInfo.state.id" component="span" className="text-danger" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="city" className="font-medium text-base line-height-1">
                City <span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                as="input"
                id="city"
                type="text"
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'text-base text-color  p-2 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'p-invalid border-red-400': errors['clientInfo.city'],
                  'border-1': !errors['clientInfo.city'],
                })}
                name="clientInfo.city"
                // onChange={(e) => handleChange('clientInfo', e)}
                // value={city}
                disabled={isDisable}
                maxLength="50"
              />
              <ErrorMessage name="clientInfo.city" component="span" className="text-danger" />
            </div>
            <div className="field col-12">
              <label htmlFor="description" className="font-medium text-base line-height-1">
                Description <span style={{ color: 'red' }}>*</span>
              </label>
              <Field
                as="textarea"
                id="description"
                rows="7"
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'text-base text-color  p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                  'p-invalid border-red-400': errors['clientInfo.description'],
                  'border-1': !errors['clientInfo.description'],
                })}
                name="clientInfo.description"
                // onChange={(e) => handleChange('clientInfo', e)}
                // value={description}
                disabled={isDisable}
                maxLength="250"
              />
              <ErrorMessage
                name="clientInfo.description"
                component="span"
                className="text-danger"
              />
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  )
}
ClientAddEditView.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  selectionOnly: PropTypes.bool,
}
