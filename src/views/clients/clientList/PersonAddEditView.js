import { ErrorMessage, Field, FieldArray } from 'formik'
import React from 'react'
import classNames from 'classnames'
import { Divider } from 'primereact/divider'
import PropTypes from 'prop-types'
export const PersonAddEditView = ({
  isDisable,
  errors,
  touched,
  values,
  setFieldValue,
  isMutable = true,
}) => {
  return (
    <React.Fragment>
      <FieldArray name="contactPersonInfo">
        {({ push, remove, index }) => (
          <div key={index}>
            {values?.contactPersonInfo?.map((person, index) => (
              <>
                <div className="formgrid grid" key={index}>
                  <div className="col-11 grid">
                    <div className="field col-4">
                      <label htmlFor="name" className="font-medium text-base line-height-1">
                        First Name<span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        id="fname"
                        type="text"
                        name={`contactPersonInfo.${index}.fname`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400': errors['fname'] && touched['fname'],
                          'border-1': !errors['fname'] && touched['fname'],
                        })}
                        disabled={isDisable}
                        maxLength="100"
                      />
                      <ErrorMessage
                        name={`contactPersonInfo.${index}.fname`}
                        component="span"
                        className="text-danger"
                      />

                      {/* Render other fields for each person */}
                    </div>

                    <div className="field col-4">
                      <label htmlFor="name" className="font-medium text-base line-height-1">
                        Middle Name
                      </label>
                      <Field
                        id="mname"
                        type="text"
                        name={`contactPersonInfo.${index}.mname`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400': errors['mname'] && touched['mname'],
                          'border-1': !errors['mname'] && touched['mname'],
                        })}
                        disabled={isDisable}
                        maxLength="100"
                      />
                      {/* <ErrorMessage name="mname" component="span" className="text-danger" /> */}
                    </div>

                    <div className="field col-4">
                      <label htmlFor="name" className="font-medium text-base line-height-1">
                        Last Name<span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        id="lname"
                        type="text"
                        name={`contactPersonInfo.${index}.lname`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400': errors['lname'] && touched['lname'],
                          'border-1': !errors['lname'] && touched['lname'],
                        })}
                        disabled={isDisable}
                        maxLength="100"
                      />
                      <ErrorMessage
                        name={`contactPersonInfo.${index}.lname`}
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="field col-6">
                      <label htmlFor="emailId" className="font-medium text-base line-height-1">
                        Email Id<span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        id="emailId"
                        type="text"
                        name={`contactPersonInfo.${index}.emailId`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400': errors['emailId'] && touched['emailId'],
                          'border-1': !errors['emailId'] && touched['emailId'],
                        })}
                        disabled={isDisable}
                      />
                      <ErrorMessage
                        name={`contactPersonInfo.${index}.emailId`}
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="field col-6">
                      <label htmlFor="name" className="font-medium text-base line-height-1">
                        Contact No<span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        id="contactNo"
                        type="text"
                        name={`contactPersonInfo.${index}.contactNo`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400': errors['contactNo'] && touched['contactNo'],
                          'border-1': !errors['contactNo'] && touched['contactNo'],
                        })}
                        disabled={isDisable}
                      />
                      <ErrorMessage
                        name={`contactPersonInfo.${index}.contactNo`}
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="field col-12">
                      <label htmlFor="description" className="font-medium text-base line-height-1">
                        Description
                      </label>
                      <Field
                        id="description"
                        as="textarea"
                        name={`contactPersonInfo.${index}.description`}
                        className={classNames({
                          'surface-200 opacity-100 font-semibold': isDisable,
                          'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
                          'p-invalid border-red-400':
                            errors['description'] && touched['description'],
                          'border-1': !errors['description'] && touched['description'],
                        })}
                        disabled={isDisable}
                      />
                    </div>
                  </div>
                  {isMutable && values?.contactPersonInfo?.length > 1 && (
                    <div className="col-1 flex align-items-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-auto mr-auto flex"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
              </>
            ))}

            {isMutable && (
              <button
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
              </button>
            )}
          </div>
        )}
      </FieldArray>
    </React.Fragment>
  )
}
PersonAddEditView.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isMutable: PropTypes.bool,
}
