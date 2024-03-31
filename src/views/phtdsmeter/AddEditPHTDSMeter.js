import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import { Dropdown } from 'primereact/dropdown'
import usePHTDSMeter from './hooks/useEditPHTDSMeter'
import useTank from '../tank/hooks/useEditTank'
import { useLocation } from 'react-router-dom'
import { renderInputField } from '../flowmeter/Template'
import useEditLocation from '../clients/clientlocation/hooks/useEditLocation'
const AddEditPHTDSMeter = () => {
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/ph-Tds-Meter-list\/(update)\//
  const viewurlPattern = /\/ph-Tds-Meter-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)
  const { locationsDropdown } = useEditLocation({ id: null, will_refetch: true })
  const navigate = useNavigate()
  // const { locations } = useTank({ id: null })
  const { id } = useParams()
  const { loading, error, formData, handleChange, errors, handleSubmit, handleBack } =
    usePHTDSMeter({ id, wil_refetch: false })
  let titleIfId = 'Add New Meter'
  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between p-2`

    return (
      <div className={className}>
        <div className="flex align-items-center">
          <h5
            style={{ margin: 'unset', background: 'unset', color: '#4e4545', padding: '0px 16px' }}
          >
            {titleIfId}
          </h5>
        </div>
      </div>
    )
  }

  let {
    location,
    hwUniqueNo,
    meterName,
    phMinRange,
    phMaxRange,
    phMinCount,
    phMaxCount,
    tdsMinRange,
    tdsMaxRange,
    tdsMinCount,
    tdsMaxCount,
    description,
    swDeviceId,
  } = formData

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
                  {'Meter Information'}
                </p>
              </section>
              <div
                className={classNames({
                  'formgrid grid p-2': true,
                })}
              >
                <div className="field col-12">
                  <label htmlFor="deviceName" className="font-medium text-base line-height-1">
                    S/W Device Id
                  </label>
                  {renderInputField(
                    'swDeviceId',
                    'swDeviceId',
                    swDeviceId,
                    'text',
                    handleChange,
                    true,
                    errors[`swDeviceId`],
                  )}
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                </div>
                <div className="field col-12">
                  <label htmlFor="deviceName" className="font-medium text-base line-height-1">
                    Device Type
                  </label>
                  {renderInputField(
                    'deviceType',
                    'deviceType',
                    'phTds Meter',
                    'text',
                    handleChange,
                    true,
                    errors[`deviceType`],
                  )}
                </div>
                <div className="field col-12">
                  <label htmlFor="location" className="font-medium text-base line-height-1">
                    Location <span style={{ color: 'red' }}>*</span>
                  </label>

                  <Dropdown
                    id="location"
                    disabled={isDisable}
                    name="location"
                    value={location}
                    onChange={(e) => handleChange(e)}
                    options={locationsDropdown}
                    optionLabel="name"
                    editable
                    placeholder="Select a Location"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color  p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                      'p-invalid border-red-400': errors[`location`],
                      'border-1': !errors[`location`],
                    })}
                    style={{ height: '44px' }}
                  />
                  {errors[`location`] && <span className="text-danger">{errors[`location`]}</span>}
                </div>
                <div className="field col-12">
                  <label htmlFor="meterName" className="font-medium text-base line-height-1">
                    Meter Name<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="meterName"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`meterName`],
                      'border-1': !errors[`meterName`],
                    })}
                    disabled={isDisable}
                    name="meterName"
                    onChange={(e) => handleChange(e)}
                    value={meterName}
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`meterName`] && (
                    <span className="text-danger">{errors[`meterName`]}</span>
                  )}
                </div>

                {/* address */}

                {/* city */}

                <div className="field col-12">
                  <label htmlFor="hwUniqueNo" className="font-medium text-base line-height-1">
                    Hardware Unique No<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="hwUniqueNo"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`hwUniqueNo`],
                      'border-1': !errors[`hwUniqueNo`],
                    })}
                    disabled={isDisable}
                    name="hwUniqueNo"
                    onChange={(e) => handleChange(e)}
                    value={hwUniqueNo}
                    placeholder="Enter Hardware unique no."
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`hwUniqueNo`] && (
                    <span className="text-danger">{errors[`hwUniqueNo`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="phMinRange" className="font-medium text-base line-height-1">
                    PH Min Range<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="phMinRange"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`phMinRange`],
                      'border-1': !errors[`phMinRange`],
                    })}
                    disabled={isDisable}
                    name="phMinRange"
                    onChange={(e) => handleChange(e)}
                    value={phMinRange}
                    placeholder="Enter PH Min Range"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`phMinRange`] && (
                    <span className="text-danger">{errors[`phMinRange`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="phMaxRange" className="font-medium text-base line-height-1">
                    PH Max Range<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="phMaxRange"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`phMaxRange`],
                      'border-1': !errors[`phMaxRange`],
                    })}
                    disabled={isDisable}
                    name="phMaxRange"
                    onChange={(e) => handleChange(e)}
                    value={phMaxRange}
                    placeholder="Enter PH Max Range"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`phMaxRange`] && (
                    <span className="text-danger">{errors[`phMaxRange`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="phMinCount" className="font-medium text-base line-height-1">
                    PH Min Count<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="phMinCount"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`phMinCount`],
                      'border-1': !errors[`phMinCount`],
                    })}
                    disabled={isDisable}
                    name="phMinCount"
                    onChange={(e) => handleChange(e)}
                    value={phMinCount}
                    placeholder="Enter PH Min Count"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`phMinCount`] && (
                    <span className="text-danger">{errors[`phMinCount`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="phMaxCount" className="font-medium text-base line-height-1">
                    PH Max Count<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="phMaxCount"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`phMaxCount`],
                      'border-1': !errors[`phMaxCount`],
                    })}
                    disabled={isDisable}
                    name="phMaxCount"
                    onChange={(e) => handleChange(e)}
                    value={phMaxCount}
                    placeholder="Enter PH Max Count"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`phMaxCount`] && (
                    <span className="text-danger">{errors[`phMaxCount`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="tdsMinRange" className="font-medium text-base line-height-1">
                    TDS Min Range<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="tdsMinRange"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`tdsMinRange`],
                      'border-1': !errors[`tdsMinRange`],
                    })}
                    disabled={isDisable}
                    name="tdsMinRange"
                    onChange={(e) => handleChange(e)}
                    value={tdsMinRange}
                    placeholder="Enter TDS Min Count"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`tdsMinRange`] && (
                    <span className="text-danger">{errors[`tdsMinRange`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="tdsMaxRange" className="font-medium text-base line-height-1">
                    TDS Max Range<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="tdsMaxRange"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`tdsMaxRange`],
                      'border-1': !errors[`tdsMaxRange`],
                    })}
                    disabled={isDisable}
                    name="tdsMaxRange"
                    onChange={(e) => handleChange(e)}
                    value={tdsMaxRange}
                    placeholder="Enter TDS Max Range"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`tdsMaxRange`] && (
                    <span className="text-danger">{errors[`tdsMaxRange`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="tdsMinCount" className="font-medium text-base line-height-1">
                    TDS Min Count<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="tdsMinCount"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`tdsMinCount`],
                      'border-1': !errors[`tdsMinCount`],
                    })}
                    disabled={isDisable}
                    name="tdsMinCount"
                    onChange={(e) => handleChange(e)}
                    value={tdsMinCount}
                    placeholder="Enter TDS Min Count"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`tdsMinCount`] && (
                    <span className="text-danger">{errors[`tdsMinCount`]}</span>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="tdsMaxCount" className="font-medium text-base line-height-1">
                    TDS Max Count<span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputText
                    id="tdsMaxCount"
                    type="number"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`tdsMaxCount`],
                      'border-1': !errors[`tdsMaxCount`],
                    })}
                    disabled={isDisable}
                    name="tdsMaxCount"
                    onChange={(e) => handleChange(e)}
                    value={tdsMaxCount}
                    placeholder="Enter TDS Max Count"
                    min="0"
                    max="100"
                  />
                  {/* <Message severity="warn" text="Client Name is required" /> */}
                  {errors[`tdsMaxCount`] && (
                    <span className="text-danger">{errors[`tdsMaxCount`]}</span>
                  )}
                </div>

                <div className="field col-12">
                  <label htmlFor="description" className="font-medium text-base line-height-1">
                    Description <span style={{ color: 'red' }}>*</span>
                  </label>
                  <InputTextarea
                    id="description"
                    type="text"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': isDisable,
                      'text-base text-color  p-2 border-round  appearance-none outline-none focus:border-primary w-full shadow-none': true,
                      'p-invalid border-red-400': errors[`description`],
                      'border-1': !errors[`description`],
                    })}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={description}
                    disabled={isDisable}
                    placeholder="Enter Description"
                  />
                  {errors[`description`] && (
                    <span className="text-danger">{errors[`description`]}</span>
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

export default AddEditPHTDSMeter
