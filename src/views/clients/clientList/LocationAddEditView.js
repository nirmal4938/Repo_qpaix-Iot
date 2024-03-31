import { ErrorMessage, Field, FieldArray } from 'formik'
import classNames from 'classnames'
import React from 'react'
import MapComponent from './MapComponent'
import { Divider } from 'primereact/divider'
import PropTypes from 'prop-types'

export const LocationAddEditView = ({ isDisable, errors, touched, values, setFieldValue }) => {
  const defaultCenter = [23.0225, 72.5714]
  const initialCenter =
    [values?.locations[0]?.latitude, values?.locations[0].longitude] || defaultCenter

  return (
    <React.Fragment>
      <FieldArray name="contactPersonInfo">
        {({ push, remove, index }) => (
          <div key={index}>
            {values?.locations?.map((location, index) => (
              <>
                <div className="formgrid grid" key={index}>
                  <div className="field col-12">
                    <label htmlFor="name" className="font-medium text-base line-height-1">
                      Location Name<span style={{ color: 'red' }}>*</span>
                    </label>

                    <Field
                      id="name"
                      type="text"
                      name={`locations.${index}.name`}
                      maxLength="250"
                      className={classNames({
                        'surface-200 opacity-100 font-semibold': isDisable,
                        'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                        'p-invalid border-red-400':
                          errors['locations.name'] && touched['locations.name'],
                        'border-1': !errors['locations.name'] && touched['locations.name'],
                      })}
                      disabled={isDisable}
                    />
                    <ErrorMessage
                      name={`locations.${index}.name`}
                      component="span"
                      className="text-danger"
                    />
                  </div>

                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="locationLatitude"
                      className="font-medium text-base line-height-1"
                    >
                      Location Latitude<span style={{ color: 'red' }}>*</span>
                    </label>
                    <Field
                      id="name"
                      type="text"
                      name={`locations.${index}.latitude`}
                      className={classNames({
                        'surface-200 opacity-100 font-semibold': isDisable,
                        'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                        'p-invalid border-red-400':
                          errors['locations.latitude'] && touched['locations.latitude'],
                        'border-1': !errors['locations.latitude'] && touched['locations.latitude'],
                      })}
                      disabled={isDisable}
                    />
                    <ErrorMessage
                      name={`locations.${index}.latitude`}
                      component="span"
                      className="text-danger"
                    />
                  </div>

                  <div className="field col-12 md:col-6">
                    <label htmlFor="longitude" className="font-medium text-base line-height-1">
                      Location Longitude<span style={{ color: 'red' }}>*</span>
                    </label>
                    <Field
                      id="name"
                      type="text"
                      name={`locations.${index}.longitude`}
                      className={classNames({
                        'surface-200 opacity-100 font-semibold': isDisable,
                        'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                        'p-invalid border-red-400':
                          errors['locations.longitude'] && touched['locations.longitude'],
                        'border-1':
                          !errors['locations.longitude'] && touched['locations.longitude'],
                      })}
                      disabled={isDisable}
                    />
                    <ErrorMessage
                      name={`locations.${index}.longitude`}
                      component="span"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-12 field">
                    <MapComponent
                      isDisable={isDisable}
                      center={[location.latitude, location.longitude]}
                      zoom={13}
                      id={location?.id}
                      onUpdateCoordinates={(e) => {
                        const { lat, lng } = e.latlng
                        console.log(`Clicked coordinates: ${lat}, ${lng}`)
                        setFieldValue(`locations.${index}.latitude`, lat)
                        setFieldValue(`locations.${index}.longitude`, lng)
                      }}
                    />
                  </div>
                </div>
                {/* <button type="button" onClick={() => remove(index)}>
                Remove
              </button> */}
                <Divider />
              </>
            ))}

            {/* <button
              type="button"
              onClick={() =>
                push({
                  fname: '',
                  lname: '',
                  mname: '',
                  contactNo: '',
                  emailId: '',
                  description: '',
                }) 
              }
            >
              Add Person
            </button> */}
          </div>
        )}
      </FieldArray>
    </React.Fragment>
  )
}

LocationAddEditView.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.shape({
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
}
