import { useSelector } from 'react-redux/es/hooks/useSelector'
import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from 'primereact/button'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import { Menu } from 'primereact/menu'
import { Steps } from 'primereact/steps'
import { Card } from 'primereact/card'
import { Formik, FieldArray, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { clientFormActionList } from 'src/constant/actionMenu.constant'
import { PersonAddEditView } from '../clientList/PersonAddEditView'
import { LocationAddEditView } from './LocationAddEditView'
import { Preview } from '../clientList/FormPreview'
import useEditLocation from './hooks/useEditLocation'
import { ClientAddEditView } from '../clientList/ClientAddEditView'

function bypassSchema(inputObject) {
  const outputObject = {
    name: inputObject.locationInfo.name,
    map: inputObject.locationInfo.map,
    longitude: inputObject.locationInfo.longitude,
    latitude: inputObject.locationInfo.latitude,
    personInfos: inputObject.contactPersonInfo,
    client: inputObject?.client,
  }
  // console.log('contactPersonInfo')
  return outputObject
}
export const RegisterUpdateLocationView = () => {
  let titleIfId = 'Client Geo-location Form'
  const actionMenuRef = useRef(null)
  const [closeMenu, setCloseMenu] = useState(true)
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/client-location-list\/(update)\//
  const viewurlPattern = /\/client-location-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)
  const { countries, states } = useSelector((store) => store.constant)
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [next_text, setNextText] = useState('Next')
  const [back_text, setBackText] = useState('Back')
  const { id } = useParams()
  const {
    loading,
    error,
    handleChange,
    errors,
    handleSubmit: _onSave,
    formData,
  } = useEditLocation({
    id,
    will_refetch: false,
  })
  const [formikData, setFormikData] = useState(formData)

  useEffect(() => {
    if (activeIndex === 0) {
      setNextText('Next')
    } else if (activeIndex === 3) {
      if (!id) {
        console.log('active index', activeIndex)
        setNextText('Register')
      } else {
        setNextText('Update')
      }
    }
    if (formData) {
      setFormikData(formData)
    }
  }, [activeIndex, formData])

  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)

  const validationSchema = (activeIndex) => {
    return Yup.object().shape({
      client: Yup.object().shape({
        encryptedId:
          activeIndex === 0 ? Yup.string().required('Please fill out this field.') : Yup.string(),
      }),
      locationInfo: Yup.object().shape({
        name:
          activeIndex === 1 ? Yup.string().required('Please fill out this field.') : Yup.string(),
        latitude:
          activeIndex === 1
            ? Yup.number()
                .typeError('Latitude must be a number')
                .min(-90, 'Latitude must be greater than or equal to -90')
                .max(90, 'Latitude must be less than or equal to 90')
                .required('Latitude is required')
            : Yup.number(),
        longitude:
          activeIndex === 1
            ? Yup.number()
                .typeError('Latitude must be a number')
                .min(-180, 'Longitude must be greater than or equal to -180')
                .max(180, 'Longitude must be less than or equal to 180')
                .required('Longitude is required')
            : Yup.number(),
      }),
      contactPersonInfo: Yup.array().of(
        Yup.object().shape({
          fname:
            activeIndex === 2 ? Yup.string().required('Please fill out this field.') : Yup.string(),
          lname:
            activeIndex === 2 ? Yup.string().required('Please fill out this field.') : Yup.string(),
          mname: Yup.string(),
          contactNo:
            activeIndex === 2
              ? Yup.string()
                  .matches(/^\+?[0-9]{6,14}$/, 'Invalid phone number')
                  .required('Please fill out this field.')
              : Yup.string(),
          emailId:
            activeIndex === 2
              ? Yup.string().email('Invalid email').required('Please fill out this field.')
              : Yup.string().email('Invalid email'),
          // description:
          //   activeIndex === 1
          //     ? Yup.string().required('Please fill out this field.')
          //     : Yup.string(),
        }),
      ),
    })
  }

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between p-2`
    return (
      <div className={className}>
        <div className="flex align-items-center">
          <h4
            className=""
            style={{ margin: 'unset', background: 'unset', color: 'rgb(95 108 115)' }}
          >
            {titleIfId}
          </h4>
        </div>
        <div className="form-action mr-0">
          <Button
            icon="pi pi-ellipsis-v"
            severity="secondary"
            onClick={(event) => handleOpenMenu(event)}
            aria-controls="action_menu"
            aria-haspopup
            className="p-button raised p-button-rounded p-button-sm"
          />
        </div>
      </div>
    )
  }

  const handleOpenMenu = (event) => {
    actionMenuRef.current.toggle(event)
    setCloseMenu(false)
  }
  const stepsItems = [
    {
      label: 'Client Details',
    },
    {
      label: 'Location Details',
    },
    {
      label: 'Personal Details',
    },
    {
      label: 'Confirmation',
    },
  ]

  const _onBack = (e) => {
    e.preventDefault()
    if (activeIndex === 0) {
      navigate(-1)
    } else {
      setActiveIndex(activeIndex <= 3 ? activeIndex - 1 : activeIndex)
    }
  }
  const handleCloseMenu = () => {
    setCloseMenu(true)
  }

  return (
    <div className="location-form-warpper">
      <Menu
        model={clientFormActionList}
        popup
        ref={actionMenuRef}
        id="action_menu"
        onHide={handleCloseMenu}
      />
      <div className="form-container">
        <section className="panel">
          <Panel
            headerTemplate={headerTemplate}
            toggleable={false}
            collapsed={true}
            // className="form-panel-main"
          >
            <section className="" style={{ background: '#f8f9fa' }}>
              <Steps
                model={stepsItems}
                activeIndex={activeIndex}
                onSelect={(e) => setActiveIndex(e.index)}
                readOnly={true}
              />
            </section>
            <Formik
              initialValues={formikData}
              enableReinitialize={true}
              validationSchema={() => validationSchema(activeIndex)}
              onSubmit={async (values, actions) => {
                setActiveIndex(activeIndex < 3 ? activeIndex + 1 : activeIndex)
                if (activeIndex === 3) {
                  let bypassBody = bypassSchema(values)
                  if (id) bypassBody = { ...bypassBody, id: id }
                  console.log('before submit location-', bypassBody)
                  let { result } = await _onSave(bypassBody)
                  console.log('Final Response from api:-', result)
                  if (result.status) {
                    navigate(-1)
                  }
                }
              }}
            >
              {({ handleSubmit, isValid, errors, touched, values, setFieldValue }) => (
                // onSubmit={handleSubmit}
                <form onSubmit={handleSubmit}>
                  {console.log('Hiii', values, errors)}
                  {activeIndex === 0 && (
                    <ClientAddEditView
                      isDisable={isDisable}
                      isValid={isValid}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                      selectionOnly={true}
                    />
                  )}
                  {activeIndex === 1 && (
                    <LocationAddEditView
                      isDisable={isDisable}
                      isValid={isValid}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {activeIndex === 2 && (
                    <PersonAddEditView
                      isDisable={isDisable}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  {/* {activeIndex === 2 && <RegistrationConfirmation />} */}

                  {activeIndex === 3 && (
                    <Preview
                      previews={[
                        {
                          title: 'Client Data',
                          Component: ClientAddEditView,
                          props: {
                            isDisable: true,
                            isValid: isValid,
                            errors: errors,
                            touched: touched,
                            values: values,
                            setFieldValue: setFieldValue,
                            selectionOnly: true,
                          },
                        },
                        {
                          title: 'Location Data',
                          Component: LocationAddEditView,
                          props: {
                            isDisable: true,
                            isValid: isValid,
                            errors: errors,
                            touched: touched,
                            values: values,
                            setFieldValue: setFieldValue,
                          },
                        },
                        {
                          title: 'Person Data',
                          Component: PersonAddEditView,
                          props: {
                            isDisable: true,
                            isValid: isValid,
                            errors: errors,
                            touched: touched,
                            values: values,
                            setFieldValue: setFieldValue,
                            isMutable: false,
                          },
                        },
                      ]}
                    />
                  )}
                  <section className="form-footer d-flex justify-content-between p-2">
                    <Button
                      className="bg-primary-reverse hover:bg-primary font-medium text-base gap-2"
                      icon="pi pi-arrow-left"
                      severity="secondary"
                      text
                      raised
                      outlined
                      onClick={_onBack}
                    >
                      {back_text}
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary-reverse font-medium text-base gap-2"
                      iconPos="right"
                      icon="pi pi-save"
                      severity="secondary"
                      text
                      raised
                      // onClick={handleSubmit}
                      // disabled={activeIndex === 2}
                      type="submit"
                    >
                      {next_text}
                    </Button>
                  </section>
                </form>
              )}
            </Formik>
          </Panel>
        </section>
      </div>
    </div>
  )
}
