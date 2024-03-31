import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { useAuthHook } from './hooks/useAuthHook'
import queryString from 'query-string'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Card } from 'primereact/card'
import TimeoutMessage from 'src/components/common/TimeoutMessage'
import PropTypes from 'prop-types'

export const ClientActivationAccount = () => {
  const searchParams = queryString.parse(window.location.search)
  const navigate = useNavigate()
  const { resendOTP, confirmOtpAndActivate } = useAuthHook()
  const email = searchParams.email
  const personId = searchParams.person_id
  const [sweetText, setSweetText] = useState('')
  const [sweetSeverity, setSweetSeverity] = useState('')
  const [accountAcctivated, setAccountAcctivated] = useState(false)
  let sweetActivate = `Welcome! Let's Activate Your Account`
  let sweetActivated = `Welcome Back! Your Account is Activated!`
  let [sweetHeader, setSweetHeader] = useState(accountAcctivated ? sweetActivated : sweetActivate)
  const emailValidationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.array()
      .of(Yup.string())
      .test('is-valid-otp', 'Invalid OTP format', (value) =>
        value.every((digit) => digit === '' || (digit?.length === 1 && /^\d$/?.test(digit))),
      )
      .length(6, 'OTP must contain exactly 6 digits')
      .required('OTP is required'),
  })

  // Define validation schema for password setting
  const passwordSettingSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .min(4, 'Password must be at least 4 characters long')
      .max(15, 'Password must be at most 15 characters long')
      .matches(/^\S*$/, 'Password must not contain white spaces')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  // Define validation schema for mobile validation
  const mobileValidationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
      .required('OTP is required'),
  })
  const getValidationSchema = (activeFormSection) => {
    switch (activeFormSection) {
      case 'emailValidation':
        return emailValidationSchema
      case 'passwordSetting':
        return passwordSettingSchema
      case 'mobileValidation':
        return mobileValidationSchema
      default:
        return Yup.object() // Return empty schema if section is not recognized
    }
  }

  const AccountActivateSchema = Yup.object().shape({
    // [activeFormSection]: getValidationSchema(activeFormSection),
    emailValidation: emailValidationSchema,
    passwordSetting: passwordSettingSchema,
    // Include other fields as needed
  })

  const _confirmOtpAndActivate = async (values) => {
    let formData = {
      email: values.emailValidation.emailId,
      otp: values.emailValidation.otp.join(''),
      newPassword: values.passwordSetting.password,
      contactNo: '',
      confirmPassword: values?.passwordSetting?.confirmPassword,
    }
    try {
      let result = await confirmOtpAndActivate(formData)
      let { data, status, message } = result
      if (typeof status === 'boolean' && status) {
        setSweetText(message)
        setSweetSeverity('success')
        setAccountAcctivated(true)
      } else {
        setSweetText(data)
        setSweetSeverity('error')
      }
    } catch (err) {
      throw err
    }
  }
  const ClientActivationView = () => {
    let innerStyle = {
      'text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none': true,
    }
    let initial = {
      emailValidation: {
        emailId: email,
        otp: new Array(6).fill(''),
      },
      passwordSetting: {
        password: '',
        confirmPassword: '',
      },
      mobileValidation: {
        mobile: '',
        otp: new Array(6),
      },
    }

    const OtpInput = ({ form, field, setFieldValue }) => {
      const handleChange = (e, index) => {
        // console.log('field', field.value, field.name, index, `${field.name}[${index}]`)
        const { value, name } = e.target
        // Update the value in Formik state
        setFieldValue(`${field.name}[${index}]`, value)
        // Move focus to the next input if the current value is entered
        if (value.length === 1 && index < 5) {
          console.log("field.value[index] === ''", field.value[index])
          document.getElementById(field.name + (index + 1)).focus()
        }
      }
      const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && field.value[index] === '') {
          document.getElementById(field.name + (index - 1)).focus()
        }
      }
      return (
        <div className="flex">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputText
              key={index}
              {...field}
              id={field.name + index}
              name={field.name + index}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              style={{ width: '30px', marginRight: '5px' }}
              className={classNames({
                ...innerStyle,
                // 'surface-200 opacity-100 font-semibold': true,
                // 'p-invalid border-red-400': errors['emailValidation.emailId'],
                // 'border-1': !errors['emailValidation.emailId'],
              })}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={field.value[index]}
              disabled={false}
            />
          ))}
        </div>
      )
    }
    return (
      <React.Fragment>
        <Formik
          initialValues={{ ...initial, isEmailVerified: false, isMobileVerified: false }}
          validationSchema={AccountActivateSchema}
          enableReinitialize
          onSubmit={_confirmOtpAndActivate}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              {console.log('error', errors, values)}
              <div className="pb-2">
                <label htmlFor="emailValidation.emailId"></label>
                <Field
                  type="email"
                  id="emailValidation.emailId"
                  name="emailValidation.emailId"
                  className={classNames({
                    ...innerStyle,
                    'surface-200 opacity-100 font-semibold': true,
                    'p-invalid border-red-400': errors['emailValidation.emailId'],
                    'border-1': !errors['emailValidation.emailId'],
                  })}
                  disabled={true}
                />
                <ErrorMessage
                  className="text-danger"
                  name="emailValidation.emailId"
                  component="div"
                />
              </div>
              {/* {!values.isEmailVerified && (
                <> */}
              <div className="pb-2">
                <label htmlFor="emailValidation.otp">Please fill out OTP</label>
                <Field name="emailValidation.otp">
                  {({ field }) => (
                    <OtpInput
                      form={'emailValidation'}
                      field={field}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </Field>
                <ErrorMessage className="text-danger" name="emailValidation.otp" component="div" />
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
              {/* </>
              )} */}
              {/* {values.isEmailVerified && (
                <> */}
              <div className="mb-1">
                <label htmlFor="passwordSetting.password">Password</label>
                <Field
                  type="password"
                  id="passwordSetting.password"
                  name="passwordSetting.password"
                  className={classNames({
                    ...innerStyle,
                    'p-invalid border-red-400': errors['passwordSetting.password'],
                    'border-1': !errors['passwordSetting.password'],
                  })}
                  component="input"
                  disabled={errors?.emailValidation?.otp}
                />
                <ErrorMessage
                  className="text-danger"
                  name="passwordSetting.password"
                  component="div"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="passwordSetting.confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="passwordSetting.confirmPassword"
                  name="passwordSetting.confirmPassword"
                  className={classNames({
                    ...innerStyle,

                    'p-invalid border-red-400': errors['passwordSetting.confirmPassword'],
                    'border-1': !errors['passwordSetting.confirmPassword'],
                  })}
                  disabled={errors?.emailValidation?.otp}
                />
                <ErrorMessage
                  className="text-danger"
                  name="passwordSetting.confirmPassword"
                  component="div"
                />
              </div>
              {/* </>
              )} */}

              <div className="field pt-2">
                <Button
                  className="bg-primary font-medium text-base w-full justify-content-center flex"
                  text
                  raised
                  type="Submit"
                >
                  Verify
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    )
  }

  const handleResend = async () => {
    let cred = {
      email,
    }
    try {
      let { status, code, data, message } = await resendOTP(cred)
      console.log('result status', status)
      if (status) {
        setSweetText(message)
        setSweetSeverity('success')
      } else {
        setSweetText(message)
        setSweetSeverity('error')
      }
      console.log('otp sent->', status)
    } catch (err) {
      throw err
    }
  }
  const handleCloseTimeoutMessage = () => {
    setSweetText('')
    setSweetSeverity('')
  }
  const CardSubTitle = () => {
    return (
      <div style={{ height: '25px' }}>
        {sweetText && (
          <TimeoutMessage
            text={sweetText}
            severity={sweetSeverity}
            timeout={2000}
            onClose={handleCloseTimeoutMessage}
          />
        )}
      </div>
    )
  }
  const ClientActivatedView = () => {
    return (
      <>
        <div className="text-center">
          <i className="pi pi-check-square" style={{ fontSize: '5em', color: '#0dc63ade' }}></i>
          <div className="col-12">
            <p>Congratulations! Your Account is Now Active!</p>
            <Button
              label="Login"
              severity="success"
              rounded
              onClick={() => navigate('/auth/login')}
            />
            {/* You can add additional information or actions here */}
          </div>
        </div>
      </>
    )
  }

  return (
    <React.Fragment>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
        <Card
          title={sweetHeader}
          subTitle={<CardSubTitle />}
          className="col-12 md:col-6 lg:col-5 p-4 client-activation-card"
        >
          {!accountAcctivated && <ClientActivationView />}
          {accountAcctivated && <ClientActivatedView />}
        </Card>
      </div>
    </React.Fragment>
  )
}
ClientActivationAccount.propTypes = {
  // Prop validation
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}
{
  /* <div>
<label htmlFor="mobileValidation.mobile">Mobile</label>
<Field
  type="text"
  id="mobileValidation.mobile"
  name="mobileValidation.mobile"
  className={classNames({
    ...innerStyle,
    'surface-200 opacity-100 font-semibold': true,
    'p-invalid border-red-400': errors['mobileValidation.mobile'],
    'border-1': !errors['mobileValidation.mobile'],
  })}
/>
<ErrorMessage  className="text-danger" name="mobileValidation.mobile" component="div" />
</div>
{!values.isMobileVerified && (
<div>
  <label htmlFor="mobileValidation.otp">OTP</label>
  <Field name="mobileValidation.otp">
    {({ field }) => (
      <OtpInput for={'mobileValidation'} field={field} setFieldValue={setFieldValue} />
    )}
  </Field>
  <ErrorMessage  className="text-danger" name="mobileValidation.otp" component="div" />
</div>
)} */
}
