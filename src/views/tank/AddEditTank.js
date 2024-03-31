import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { InputTextarea } from 'primereact/inputtextarea'
import { useNavigate, useParams } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import useTank from './hooks/useEditTank'
import { RadioButton } from 'primereact/radiobutton'
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
import { Dialog } from 'primereact/dialog'
import AddEditLocation from '../clients/clientlocation/AddEditLocation'
let min = 0
let max = 100
const AddEditTank = () => {
  let pathLocation = useLocation()
  let testString = pathLocation.pathname
  const updateurlPattern = /\/tank-list\/(update)\//
  const viewurlPattern = /\/tank-list\/(view)\//
  let isViewScreen = viewurlPattern.test(testString)
  let isUpdateScreen = updateurlPattern.test(testString)

  const { id } = useParams()
  const { loading, error, formData, handleChange, errors, handleSubmit } = useTank({
    id,
    will_refetch: false,
  })
  const { locationsDropdown } = useEditLocation({ id: null, will_refetch: true })
  let titleIfId = 'Add New Tank'
  if (id) {
    titleIfId = 'Update Tank'
  }
  const [isDisable, setIsDisable] = useState(isViewScreen ? true : false)
  const [demoField, setDemoField] = useState('Nirmal')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const navigate = useNavigate()
  let {
    location,
    hwUniqueNo,
    tankType,
    tankName,
    tankCapacity,
    ltMinRange,
    ltMaxRange,
    ltMinCount,
    ltMaxCount,
    description,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy,
    isActive,
    isDeleted,
    swDeviceId,
  } = formData

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  const handleCreate = () => {
    setShowCreateModal(true)
  }
  const renderForm = () => {
    let _locations = locationsDropdown

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
            'Tank',
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
            [..._locations, { id: -1, name: 'Add New' }],
            'name',
            true,
            'Select a Location',
            errors[`location`],
            { height: '44px' },
            handleCreate,
          )}
          {errors[`location`] && <span className="text-danger">{errors[`location`]}</span>}
        </div>
        <div className="field col-12">
          <label htmlFor="clientName" className="font-medium text-base line-height-1">
            Tank Name<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'tankName',
            'tankName',
            tankName,
            'text',
            handleChange,
            isDisable,
            errors[`tankName`],
            'Enter Tank Name',
          )}
          {/* <Message severity="warn" text="Client Name is required" /> */}
          {errors[`tankName`] && <span className="text-danger">{errors[`tankName`]}</span>}
        </div>

        <div className="field col-12">
          <label htmlFor="HWUniqueNO" className="font-medium text-base line-height-1">
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
            'Enter Hardware unique number.',
          )}
          {errors[`hwUniqueNo`] && <span className="text-danger">{errors[`hwUniqueNo`]}</span>}
        </div>

        {/* Tank type */}
        <div className="field col-12">
          <label htmlFor="tankType" className="font-medium text-base line-height-1">
            Tank Type<span style={{ color: 'red' }}>*</span>
          </label>
          <div className="flex flex-wrap gap-6">
            <div className="flex align-items-center">
              <RadioButton
                inputId="tankType"
                name="tankType"
                value="ESR"
                onChange={(e) => handleChange(e)}
                checked={tankType === 'ESR'}
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  'appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                  'p-invalid border-red-400': errors[`tankType`],
                })}
                disabled={isDisable}
              />
              <label htmlFor="ingredient1" className="ml-2">
                ESR
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="tankType"
                name="tankType"
                value="GSR"
                onChange={(e) => handleChange(e)}
                checked={tankType === 'GSR'}
                className={classNames({
                  'surface-200 opacity-100 font-semibold': isDisable,
                  ' appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                  'p-invalid border-red-400': errors[`tankType`],
                })}
                disabled={isDisable}
              />
              <label htmlFor="ingredient1" className="ml-2">
                GSR
              </label>
            </div>
          </div>
          {errors[`tankType`] && <span className="text-danger">{errors[`tankType`]}</span>}
        </div>

        {/* state */}
        <div className="field col-12">
          <label htmlFor="tankCapacity" className="font-medium text-base line-height-1">
            Tank Capicity (In LTR.)<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'tankCapacity',
            'tankCapacity',
            tankCapacity,
            'number',
            handleChange,
            isDisable,
            errors[`tankCapacity`],
            'Tank Capicity in (LTR.)',
            1,
          )}
          {errors[`tankCapacity`] && <span className="text-danger">{errors[`tankCapacity`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="ltMinRange" className="font-medium text-base line-height-1">
            LT Min Range<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'ltMinRange',
            'ltMinRange',
            ltMinRange,
            'number',
            handleChange,
            isDisable,
            errors[`ltMinRange`],
            'LT Min Range',
            min,
            max,
          )}
          {errors[`ltMinRange`] && <span className="text-danger">{errors[`ltMinRange`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="ltMaxRange" className="font-medium text-base line-height-1">
            LT Max Range<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'ltMaxRange',
            'ltMaxRange',
            ltMaxRange,
            'number',
            handleChange,
            isDisable,
            errors[`ltMaxRange`],
            'LT Max Range',
            min,
            max,
          )}
          {errors[`ltMaxRange`] && <span className="text-danger">{errors[`ltMaxRange`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="ltMinCount" className="font-medium text-base line-height-1">
            LT Min Count<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'ltMinCount',
            'ltMinCount',
            ltMinCount,
            'number',
            handleChange,
            isDisable,
            errors[`ltMinCount`],
            'LT Min Count',
            min,
            max,
          )}
          {errors[`ltMinCount`] && <span className="text-danger">{errors[`ltMinCount`]}</span>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="ltMaxCount" className="font-medium text-base line-height-1">
            LT Max Count<span style={{ color: 'red' }}>*</span>
          </label>
          {renderInputField(
            'ltMaxCount',
            'ltMaxCount',
            ltMaxCount,
            'number',
            handleChange,
            isDisable,
            errors[`ltMaxCount`],
            'LT Max Count',
            min,
            max,
          )}
          {errors[`ltMaxCount`] && <span className="text-danger">{errors[`ltMaxCount`]}</span>}
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
                submitText={id ? 'Update' : 'Submit'}
                handleBack={handleBack}
              />
            </div>
          </form>
        </Panel>
      </section>

      <Dialog
        header="Header"
        visible={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        style={{ width: '50vw' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <p className="m-0">
          <AddEditLocation id={null} />
        </p>
      </Dialog>
    </div>
  )
}

export default AddEditTank
