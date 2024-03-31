import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { Button } from 'primereact/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import useEditLocation from './hooks/useEditLocation'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { InputMask } from 'primereact/inputmask'
const MapContainer = ({ position, onClick }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  }

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={position} onClick={onClick}>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  )
}
const AddEditLocation = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/client-location-list\/(update)\//
  const viewurlPattern = /\/client-location-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)
  const { formData, handleChange, errors, handleSubmit, handleMapClick } = useEditLocation({
    id,
    will_refetch: false,
  })
  let titleIfId = 'Client Geolocation Details Form'
  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between p-2`

    return (
      <div className={className}>
        <div className="flex align-items-center">
          <h5 style={{ margin: 'unset', background: 'unset', color: '#4e4545', padding: '0 16px' }}>
            {titleIfId}
          </h5>
        </div>
      </div>
    )
  }
  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  let { name: locationName, latitude, longitude, map } = formData.locationInfo
  let { name: personName, emailId, contactNo } = formData.locationPersonInfo
  // console.log('errors', errors, errors?.locationInfo?.name)
  return (
    <div className="form-container">
      <section className="panel">
        <Panel
          headerTemplate={headerTemplate}
          toggleable={false}
          collapsed={true}
          // className="form-panel-main"
        >
          <form>
            <div className="">
              <section className="">
                <p
                  style={{
                    background: '#e2f0e2',
                    padding: '5px 8px',
                  }}
                >
                  {'Submit Latitude, Longitude, and Map Coordinates'}
                </p>
              </section>
              <div
                className={classNames({
                  'formgrid grid p-2': true,
                })}
              >
                <div className="field col-12">
                  <label htmlFor="name" className="font-medium text-base line-height-1">
                    Location Name<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="name"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationInfo?.name,
                      'border-1': !errors?.locationInfo?.name,
                    })}
                    disabled={isDisable}
                    name="name"
                    onChange={(e) => handleChange('locationInfo', e)}
                    value={locationName}
                    maxLength={100}
                    placeholder="Enter Location name"
                  />
                  {errors?.locationInfo?.name && (
                    <span className="text-danger">{errors?.locationInfo?.name}</span>
                  )}
                </div>

                {/* location latitude */}
                <div className="field col-12 md:col-6">
                  <label htmlFor="locationLatitude" className="font-medium text-base line-height-1">
                    Location Latitude<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="latitude"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationInfo?.latitude,
                      'border-1': !errors?.locationInfo?.latitude,
                    })}
                    disabled={isDisable}
                    name="latitude"
                    onChange={(e) => handleChange('locationInfo', e)}
                    value={latitude}
                    placeholder="Enter latitude"
                  />
                  {errors?.locationInfo?.latitude && (
                    <span className="text-danger">{errors?.locationInfo?.latitude}</span>
                  )}
                </div>
                {/* location longitude */}

                <div className="field col-12 md:col-6">
                  <label htmlFor="longitude" className="font-medium text-base line-height-1">
                    Location Longitude<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="longitude"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationInfo?.longitude,
                      'border-1': !errors?.locationInfo?.longitude,
                    })}
                    disabled={isDisable}
                    name="longitude"
                    onChange={(e) => handleChange('locationInfo', e)}
                    value={longitude}
                    placeholder="Enter longitude"
                  />
                  {errors?.locationInfo?.longitude && (
                    <span className="text-danger">{errors?.locationInfo?.longitude}</span>
                  )}
                </div>
              </div>

              <section className="">
                <p
                  style={{
                    background: '#e2f0e2',
                    padding: '5px 8px',
                  }}
                >
                  {'Location Personal Contact Information'}
                </p>
              </section>

              <div
                className={classNames({
                  'formgrid grid p-2': true,
                })}
              >
                <div className="field col-12 md:col-6">
                  <label htmlFor="locationName" className="font-medium text-base line-height-1">
                    First Name<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="firstName"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationPersonInfo?.firstName,
                      'border-1': !errors?.locationPersonInfo?.firstName,
                    })}
                    disabled={isDisable}
                    name="name.firstName"
                    onChange={(e) => handleChange('locationPersonInfo', e)}
                    value={personName?.firstName}
                    placeholder="Enter First Name"
                  />
                  {errors?.locationPersonInfo?.firstName && (
                    <span className="text-danger">{errors?.locationPersonInfo?.firstName}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="lastName" className="font-medium text-base line-height-1">
                    Last Name<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="name"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationPersonInfo?.lastName,
                      'border-1': !errors?.locationPersonInfo?.lastName,
                    })}
                    disabled={isDisable}
                    name="name.lastName"
                    onChange={(e) => handleChange('locationPersonInfo', e)}
                    value={personName.lastName}
                    placeholder="Enter Last Name"
                  />
                  {errors?.locationPersonInfo?.lastName && (
                    <span className="text-danger">{errors?.locationPersonInfo?.lastName}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="emailId" className="font-medium text-base line-height-1">
                    Email ID <span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="emailId"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors?.locationPersonInfo?.emailId,
                      'border-1': !errors?.locationPersonInfo?.emailId,
                    })}
                    name="emailId"
                    onChange={(e) => handleChange('locationPersonInfo', e)}
                    value={emailId}
                    disabled={isDisable}
                    placeholder="Enter EmailId"
                  />
                  {errors?.locationPersonInfo?.emailId && (
                    <span className="text-danger">{errors?.locationPersonInfo?.emailId}</span>
                  )}
                </div>
                {/* contactNo */}
                <div className="field col-12 md:col-6">
                  <label htmlFor="contactNo" className="font-medium text-base line-height-1">
                    Contact No <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="flex">
                    {/* Dropdown for selecting country code */}
                    {/* <select
                      className="country-code-select"
                      value={'+91'}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                    </select> */}

                    <InputMask
                      id="contactNo"
                      type="text"
                      mask="(999) 999-9999"
                      className={classNames({
                        'surface-200 opacity-100 font-semibold': isDisable,
                        'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                        'p-invalid border-red-400': errors?.locationPersonInfo?.contactNo,
                        'border-1': !errors?.locationPersonInfo?.contactNo,
                      })}
                      name="contactNo"
                      onChange={(e) => handleChange('locationPersonInfo', e)}
                      value={contactNo}
                      disabled={isDisable}
                      placeholder="(999) 999-9999"
                    />
                  </div>
                  {errors?.locationPersonInfo?.contactNo && (
                    <span className="text-danger">{errors?.locationPersonInfo?.contactNo}</span>
                  )}
                </div>
              </div>

              <section className="form-footer d-flex justify-content-between p-2">
                <Button
                  className="bg-primary-reverse hover:bg-primary font-medium text-base gap-2"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  text
                  raised
                  outlined
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  className="bg-primary hover:bg-primary-reverse font-medium text-base gap-2"
                  iconPos="right"
                  icon="pi pi-save"
                  severity="secondary"
                  text
                  raised
                  onClick={handleSubmit}
                >
                  {id ? 'Update' : 'Submit'}
                </Button>
              </section>
            </div>
          </form>
        </Panel>
      </section>
    </div>
  )
}

export default AddEditLocation
MapContainer.propTypes = {
  position: PropTypes.any,
  onClick: PropTypes.any,
}
