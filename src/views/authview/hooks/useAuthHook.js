import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure, loginSuccess, logout } from '../../../redux/actions/AuthAction'
import {
  login,
  verifyOTP,
  sendOTP,
  forgotPassword,
  resetPassword,
} from '../../../services/authService'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

export const useAuthHook = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isLoggedIn, user, token } = useSelector((state) => state.auth)
  const toastRef = useRef(null)

  useEffect(() => {
    // You can implement your own logic here to check if the user is logged in.
    // For demonstration purposes, let's assume we're fetching isLoggedIn state from Redux store.
  }, [])

  const handleLogin = async (credentials) => {
    setLoading(true)
    try {
      const response = await login(credentials)
      const { status, data, message } = response

      let reducerResult
      if (status) {
        const payloadData = {
          user: {
            encryptedId: data?.encryptedId,
            fname: data?.fname,
            lname: data?.lname,
            mname: data?.mname,
            contactNo: data?.contactNo,
            description: data?.description,
            emailId: data?.emailId,
          },
          jwtToken: data?.jwtToken,
          message: message,
        }
        // Store response data in session storage on successful login
        sessionStorage.setItem('LOGIN_SUCCESS', JSON.stringify(payloadData))
        // Dispatch login success action
        reducerResult = dispatch(loginSuccess(payloadData))
      } else {
        reducerResult = dispatch(loginFailure({ ...data, message }))
      }
      setLoading(false)
      return reducerResult
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleResendOTP = async (requestBody) => {
    setLoading(true)
    try {
      let result = await sendOTP(requestBody)
      let { status, message, data } = result
      if (status) {
        // toast.success(message)
        return result
        // implement redux dispatch
      } else {
        return result
      }
      setLoading(false)
    } catch (error) {
      // toast.error(error)
      setLoading(false)
    }
  }

  const confirmOtpAndActivate = async (body) => {
    try {
      console.log('activate account body', body)
      let result = await verifyOTP(body)
      let { status, message, data } = result
      if (status) {
        toast.success(message)
        // distch handler
      }
      setLoading(false)
      return result
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, proceed with logout
        sessionStorage.clear()
        dispatch(logout())
      }
    })
  }

  const handleForgotPassword = async (formData) => {
    try {
      let { emailId: email } = formData
      let result = await forgotPassword(email)
      let { status, message, data } = result
      if (status) {
        // toast.succes(message)
      }
      setLoading(false)
      return result
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleResetPassword = async (formData) => {
    try {
      const reset = {
        email: formData?.emailId,
        newPassword: formData?.newPassword,
        confirmPassword: formData?.confirmNewPassword, // Use formData?.confirmNewPassword instead of formData?.confirmPassword
      }
      let result = await resetPassword(reset)
      let { status, message, data } = result
      if (status) {
        // toast.succes(message)
        console.log('success')
      }
      setLoading(false)
      return result
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return {
    loading,
    error,
    isLoggedIn,
    user,
    token,
    login: handleLogin,
    logout: handleLogout,
    resendOTP: handleResendOTP,
    confirmOtpAndActivate,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
  }
}
