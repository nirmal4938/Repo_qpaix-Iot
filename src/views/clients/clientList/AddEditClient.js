import React, { useState, useRef, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import useClient from './hooks/useClient'
import { Dropdown } from 'primereact/dropdown'
import { Menu } from 'primereact/menu'
import { clientFormActionList } from '../../../constant/actionMenu.constant'
import { Steps } from 'primereact/steps'
import { COUNTRY_DATA_JSON, STATE_DATA_JSON } from 'src/constant/ITEMS_CONSTANT'
import { Card } from 'primereact/card'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
const AddEditClient = () => {
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
  useEffect(() => {
    if (activeIndex === 0) {
      setNextText('Next')
    } else if (activeIndex === 1) {
      if (!id) {
        console.log('active index', activeIndex)
        setNextText('Register')
      } else {
        setNextText('Update')
      }
    }
  }, [activeIndex])
  const { id } = useParams()
  const { loading, error, formData, handleChange, errors, handleSubmit } = useClient({
    id,
    activeIndex,
  })
  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)
  const formClassNames = classNames(
    'inputText',
    {
      'surface-200': isDisable,
      'opacity-100': isDisable,
      'font-semibold': isDisable,
      'text-base': true,
      'text-color': true,
      'p-2': true,
      'border-round': true,
      'appearance-none': true,
      'outline-none': true,
      'focus:border-primary': true,
      'w-full': true,
      'shadow-none': true,
    },
    {
      'p-invalid': errors[`clientInfo.clientName`],
      'border-red-400': errors[`clientInfo.clientName`],
      'border-1': !errors[`clientInfo.clientName`],
    },
  )

  const actionMenuRef = useRef(null)
  const [closeMenu, setCloseMenu] = useState(true)

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
  let titleIfId = 'Client Enrollment Form'
  const handleCloseMenu = () => {
    setCloseMenu(true)
  }
  const handleOpenMenu = (event) => {
    actionMenuRef.current.toggle(event)
    setCloseMenu(false)
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
  const RegistrationConfirmation = () => {
    return (
      <div className="grid justify-content-center">
        <div className="col-6">
          <Card title="Registration Successful">
            <div className="grid justify-content-start">
              <div className="p-col-2">
                <i
                  className="pi pi-check-square"
                  style={{ fontSize: '2em', color: '#0dc63ade' }}
                ></i>
              </div>
              <div className="col-10">
                <p>Your registration was successful!</p>
                <p>Thank you for registering.</p>
                {/* You can add additional information or actions here */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  let { name, address, city, state, country, description } = formData?.clientInfo
  let {
    fname,
    lname,
    mname,
    contactNo,
    emailId,
    description: contactPersonInfoDescription,
  } = formData?.contactPersonInfo
  // console.log('country', state)
  const renderClientInfoEdit = () => {
    return (
      <div
        className={classNames({
          'formgrid grid': true,
        })}
      >
        <div className="field col-12">
          <label htmlFor="name" className="font-medium text-base line-height-1">
            Name<span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="name"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
              'p-invalid border-red-400': errors[`clientInfo.name`],
              'border-1': !errors[`clientInfo.name`],
            })}
            disabled={isDisable}
            name="name"
            onChange={(e) => handleChange('clientInfo', e)}
            value={name}
          />
          {errors[`clientInfo.name`] && (
            <span className="text-danger">{errors[`clientInfo.name`]}</span>
          )}
        </div>

        {/* address */}
        <div className="field col-12">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            Address <span style={{ color: 'red' }}>*</span>
          </label>
          <InputTextarea
            id="address"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color p-2 border-round  appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`clientInfo.address`],
              'border-1': !errors[`clientInfo.address`],
            })}
            name="address"
            onChange={(e) => handleChange('clientInfo', e)}
            value={address}
            disabled={isDisable}
          />
          {errors[`clientInfo.address`] && (
            <span className="text-danger">{errors[`clientInfo.address`]}</span>
          )}
        </div>
        {/* country */}
        <div className="field col-12 md:col-4">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            Country <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            id="country"
            disabled={isDisable}
            name="country"
            value={country}
            onChange={(e) => handleChange('clientInfo', e)}
            options={countries}
            optionLabel="name"
            // optionValue="id"
            editable
            placeholder="Select a Country"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2 border-1 border-solid  border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`clientInfo.country`],
              'border-1': !errors[`clientInfo.country`],
            })}
            style={{ height: '44px' }}
          />

          {errors[`clientInfo.country`] && (
            <span className="text-danger">{errors[`clientInfo.country`]}</span>
          )}
        </div>

        {/* state */}

        <div className="field col-12 md:col-4">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            State <span style={{ color: 'red' }}>*</span>
          </label>

          <Dropdown
            id="state"
            disabled={isDisable || !country}
            name="state"
            value={state}
            onChange={(e) => handleChange('clientInfo', e)}
            options={states}
            optionLabel="name"
            // optionValue="id"
            editable
            placeholder="Select a State"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`clientInfo.state`],
              'border-1': !errors[`clientInfo.state`],
            })}
            style={{ height: '44px' }}
          />
          {errors[`clientInfo.state`] && (
            <span className="text-danger">{errors[`clientInfo.state`]}</span>
          )}
        </div>
        {/* city */}

        <div className="field col-12 md:col-4">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            City <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="city"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2 border-solid  border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`clientInfo.city`],
              'border-1': !errors[`clientInfo.city`],
            })}
            name="city"
            onChange={(e) => handleChange('clientInfo', e)}
            value={city}
            disabled={isDisable}
          />
          {errors[`clientInfo.city`] && (
            <span className="text-danger">{errors[`clientInfo.city`]}</span>
          )}
        </div>

        <div className="field col-12">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            Description <span style={{ color: 'red' }}>*</span>
          </label>
          <InputTextarea
            id="description"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2 border-round  appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`clientInfo.description`],
              'border-1': !errors[`clientInfo.description`],
            })}
            name="description"
            onChange={(e) => handleChange('clientInfo', e)}
            value={description}
            disabled={isDisable}
          />
          {errors[`clientInfo.description`] && (
            <span className="text-danger">{errors[`clientInfo.description`]}</span>
          )}
        </div>
      </div>
    )
  }
  const renderClientPersonInfoEdit = () => {
    return (
      <div
        className={classNames({
          'formgrid grid': true,
        })}
      >
        <div className="field col-12 md:col-4">
          <label htmlFor="fname" className="font-medium text-base line-height-1">
            First Name <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="fname"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
              'p-invalid border-red-400': errors[`contactPersonInfo.fname`],
              'border-1': !errors[`contactPersonInfo.fname`],
            })}
            name="fname"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={fname}
            disabled={isDisable}
          />
          {errors[`contactPersonInfo.fname`] && (
            <span className="text-danger">{errors[`contactPersonInfo.fname`]}</span>
          )}
        </div>
        <div className="field col-12 md:col-4">
          <label htmlFor="mname" className="font-medium text-base line-height-1">
            Middle Name <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="mname"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
              'p-invalid border-red-400': errors[`contactPersonInfo.mname`],
              'border-1': !errors[`contactPersonInfo.mname`],
            })}
            name="mname"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={mname}
            disabled={isDisable}
          />
          {errors[`contactPersonInfo.mname`] && (
            <span className="text-danger">{errors[`contactPersonInfo.mname`]}</span>
          )}
        </div>

        <div className="field col-12 md:col-4">
          <label htmlFor="lname" className="font-medium text-base line-height-1">
            Last Name <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="lname"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
              'p-invalid border-red-400': errors[`contactPersonInfo.lname`],
              'border-1': !errors[`contactPersonInfo.lname`],
            })}
            name="lname"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={lname}
            disabled={isDisable}
          />
          {errors[`contactPersonInfo.lname`] && (
            <span className="text-danger">{errors[`contactPersonInfo.lname`]}</span>
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
              'p-invalid border-red-400': errors[`contactPersonInfo.emailId`],
              'border-1': !errors[`contactPersonInfo.emailId`],
            })}
            name="emailId"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={emailId}
            disabled={isDisable}
          />
          {errors[`contactPersonInfo.emailId`] && (
            <span className="text-danger">{errors[`contactPersonInfo.emailId`]}</span>
          )}
        </div>
        {/* contactNo */}
        <div className="field col-12 md:col-6">
          <label htmlFor="contactNo" className="font-medium text-base line-height-1">
            Contact No <span style={{ color: 'red' }}>*</span>
          </label>
          {/* <div className="flex">
                      <select
                        className="country-code-select"
                        value={'+91'}
                        onChange={(e) => console.log(e.target.value)}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                      </select> */}

          <InputText
            id="contactNo"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
              'p-invalid border-red-400': errors[`contactPersonInfo.contactNo`],
              'border-1': !errors[`contactPersonInfo.contactNo`],
            })}
            name="contactNo"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={contactNo}
            disabled={isDisable}
          />
          {/* </div> */}
          {errors[`contactPersonInfo.contactNo`] && (
            <span className="text-danger">{errors[`contactPersonInfo.contactNo`]}</span>
          )}
        </div>

        <div className="field col-12">
          <label htmlFor="contactPersonInfo" className="font-medium text-base line-height-1">
            Description <span style={{ color: 'red' }}>*</span>
          </label>
          <InputTextarea
            id="description"
            type="text"
            className={classNames({
              'surface-200 opacity-100 font-semibold': isDisable,
              'text-base text-color  p-2 border-round  appearance-none outline-none focus:border-primary w-full shadow-none': true,
              'p-invalid border-red-400': errors[`contactPersonInfo.description`],
              'border-1': !errors[`contactPersonInfo.description`],
            })}
            name="description"
            onChange={(e) => handleChange('contactPersonInfo', e)}
            value={contactPersonInfoDescription}
            disabled={isDisable}
          />
          {errors[`contactPersonInfo.description`] && (
            <span className="text-danger">{errors[`contactPersonInfo.description`]}</span>
          )}
        </div>
      </div>
    )
  }
  const _onClick = async (e) => {
    let { isValid, result } = await handleSubmit(e)
    if (activeIndex === 1 && result?.status)
      setActiveIndex(activeIndex < 2 && isValid ? activeIndex + 1 : activeIndex)
    else if (activeIndex < 1) {
      setActiveIndex(activeIndex < 2 && isValid ? activeIndex + 1 : activeIndex)
    }
  }
  const _onBack = (e) => {
    e.preventDefault()
    if (activeIndex === 0) {
      navigate(-1)
    } else {
      setActiveIndex(activeIndex <= 2 ? activeIndex - 1 : activeIndex)
    }
  }
  return (
    <React.Fragment>
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
                {/* <p
                      style={{
                        background: 'rgb(248 249 250)',
                      }}
                      className="m-0 p-0"
                    >
                      {'Client Information'}
                    </p> */}
              </section>
              <form className="mt-5">
                <div className="">
                  {activeIndex === 0 && renderClientInfoEdit()}
                  {activeIndex === 1 && renderClientPersonInfoEdit()}
                  {activeIndex === 2 && <RegistrationConfirmation />}

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
                      onClick={_onClick}
                      disabled={activeIndex === 2}
                    >
                      {next_text}
                    </Button>
                  </section>
                </div>
              </form>
            </Panel>
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditClient
