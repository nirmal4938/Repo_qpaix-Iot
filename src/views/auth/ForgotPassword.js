import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/views/auth/hooks/useAuth'
import { toast } from 'react-toastify'
import { FaCheckCircle } from 'react-icons/fa'

const initialState = {
  emailId: '',
}

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [mailSent, setMailSent] = useState(false)
  const auth = useAuth()
  const forgotPassword = auth.forgotPassword

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = (formState) => {
    const errors = {}

    // Validate clientInfo fields
    Object.entries(formState).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[`${key}`] = 'Please fill out this field.'
      } else {
        if (key === 'emailId' && !isValidEmail(value)) {
          errors[`${key}`] = 'Invalid email format'
        }
      }
    })

    return errors
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formErrors = validateForm(formData)
      if (Object.keys(formErrors).length === 0) {
        const result = await forgotPassword(formData)
        console.log('After Form submitted:', result)
        setMailSent(true)
        setErrors({})
      } else {
        setErrors(formErrors)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <div className="card col-12 md:col-5 p-7">
        {!mailSent && (
          <>
            <section className="flex flex-column align-items-center mb-3">
              <h3 className="mb-2">Forgot Email/Password</h3>
              <p className="mt-2">
                We will send you an email with instructions on how to reset your password.
              </p>
            </section>
            <section>
              <div className="field col-12">
                <label htmlFor="personName" className="font-medium text-base line-height-1">
                  Email ID <span style={{ color: 'red' }}>*</span>
                </label>
                <InputText
                  id="emailId"
                  type="email"
                  className={`surface-200 opacity-100 font-semibold text-base text-color p-2 border-round appearance-none outline-none focus:border-primary w-full shadow-none ${
                    errors.emailId ? 'p-invalid border-red-400' : 'border-1'
                  }`}
                  name="emailId"
                  onChange={handleChange}
                  value={formData.emailId}
                  disabled={false}
                />
                {errors.emailId && <span className="text-danger">{errors.emailId}</span>}
              </div>
            </section>
            <section className="flex">
              <div className="field col-2">
                <Button
                  icon="pi pi-arrow-left"
                  severity="info"
                  tooltip="Back"
                  tooltipOptions={{ showDelay: 1000, hideDelay: 300 }}
                  onClick={handleBack}
                />
              </div>
              <div className="field col-10">
                <Button
                  className="bg-primary font-medium text-base w-full justify-content-center flex"
                  text
                  raised
                  onClick={handleSubmit}
                  tooltip="Confirm to proceed"
                  tooltipOptions={{ showDelay: 1000, hideDelay: 300 }}
                >
                  Email Me
                </Button>
              </div>
            </section>
          </>
        )}

        {mailSent && (
          <section className="flex flex-column align-items-center">
            <FaCheckCircle className="text-success mb-2" size={30} />

            {/* Email Sent content */}
            <h3 className="mb-1">Email Sent</h3>

            <p className="mt-1">
              {`An email with instructions on how to reset your password has been sent to ${formData.emailId}. Check your spam or junk folder if you don’t see the email in your inbox.

              If you no longer have access to this email account, please contact us.`}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
