import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,
  CFormRange,
  CHeaderDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilHome, cilSave, cilArrowRight } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { updateField } from 'src/redux/actions/AuthAction'
import { HorizontalDivider } from 'src/components'

const Register = () => {
  const [formData, setFormData] = useState({
    clientInfo: {
      clientName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      description: '',
    },
    contactPersonInfo: {
      personName: '',
      emailId: '',
      contactNo: '',
      description: '',
    },
  })
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const formName = e.target.getAttribute('data-form')
    let localPath = `${formName.split('.')[1]}.${name}`
    let result = dispatch(updateField(formName, name, value))
    const [key, attribute] = localPath.split('.')

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: {
        ...prevFormData[key],
        [attribute]: value,
      },
    }))
  }
  const handleNextStep = () => {
    // Add validation logic if needed
    // For simplicity, assume that the fields are filled for each step
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }
  let { clientName, address, city, state, country, description } = formData?.clientInfo
  let {
    personName,
    emailId,
    contactNo,
    description: contactPersonDescription,
  } = formData?.contactPersonInfo

  const handleNext = () => {
    if (currentStep === 1) {
      handleNextStep()
    }
  }
  const StepIndicator = ({ currentStep }) => {
    const steps = [1, 2]

    return (
      <div className="d-flex justify-content-center mb-4">
        {steps.map((step) => (
          <div
            key={step}
            className={`step-indicator ${currentStep === step ? 'current-step' : ''}`}
          >
            {step}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h4>New Client Enrollment</h4>
                  {/* <hr/> */}
                  {/* <CHeaderDivider/> */}
                  <p className="text-body-secondary text-bold" style={{ fontWeight: '600' }}>
                    {currentStep === 1 ? 'Client Information' : 'Personal Contact Information'}
                  </p>
                  <HorizontalDivider />

                  {currentStep === 1 && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Name"
                          autoComplete="client name"
                          name="clientName"
                          value={clientName}
                          data-form="signUp.clientInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilHome} />
                        </CInputGroupText>
                        <CFormTextarea
                          id="floatingTextarea"
                          floatingLabel=""
                          placeholder="Address."
                          name="address"
                          data-form="signUp.clientInfo"
                          value={address}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>🏙️</CInputGroupText>
                        <CFormInput
                          placeholder="City"
                          autoComplete="city"
                          name="city"
                          value={city}
                          data-form="signUp.clientInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>🌐</CInputGroupText>
                        <CFormInput
                          placeholder="State"
                          autoComplete="state"
                          name="state"
                          value={state}
                          data-form="signUp.clientInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>🌍</CInputGroupText>
                        <CFormInput
                          placeholder="Country"
                          autoComplete="country"
                          name="country"
                          value={country}
                          data-form="signUp.clientInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>📝</CInputGroupText>
                        <CFormTextarea
                          id="floatingTextarea"
                          floatingLabel=""
                          placeholder="Description"
                          name="description"
                          value={description}
                          data-form="signUp.clientInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Person name"
                          autoComplete="person name"
                          name="personName"
                          value={personName}
                          data-form="signUp.contactPersonInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          name="emailId"
                          value={emailId}
                          data-form="signUp.contactPersonInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>📞</CInputGroupText>
                        <CFormInput
                          type="tel"
                          placeholder="Contact No."
                          autoComplete="contact No"
                          name="contactNo"
                          value={contactNo}
                          data-form="signUp.contactPersonInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>📝</CInputGroupText>
                        <CFormTextarea
                          placeholder="Description"
                          autoComplete="description"
                          name="description"
                          value={contactPersonDescription}
                          data-form="signUp.contactPersonInfo"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </>
                  )}
                  <div
                    className={currentStep > 1 ? `d-flex` : `d-grid `}
                    style={{ columnGap: '20px' }}
                  >
                    {currentStep > 1 && (
                      <CButton
                        color="secondary"
                        onClick={handlePreviousStep}
                        className={`d-flex align-items-center justify-content-center ${
                          currentStep === 2 ? 'w-50' : ''
                        }`}
                      >
                        <span className="auto">PREVIOUS</span>
                      </CButton>
                    )}
                    <CButton
                      color="success"
                      onClick={handleNext}
                      className={`d-flex align-items-center justify-content-center ${
                        currentStep === 2 ? 'w-50' : ''
                      }`}
                    >
                      <span className="auto">{currentStep === 1 ? 'NEXT' : 'SUBMIT'}</span>
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Register.propTypes = {
  currentStep: PropTypes.number.isRequired,
}
export default Register
{
  /* {currentStep === 1 && <CIcon icon={cilArrowRight} className="me-2 button-action-icon" style={{width: "2rem",
    height: "2rem", position: "absolute"}} />} */
}
{
  /* {currentStep === 2 && <CIcon icon={cilSave} className="me-2 button-action-icon h-3" style={{width: "2rem",
    height: "2rem", position: "absolute"}}/>} */
}
