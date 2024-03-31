import React, { useState } from 'react'
import classNames from 'classnames'
import { InputTextarea } from 'primereact/inputtextarea'
import { useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import useFlowmeter from './hooks/useEditFlowmeter'
import { useLocation } from 'react-router-dom'
import {
  FormPanelHeaderTemplate,
  FormFooterTemplate,
  renderInputField,
  renderDropdown,
  renderDateTimeField,
  renderInputSwitch,
} from './Template'
import useTank from '../tank/hooks/useEditTank'
import useEditLocation from '../clients/clientlocation/hooks/useEditLocation'
let min = 0
let max = 100
const AddEditFlowmeter = () => {
  let pathLocation = useLocation()
  // const { locations } = useTank({ id: null })
  const { locationsDropdown } = useEditLocation({ id: null, will_refetch: true })

  let testString = pathLocation.pathname
  const updateurlPattern = /\/flowmeter-list\/(update)\//
  const viewurlPattern = /\/flowmeter-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)
  const { id } = useParams()
  const { loading, error, formData, handleChange, errors, handleSubmit, handleBack } = useFlowmeter(
    { id, will_refetch: false },
  )
  let titleIfId = 'Add New Flowmeter'
  if (id) {
    titleIfId = 'Update New Flowmeter'
  }
  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between p-2`

    return (
      <div className={className}>
        <div className="flex align-items-center">
          <h5 style={{ margin: 'unset', background: 'unset', color: '#4e4545' }}>{titleIfId}</h5>
        </div>
      </div>
    )
  }

  let {
    location,
    hwUniqueNo,
    deviceName,
    minRange,
    maxRange,
    minCount,
    maxCount,
    swDeviceId,
    description,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy,
    isActive,
    isDeleted,
  } = formData

  const renderForm = () => {
    console.log('Errors', errors)
    return (
      <>
        <section className="">
          <p
            style={{
              background: '#e2f0e2',
              padding: '5px 8px',
            }}
          >
            {'Flowmeter Information'}
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
              'Flowmeter',
              'text',
              handleChange,
              true,
              errors[`deviceType`],
            )}
          </div>

          {/* address */}
          <div className="field col-12">
            <label htmlFor="location" className="font-medium text-base line-height-1">
              Location <span style={{ color: 'red' }}>*</span>
            </label>
            {renderDropdown(
              'location',
              isDisable,
              'location',
              location,
              handleChange,
              locationsDropdown,
              'name',
              true,
              'Select a Location',
              errors[`location`],
              { height: '44px' },
            )}

            {errors[`location`] && <span className="text-danger">{errors[`location`]}</span>}
          </div>
          {/* city */}

          <div className="field col-12">
            <label htmlFor="hwUniqueNo" className="font-medium text-base line-height-1">
              Hardware Unique No<span style={{ color: 'red' }}>*</span>
            </label>
            {renderInputField(
              'hwUniqueNo',
              'hwUniqueNo',
              hwUniqueNo,
              'text',
              handleChange,
              isDisable,
              errors[`hwUniqueNo`],
              'Enter Hardware unique no',
            )}

            {/* <Message severity="warn" text="Client Name is required" /> */}
            {errors[`hwUniqueNo`] && <span className="text-danger">{errors[`hwUniqueNo`]}</span>}
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="minRange" className="font-medium text-base line-height-1">
              Min Range<span style={{ color: 'red' }}>*</span>
            </label>
            {renderInputField(
              'minRange',
              'minRange',
              minRange,
              'number',
              handleChange,
              isDisable,
              errors[`minRange`],
              'ENter Min Range',
              min,
              max,
            )}

            {/* <Message severity="warn" text="Client Name is required" /> */}
            {errors[`minRange`] && <span className="text-danger">{errors[`minRange`]}</span>}
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="maxRange" className="font-medium text-base line-height-1">
              Max Range<span style={{ color: 'red' }}>*</span>
            </label>
            {renderInputField(
              'maxRange',
              'maxRange',
              maxRange,
              'number',
              handleChange,
              isDisable,
              errors[`maxRange`],
              'Enter Max Range',
              min,
              max,
            )}

            {/* <Message severity="warn" text="Client Name is required" /> */}
            {errors[`maxRange`] && <span className="text-danger">{errors[`maxRange`]}</span>}
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="minCount" className="font-medium text-base line-height-1">
              Min Count<span style={{ color: 'red' }}>*</span>
            </label>
            {renderInputField(
              'minCount',
              'minCount',
              minCount,
              'text',
              handleChange,
              isDisable,
              errors[`minCount`],
              'Enter Min Count',
              min,
              max,
            )}

            {/* <Message severity="warn" text="Client Name is required" /> */}
            {errors[`minCount`] && <span className="text-danger">{errors[`minCount`]}</span>}
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="maxCount" className="font-medium text-base line-height-1">
              Max Count<span style={{ color: 'red' }}>*</span>
            </label>
            {renderInputField(
              'maxCount',
              'maxCount',
              maxCount,
              'number',
              handleChange,
              isDisable,
              errors[`maxCount`],
              'Enter Max count',
              min,
              max,
            )}

            {/* <Message severity="warn" text="Client Name is required" /> */}
            {errors[`maxCount`] && <span className="text-danger">{errors[`maxCount`]}</span>}
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
            {errors[`description`] && <span className="text-danger">{errors[`description`]}</span>}
          </div>

          {isViewScreen && (
            <>
              <div className="field col-12 md:col-6">
                <label htmlFor="createdDate" className="font-medium text-base line-height-1">
                  Created At
                </label>
                {renderDateTimeField(
                  'createdDate',
                  'createdDate',
                  createdDate,
                  handleChange,
                  true,
                  false,
                )}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="createdBy" className="font-medium text-base line-height-1">
                  Created By
                </label>
                {renderInputField(
                  'createdBy',
                  'createdBy',
                  createdBy,
                  'text',
                  handleChange,
                  true,
                  false,
                )}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="updatedDate" className="font-medium text-base line-height-1">
                  Updated At
                </label>
                {renderDateTimeField(
                  'updatedDate',
                  'updatedDate',
                  updatedDate,
                  handleChange,
                  true,
                  false,
                )}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="updatedBy" className="font-medium text-base line-height-1">
                  Updated By
                </label>
                {renderInputField(
                  'updatedBy',
                  'updatedBy',
                  updatedBy,
                  'text',
                  handleChange,
                  true,
                  false,
                )}
              </div>
              <div className="field col-12 md:col-6" style={{ display: 'grid' }}>
                <label htmlFor="updatedBy" className="font-medium text-base line-height-1">
                  Active
                </label>
                {renderInputSwitch(
                  'isActive',
                  'isActive',
                  isActive ? true : false,
                  '',
                  handleChange,
                  true,
                  false,
                )}
              </div>
              <div className="field col-12 md:col-6 grid" style={{ display: 'grid' }}>
                <label htmlFor="isDeleted" className="font-medium text-base line-height-1">
                  Deleted
                </label>
                {renderInputSwitch(
                  'isDeleted',
                  'isDeleted',
                  isDeleted ? true : false,
                  '',
                  handleChange,
                  true,
                  false,
                )}
              </div>
            </>
          )}
        </div>
      </>
    )
  }
  return (
    <div className="form-container">
      <section className="panel">
        <Panel
          headerTemplate={(options) => (
            <FormPanelHeaderTemplate options={options} title={titleIfId} />
          )}
          toggleable={false}
          collapsed={true}
          // className="form-panel-main"
        >
          <form>
            <div className="">
              {renderForm()}
              <FormFooterTemplate
                handleSubmit={handleSubmit}
                submitText={id ? 'Update' : 'Submit'}
                handleBack={handleBack}
              />
            </div>
          </form>
        </Panel>
      </section>
    </div>
  )
}

export default AddEditFlowmeter
