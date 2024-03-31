import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
const initialState = {
  emailId: '',
  newPassword: '',
  confirmNewPassword: '',
}
export const ResetPassword = ({}) => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const { resetPassword } = useAuth()
  const emailId = params.get('emailId')
  const [formData, setFormData] = useState({ ...initialState, emailId })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = (formState) => {
    const errors = {}

    // Validate newPassword and confirmNewPassword fields
    if (!formState.newPassword.trim()) {
      errors.newPassword = 'New password is required'
    } else if (formState.newPassword.length < 6 || formState.newPassword.length > 64) {
      errors.newPassword = 'Password must be between 6 and 64 characters long'
    }

    if (!formState.confirmNewPassword.trim()) {
      errors.confirmNewPassword = 'Confirm password is required'
    } else if (formState.confirmNewPassword !== formState.newPassword) {
      errors.confirmNewPassword = 'Passwords do not match'
    }

    return errors
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm(formData)
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data
      const result = await resetPassword(formData)
      console.log('Form submitted:', formData)
      setErrors({})
    } else {
      // Form has errors, display error messages
      setErrors(formErrors)
    }
  }

  return (
    <React.Fragment>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
        <div className="card col-12 md:col-5 p-7">
          <section
            className={classNames({
              'flex flex-column align-items-center mb-3': true,
            })}
          >
            <h3 className="mb-2">Change Your Password</h3>
            <p className="mt-2">
              Protect your account with a unique password at least 6 characters long
            </p>
          </section>
          <section className="">
            <div className="formgrid grid">
              <div className="field col-12">
                <label htmlFor="EmailId" className="font-medium text-base line-height-1">
                  Email ID
                </label>
                <InputText
                  id="emailId"
                  type="email"
                  className={classNames({
                    'surface-200 opacity-100 font-semibold': true,
                    'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                  })}
                  name="emailId"
                  onChange={(e) => handleChange(e)}
                  value={formData.emailId}
                  disabled={true}
                />
              </div>

              <div className="field col-12">
                <label htmlFor="newPassword" className="font-medium text-base line-height-1">
                  New Password <span style={{ color: 'red' }}>*</span>
                </label>
                <InputText
                  id="newPassword"
                  type="password"
                  className={classNames({
                    'surface-200 opacity-100 font-semibold': false,
                    'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                    'p-invalid border-red-400': errors[`newPassword`],
                    'border-1': !errors[`newPassword`],
                  })}
                  name="newPassword"
                  onChange={(e) => handleChange(e)}
                  value={formData.newPassword}
                  disabled={false}
                />
                {errors[`newPassword`] && (
                  <span className="text-danger">{errors[`newPassword`]}</span>
                )}
              </div>

              <div className="field col-12">
                <label htmlFor="confirmNewPassword" className="font-medium text-base line-height-1">
                  Confirm New Password <span style={{ color: 'red' }}>*</span>
                </label>
                <InputText
                  id="confirmNewPassword"
                  type="password"
                  className={classNames({
                    'surface-200 opacity-100 font-semibold': false,
                    'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                    'p-invalid border-red-400': errors[`confirmNewPassword`],
                    'border-1': !errors[`confirmNewPassword`],
                  })}
                  name="confirmNewPassword"
                  onChange={(e) => handleChange(e)}
                  value={formData.confirmNewPassword}
                  disabled={false}
                />
                {errors[`confirmNewPassword`] && (
                  <span className="text-danger">{errors[`confirmNewPassword`]}</span>
                )}
              </div>
            </div>
          </section>
          <section className={classNames({ flex: true })}>
            <Button
              className="bg-primary font-medium text-base w-full justify-content-center flex"
              text
              raised
              onClick={handleSubmit}
            >
              Save
            </Button>
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}
