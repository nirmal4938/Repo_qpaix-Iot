import { useSelector } from 'react-redux/es/hooks/useSelector'
import useClient from './hooks/useClient'
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
import { ClientAddEditView } from './ClientAddEditView'
import { PersonAddEditView } from './PersonAddEditView'
import { LocationAddEditView } from './LocationAddEditView'
import { Preview } from './FormPreview'

function bypassSchema(inputObject) {
  const outputObject = {
    name: inputObject.clientInfo.name,
    address: inputObject.clientInfo.address,
    city: inputObject.clientInfo.city,
    description: inputObject.clientInfo.description,
    country: inputObject.clientInfo.country,
    state: inputObject.clientInfo.state,
    personInfos: inputObject.contactPersonInfo,
    locations: inputObject.locations,
  }
  // console.log('contactPersonInfo')
  return outputObject
}
export const RegisterUpdateClientView = () => {
  let titleIfId = 'Client Enrollment Form'
  const actionMenuRef = useRef(null)
  const [closeMenu, setCloseMenu] = useState(true)
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/client-list\/(update)\//
  const viewurlPattern = /\/client-list\/(view)\//
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
  } = useClient({
    id,
    will_refetch: false,
  })
  const [formikData, setFormikData] = useState(formData)

  useEffect(() => {
    if (activeIndex === 0) {
      setNextText('Next')
    } else if (activeIndex === 2) {
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
      clientInfo: Yup.object().shape({
        name:
          activeIndex === 0 ? Yup.string().required('Please fill out this field.') : Yup.string(),
        address:
          activeIndex === 0 ? Yup.string().required('Please fill out this field.') : Yup.string(),
        city:
          activeIndex === 0
            ? Yup.string().max(25, 'Invalid city').required('Please fill out this field.')
            : Yup.string(),
        // description:
        //   activeIndex === 0 ? Yup.string().required('Please fill out this field.') : Yup.string(),
        country: Yup.object().shape({
          id:
            activeIndex === 0 ? Yup.number().required('Please fill out this field.') : Yup.number(),
        }),
        state: Yup.object().shape({
          id:
            activeIndex === 0 ? Yup.number().required('Please fill out this field.') : Yup.number(),
        }),
      }),
      contactPersonInfo: Yup.array()
        .of(
          Yup.object().shape({
            fname:
              activeIndex === 1
                ? Yup.string().required('Please fill out this field.')
                : Yup.string(),
            lname:
              activeIndex === 1
                ? Yup.string().required('Please fill out this field.')
                : Yup.string(),
            mname: Yup.string(),
            contactNo:
              activeIndex === 1
                ? Yup.string()
                    .matches(/^\+?[0-9]{6,14}$/, 'Invalid phone number')
                    .required('Please fill out this field.')
                : Yup.string(),
            emailId:
              activeIndex === 1
                ? Yup.string().email('Invalid email').required('Please fill out this field.')
                : Yup.string().email('Invalid email'),
            // description:
            //   activeIndex === 1
            //     ? Yup.string().required('Please fill out this field.')
            //     : Yup.string(),
          }),
        )
        .required('At least one contact person is required'),
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
      label: 'Personal Details',
    },
    {
      label: 'Confirmation',
    },
  ]
  const RegistrationConfirmation = () => {
    const TitleTemplate = () => {
      return (
        <div
          className="p-card-title flex justify-content-center"
          style={{
            boxShadow:
              '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 5px 10px 0 rgb(19 226 69 / 25%)',
            paddingBottom: '2px',
          }}
        >
          <i className="pi pi-check-square" style={{ fontSize: '2em', color: '#0dc63ade' }}></i>
          {/* Registration Successful */}
        </div>
      )
    }
    return (
      <div className="grid justify-content-center">
        <div className="col-6">
          <Card title={TitleTemplate} className="flex justify-content-center">
            <div className="grid justify-content-start">
              <div className="col-12">
                <p>Your registration was successful!</p>
                <p>Please Visit the link sent on your email to activate your accout.✔️</p>
                {/* You can add additional information or actions here */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  const _onBack = (e) => {
    e.preventDefault()
    if (activeIndex === 0) {
      navigate(-1)
    } else {
      setActiveIndex(activeIndex <= 2 ? activeIndex - 1 : activeIndex)
    }
  }
  const handleCloseMenu = () => {
    setCloseMenu(true)
  }
  // console.log('Formdata', formData)
  console.log('activeIndex After', activeIndex)

  return (
    <div className="client-form-warpper">
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
                setActiveIndex(activeIndex < 2 ? activeIndex + 1 : activeIndex)
                if (activeIndex === 2) {
                  let bypassBody = bypassSchema(values)
                  if (id) bypassBody = { ...bypassBody, encryptedId: id }
                  console.log('before submit client-', { ...bypassBody })
                  let { status } = await _onSave(bypassBody)
                  console.log('Final Response from api:-', status)
                  if (!status) {
                    navigate(-1)
                  }
                }
                //  else {
                //   setActiveIndex(activeIndex < 3 ? activeIndex + 1 : activeIndex)
                // }
              }}
            >
              {({ handleSubmit, isValid, errors, touched, values, setFieldValue }) => (
                // onSubmit={handleSubmit}
                <form onSubmit={handleSubmit}>
                  {console.log('errors', values)}
                  {activeIndex === 0 && (
                    <ClientAddEditView
                      isDisable={isDisable}
                      isValid={isValid}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {activeIndex === 1 && (
                    <PersonAddEditView
                      isDisable={isDisable}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {/* {activeIndex === 2 && (
                    <LocationAddEditView
                      isDisable={isDisable}
                      errors={errors}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )} */}
                  {/* {activeIndex === 2 && <RegistrationConfirmation />} */}
                  {activeIndex === 2 && (
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
