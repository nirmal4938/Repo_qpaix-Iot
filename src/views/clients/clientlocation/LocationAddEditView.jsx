import classNames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MapComponent from '../clientList/MapComponent'
export const LocationAddEditView = ({
  isDisable,
  isValid,
  errors,
  touched,
  values,
  setFieldValue,
}) => {
  const defaultCenter = [23.0225, 72.5714]

  return (
    <React.Fragment>
      <div className="formgrid grid">
        <div className="field col-12">
          <label htmlFor="name" className="font-medium text-base line-height-1">
            Name<span style={{ color: 'red' }}>*</span>
          </label>
          <Field
            id="name"
            maxLength="100"
            type="text"
            name="locationInfo.name"
            className={classNames({
              'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'surface-200 opacity-100 font-semibold': isDisable,
              'p-invalid border-red-400': errors['locationInfo.name'],
              'border-1': !errors['locationInfo.name'],
            })}
            disabled={isDisable}
          />
          <ErrorMessage name="locationInfo.name" component="span" className="text-danger" />
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="latitude" className="font-medium text-base line-height-1">
            Latitude<span style={{ color: 'red' }}>*</span>
          </label>
          <Field
            id="latitude"
            maxLength="100"
            type="text"
            name="locationInfo.latitude"
            className={classNames({
              'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'surface-200 opacity-100 font-semibold': isDisable,
              'p-invalid border-red-400': errors['locationInfo.latitude'],
              'border-1': !errors['locationInfo.latitude'],
            })}
            disabled={isDisable}
          />
          <ErrorMessage name="locationInfo.latitude" component="span" className="text-danger" />
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="longitude" className="font-medium text-base line-height-1">
            Longitude<span style={{ color: 'red' }}>*</span>
          </label>
          <Field
            id="longitude"
            maxLength="100"
            type="text"
            name="locationInfo.longitude"
            className={classNames({
              'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'surface-200 opacity-100 font-semibold': isDisable,
              'p-invalid border-red-400': errors['locationInfo.longitude'],
              'border-1': !errors['locationInfo.longitude'],
            })}
            disabled={isDisable}
          />
          <ErrorMessage name="locationInfo.longitude" component="span" className="text-danger" />
        </div>

        <div className="field col-12 " style={{ userSelect: isDisable ? 'none' : '' }}>
          <MapComponent
            isDisable={isDisable}
            center={defaultCenter}
            zoom={13}
            id={'q-map-id'}
            onUpdateCoordinates={(e) => {
              const { lat, lng } = e.latlng
              console.log(`Clicked coordinates: ${lat}, ${lng}`)
              setFieldValue(`locationInfo.latitude`, lat)
              setFieldValue(`locationInfo.longitude`, lng)
            }}
          />
        </div>

        {/* Render other fields similarly */}
      </div>
    </React.Fragment>
  )
}
LocationAddEditView.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}
