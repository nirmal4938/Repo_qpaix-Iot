import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import image3 from '../../../assets/images/loginPage/image3.png'
import { useDispatch } from 'react-redux'
import { updateField } from 'src/redux/actions/AuthAction'
import { useAuthHook } from 'src/views/authview/hooks/useAuthHook'
import { LOGIN_FAILURE, LOGIN_SUCCESS } from 'src/redux/actions/AuthAction'
import { toast } from 'react-toastify'

const initialData = {
  username: '',
  password: '',
}

const initialError = {
  username: '',
  password: '',
}

const Login = () => {
  const { login } = useAuthHook()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(initialError)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const formName = e?.target?.getAttribute('data-form')
    dispatch(updateField(formName, name, value))
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const validationErrors = {}

    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required'
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required'
    }

    setErrors(validationErrors)
    // Returns true if there are no errors
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    let loginResult = await login(formData)
    if (loginResult !== undefined) {
      let { type, payload } = loginResult
      if (type === LOGIN_FAILURE) {
        let { message } = payload
        toast.error(message)
      } else if (type === LOGIN_SUCCESS) {
        let { message, user, token } = payload
        // toast.success(message)
        setFormData(initialData)
        setErrors(initialError)
      }
    }
  }

  return (
    <div className="auth-layout-body">
      <div className="centered">
        <div className="card w-9">
          <div className="flex flex-column md:flex-row h-full">
            <div
              className="w-full md:w-6 flex flex-column align-items-center justify-content-center gap-3 py-2 px-2"
              style={{ background: 'rgb(106 144 149 / 13%)' }}
            >
              <div className="w-full p-4">
                <h3>Login to your account</h3>
                <p>Welcome back, select method to login</p>
                <div className="">
                  <Button
                    label="Login with Google"
                    icon="pi pi-google"
                    severity="secondary"
                    text
                    raised
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full p-4 max-h-0">
                <Divider layout="horizontal" className="flex m-0 p-0" align="center">
                  <b>OR</b>
                </Divider>
              </div>
              <div className="formgrid grid p-5">
                <div className="field col-12 relative p-0">
                  <i
                    className="pi pi-user"
                    style={{
                      fontSize: '1.2rem',
                      position: 'absolute',
                      left: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '-webkit-fill-available',
                    }}
                  ></i>
                  <input
                    id="username"
                    type="text"
                    className="text-base h-3rem text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full pl-6"
                    placeholder="Your username or email"
                    value={formData.username}
                    name="username"
                    data-form="user"
                    onChange={handleInputChange}
                  />
                  {errors.username && (
                    <span className="text-danger relative">{errors.username}</span>
                  )}
                </div>
                <div className="field col-12 relative p-0">
                  <i
                    className="pi pi-lock"
                    style={{
                      fontSize: '1.2rem',
                      position: 'absolute',
                      left: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '-webkit-fill-available',
                    }}
                  ></i>
                  <input
                    id="password"
                    type="password"
                    className="text-base h-3rem text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full pl-6"
                    placeholder="Your password"
                    value={formData.password}
                    name="password"
                    data-form="user"
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <span className="text-danger relative">{errors.password}</span>
                  )}
                </div>
                <div className="forgot-password ml-auto pb-2">
                  <Link to="/auth/forgot-password">Forgot Password</Link>
                </div>
                <div className="w-full">
                  <Button label="Login" className="w-full mx-auto" onClick={handleSubmit}></Button>
                </div>
              </div>
            </div>
            <div
              className="w-full md:w-6 flex align-items-center justify-content-center py-5"
              style={{ background: 'rgb(149 111 106 / 13%)' }}
            >
              <Image src={image3} alt="Image" width="450" height="350" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
