import React from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import PropTypes from 'prop-types'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import classNames from 'classnames'
import { Calendar } from 'primereact/calendar'

export const ActionBodyTemplate = ({ rowData, handleOpenMenu }) => {
  return (
    <div className="datatable-row-actions gap-1 flex justify-content-center">
      <Button
        icon="pi pi-ellipsis-v"
        severity="secondary"
        onClick={(event) => handleOpenMenu(event, rowData)}
        aria-controls="action_menu"
        aria-haspopup
        className="p-button raised p-button-rounded p-button-sm"
      />
    </div>
  )
}
ActionBodyTemplate.propTypes = {
  rowData: PropTypes.object.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
}

export const PanelHeaderTemplate = ({ options, title, configItems, cogMenuRef, onAddNew }) => {
  const className = `${options.className} justify-content-space-between`

  return (
    <div className={className}>
      <div className="flex align-items-center gap-2 mt-auto">
        <h4 className="mt-auto">{title}</h4>
      </div>
      <div className="gap-2 flex">
        <Button className="gap-2" raised icon="pi pi-plus" onClick={onAddNew}>
          Add New
          <Menu model={configItems} popup ref={cogMenuRef} id="config_menu" />
        </Button>
        <Button
          icon="pi pi-cog"
          rounded
          severity="secondary"
          raised
          aria-label="Setting"
          className="h-auto"
          onClick={(e) => cogMenuRef.current.toggle(e)}
        />

        {options.togglerElement}
      </div>
    </div>
  )
}
PanelHeaderTemplate.propTypes = {
  options: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  configItems: PropTypes.array.isRequired,
  cogMenuRef: PropTypes.object.isRequired,
  onAddNew: PropTypes.object.isRequired,
}

export const DataTableHeader = ({ globalFilterValue, onGlobalFilterChange }) => {
  return (
    <div className="d-flex justify-content-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          style={{ minWidth: '325px' }}
        />
      </span>
    </div>
  )
}
DataTableHeader.propTypes = {
  globalFilterValue: PropTypes.string.isRequired,
  onGlobalFilterChange: PropTypes.func.isRequired,
}

export const FormPanelHeaderTemplate = ({ options, title }) => {
  const className = `${options.className} justify-content-space-between p-2`

  return (
    <div className={className}>
      <div className="flex align-items-center">
        <h5 style={{ margin: 'unset', background: 'unset', color: '#4e4545', padding: '0px 16px' }}>
          {title}
        </h5>
      </div>
    </div>
  )
}
FormPanelHeaderTemplate.propTypes = {
  options: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export const FormFooterTemplate = ({ handleSubmit, submitText, handleBack }) => {
  return (
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
        {submitText}
      </Button>
    </section>
  )
}
FormFooterTemplate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  handleBack: PropTypes.func.isRequired,
}

export const renderInputField = (
  id,
  name,
  value,
  type,
  _onChange,
  isDisable,
  error,
  placeholder,
  min,
  max,
) => {
  return (
    <InputText
      id={id}
      name={name}
      value={value}
      type={type}
      onChange={_onChange}
      disabled={isDisable}
      className={classNames({
        'surface-200 opacity-100 font-semibold': isDisable,
        'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
        'p-invalid border-red-400': error,
        'border-1': error,
      })}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  )
}

export const renderInputSwitch = (id, name, checked, type, _onChange, isDisable, error) => {
  return (
    <InputSwitch
      id={id}
      name={name}
      checked={checked}
      type={type}
      onChange={_onChange}
      disabled={isDisable}
      className={classNames({
        'opacity-100 font-semibold': isDisable,
        'text-base text-color p-2  border-round appearance-none outline-none focus:border-primary w-2 shadow-none ': true,
        'p-invalid border-red-400': error,
        'border-1': error,
      })}
    />
  )
}

export const renderDropdown = (
  id,
  isDisable,
  name,
  value,
  _onChange,
  options,
  optionLabel,
  editable,
  placeholder,
  error,
  innerStyle,
  handleCreate,
) => {
  return (
    <Dropdown
      id={id}
      disabled={isDisable}
      name={name}
      value={value}
      onChange={(e) => {
        let { name, value } = e.target
        if (value?.id === -1) {
          console.log('Add new Clicked')
          handleCreate()
        } else {
          _onChange(e)
        }
      }}
      options={options}
      optionLabel={optionLabel}
      // optionValue="id"
      editable={editable}
      placeholder={placeholder}
      className={classNames({
        'surface-200 opacity-100 font-semibold': isDisable,
        'text-base text-color  p-2 border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
        'p-invalid border-red-400': error,
        'border-1': !error,
      })}
      style={innerStyle}
    />
  )
}
export const renderDateTimeField = (id, name, value, _onChange, isDisable, error) => {
  return (
    <Calendar
      id={id}
      disabled={isDisable}
      name={name}
      value={value}
      onChange={_onChange}
      className={classNames({
        'surface-300 opacity-100 font-semibold': isDisable,
        'text-base text-color border-1 border-solid border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
        'p-invalid border-red-400': false,
        'border-0': true,
        'p-0 m-0': true,
      })}
      showIcon
    />
  )
}
