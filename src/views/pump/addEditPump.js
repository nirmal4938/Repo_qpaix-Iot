import React, { useState } from 'react'
import classNames from 'classnames'
import { InputTextarea } from 'primereact/inputtextarea'
import { useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import usePump from './hooks/useEditPump'
import { useLocation } from 'react-router-dom'

import {
  FormFooterTemplate,
  FormPanelHeaderTemplate,
  renderDropdown,
  renderInputField,
  renderDateTimeField,
  renderInputSwitch,
} from '../flowmeter/Template'
import useEditLocation from '../clients/clientlocation/hooks/useEditLocation'
let min = 0
let max = 100
const AddEditPump = () => {
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/pump-list\/(update)\//
  const viewurlPattern = /\/pump-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)
  const { id } = useParams()
  // const { locations } = useEditLocation({ id: null })
  const { locationsDropdown } = useEditLocation({ id: null, will_refetch: true })

  const { loading, error, formData, handleChange, errors, handleSubmit, handleBack } = usePump({
    id,
    will_refetch: false,
  })
  let titleIfId = 'Add New Pump'
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
    pumpName,
    emMinRange,
    emMaxRange,
    emMinCount,
    emMaxCount,
    description,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy,
    isActive,
    isDeleted,
    swDeviceId,
  } = formData
  // console.log('form-data, location', location, locationsDropdown)
  const renderForm = () => {
    return (
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
            'Pump',
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
        <div className="field col-12">
          <label htmlFor="pumpName" className="font-medium text-base line-height-1">
            Pump Name<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'pumpName',
            'pumpName',
            pumpName,
            'text',
            handleChange,
            isDisable,
            errors[`pumpName`],
            'Enter Pump name',
          )}

          {errors[`pumpName`] && <span className="text-danger">{errors[`pumpName`]}</span>}
        </div>

        {/* address */}

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
          <label htmlFor="emMinRange" className="font-medium text-base line-height-1">
            EM Min Range<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'emMinRange',
            'emMinRange',
            emMinRange,
            'number',
            handleChange,
            isDisable,
            errors[`emMinRange`],
            'Enter EM Min Range',
            min,
            max,
          )}

          {errors[`emMinRange`] && <span className="text-danger">{errors[`emMinRange`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="emMaxRange" className="font-medium text-base line-height-1">
            EM Max Range<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'emMaxRange',
            'emMaxRange',
            emMaxRange,
            'number',
            handleChange,
            isDisable,
            errors[`emMaxRange`],
            'Enter EM Max Range',
            min,
            max,
          )}
          {errors[`emMaxRange`] && <span className="text-danger">{errors[`emMaxRange`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="emMinCount" className="font-medium text-base line-height-1">
            EM Min Count<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'emMinCount',
            'emMinCount',
            emMinCount,
            'number',
            handleChange,
            isDisable,
            errors[`emMinCount`],
            'Enter EM Min Count',
            min,
            max,
          )}
          {errors[`emMinCount`] && <span className="text-danger">{errors[`emMinCount`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="emMaxCount" className="font-medium text-base line-height-1">
            EM Max Count<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'emMaxCount',
            'emMaxCount',
            emMaxCount,
            'number',
            handleChange,
            isDisable,
            errors[`emMaxCount`],
            'Enter EM Max Count',
            min,
            max,
          )}

          {errors[`emMaxCount`] && <span className="text-danger">{errors[`emMaxCount`]}</span>}
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
            placeholder="Description"
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
              <section className="">
                <p
                  style={{
                    background: '#e2f0e2',
                    padding: '5px 8px',
                  }}
                >
                  {'Tank Information'}
                </p>
              </section>
              {renderForm()}

              <FormFooterTemplate
                handleSubmit={handleSubmit}
                handleBack={handleBack}
                submitText={id ? 'Update' : 'Submit'}
              />
            </div>
          </form>
        </Panel>
      </section>
    </div>
  )
}

export default AddEditPump
