import React, { useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { Button } from 'primereact/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { toast } from 'react-toastify'
const initialState = {
  emailId: '',
  emailOTP: ['', '', '', '', '', ''],
  confirmNewPassword: '',
  newPassword: '',
}
export const ClientActivationAccount = () => {
  const navigate = useNavigate()
  const { resendOTP, verifyOTP } = useAuth()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const email = params.get('email')
  const personId = params.get('person_id')
  // const contact = params.get('contact')
  const inputRefs = useRef([])
  const [formData, setFormData] = useState({ ...initialState, emailId: email })
  const [errors, setErrors] = useState({})
  const [mailSent, setMailSent] = useState(false)

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && formData.emailOTP[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }
  const handleChange = (e, index) => {
    let { name, value } = e.target
    if (name.includes('OTP')) {
      const newOTP = [...formData.emailOTP]
      newOTP[index] = value
      setFormData((prevState) => ({
        ...prevState,
        emailOTP: newOTP,
      }))
      if (value !== '' && index < formData.emailOTP.length - 1) {
        // Focus on the next input field if a digit is entered
        inputRefs.current[index + 1].focus()
      }
    } else
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
  }
  const validateForm = (formState) => {
    const errors = {}

    // Validate clientInfo fields
    Object.entries(formState).forEach(([key, value]) => {
      if (typeof value === 'string') {
        if (!value.trim()) {
          errors[`${key}`] = 'Please fill out this field.'
        } else {
          if (key === 'emailId' && !isValidEmail(value)) {
            errors[`${key}`] = 'Invalid email format'
          }
        }
      } else if (typeof value === 'object') {
        if (key === 'emailOTP') {
          let errorText = validateOTP(value)
          if (errorText) {
            errors[`${key}`] = errorText
          }
        }
      }
    })

    return errors
  }

  const validateOTP = (otp) => {
    // Check if OTP is provided
    if (!otp || otp.length === 0) {
      return 'OTP is required.'
    }

    // Check if OTP is not exactly 6 digits
    if (otp.filter((value) => value.trim() !== '').length !== 6) {
      return 'OTP must be exactly 6 digits long.'
    }

    // Check if OTP contains only numbers
    const allDigits = otp.every((value) => /^\d*$/.test(value))
    if (!allDigits) {
      return 'OTP must contain only numbers.'
    }

    // OTP is valid
    return null
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm(formData)
    // await verifyOTP(formData)
    try {
      if (Object.keys(formErrors).length === 0) {
        // Form is valid, submit data
        let body = {
          email: formData.emailId,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword,
          otp: formData?.emailOTP.join(''),
          contactNo: '7678224356',
          personId,
        }
        let result = await verifyOTP(body)
        console.log(result)
        let { code, status, message } = result
        if (status) {
          setErrors({})
          // toast.success(message)
          navigate('/auth/login')
          // setMailSent(true)
        }
      } else {
        // Form has errors, display error messages
        setErrors(formErrors)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  let { emailOTP, mobileOTP } = formData
  const handleResend = async () => {
    let cred = {
      email,
    }

    let result = await resendOTP(cred)
  }
  return (
    <React.Fragment>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
        <div className="card col-12 md:col-5 p-4">
          {!mailSent && (
            <>
              <section className={classNames({ 'flex flex-column align-items-center mb-3': true })}>
                <h3 className="mb-2">Unlock Your Account</h3>
                <p className="mt-2">
                  We will send you an email with instructions on how to reset your password.
                </p>
              </section>
              <section>
                <div className="field col-12 mb-0">
                  <label htmlFor="personName" className="font-medium text-base line-height-1">
                    Email ID
                  </label>
                  <InputText
                    id="emailId"
                    type="email"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': true,
                      'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`emailId`],
                      'border-1': !errors[`emailId`],
                    })}
                    name="emailId"
                    // onChange={(e) => handleChange(e)}
                    value={formData.emailId}
                    disabled={true}
                  />
                  {errors[`emailId`] && <span className="text-danger">{errors[`emailId`]}</span>}
                </div>
                <div className="field col-12 mb-0">
                  <label htmlFor="emailOTP" className="font-medium text-base line-height-1">
                    OTP <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="flex">
                    {emailOTP.map((digit, index) => (
                      <div className="col" key={index}>
                        <InputText
                          ref={(input) => (inputRefs.current[index] = input)}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          style={{ width: '40px', textAlign: 'center' }}
                          name="emailOTP"
                          className={classNames({
                            'surface-200 opacity-100 font-semibold': false,
                            'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                            'p-invalid border-red-400': errors[`emailOTP`],
                            'border-1': !errors[`emailOTP`],
                          })}
                        />
                      </div>
                    ))}
                  </div>
                  {errors[`emailOTP`] && <span className="text-danger">{errors[`emailOTP`]}</span>}
                </div>
                <div className="field col-12 flex justify-content-end m-0 p-0 pr-2">
                  <Button
                    label="Send OTP"
                    icon="pi pi-send"
                    iconPos="right"
                    severity="help"
                    className="m-0 p-0"
                    text
                    onClick={handleResend}
                  />
                </div>

                <>
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
                    <label
                      htmlFor="confirmNewPassword"
                      className="font-medium text-base line-height-1"
                    >
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
                </>

                {/* <div className="field col-12 mb-0">
                  <label htmlFor="personName" className="font-medium text-base line-height-1">
                    Mobile No
                  </label>
                  <InputText
                    id="mobileNo"
                    type="phone"
                    className={classNames({
                      'surface-200 opacity-100 font-semibold': true,
                      'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                      'p-invalid border-red-400': errors[`mobileNo`],
                      'border-1': !errors[`mobileNo`],
                    })}
                    name="mobileNo"
                    onChange={(e) => handleChange(e)}
                    value={formData.mobileNo}
                    disabled={true}
                  />
                  {errors[`mobileNo`] && <span className="text-danger">{errors[`mobileNo`]}</span>}
                </div>
                <div className="field col-12 mb-0">
                  <label htmlFor="emailOTP" className="font-medium text-base line-height-1">
                    OTP <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="flex">
                    {mobileOTP.map((digit, index) => (
                      <div className="col" key={index}>
                        <InputText
                          ref={(input) => (inputRefs.current[index] = input)}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          style={{ width: '40px', textAlign: 'center' }}
                          name="mobileOTP"
                          className={classNames({
                            'surface-200 opacity-100 font-semibold': false,
                            'text-base text-color  p-2  border-round appearance-none outline-none focus:border-primary w-full shadow-none ': true,
                            'p-invalid border-red-400': errors[`mobileOTP`],
                            'border-1': !errors[`mobileOTP`],
                          })}
                        />
                      </div>
                    ))}
                  </div>
                  {errors[`mobileOTP`] && (
                    <span className="text-danger">{errors[`mobileOTP`]}</span>
                  )}
                </div> */}
                {/* <div className="field col-12 flex justify-content-end m-0 p-0 pr-2">
                  <Button
                    label="Resend OTP"
                    icon="pi pi-send"
                    iconPos="right"
                    severity="help"
                    className="m-0 p-0"
                    text
                    onClick={() => console.log('resend-otp-mobile')}
                  />
                </div> */}
              </section>
              <section className={classNames({ flex: true })}>
                <div className="field col-12">
                  <Button
                    className="bg-primary font-medium text-base w-full justify-content-center flex"
                    text
                    raised
                    onClick={handleSubmit}
                  >
                    Verify
                  </Button>
                </div>
              </section>
            </>
          )}

          {mailSent && (
            <section className={classNames({ 'flex flex-column align-items-center': true })}>
              <h3 className="mb-1">Email Sent</h3>
              <p className="mt-1">{`An email with instructions on how to reset your password has been sent to ${`kumarnirmal9330@gmail.com`}. Check your spam or junk folder if you don’t see the email in your inbox.

If you no longer have access to this email account, please contact us.`}</p>
            </section>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
