import api from './api' // Import the custom Axios instance from api.js

// Function to handle user login
export const login = async (credentials) => {
  try {
    const response = await api.post('/client/login', credentials)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    return error.response
  }
}

// Function to handle user logout
export const logout = async () => {
  try {
    // Perform any necessary cleanup, such as clearing tokens or cookies
    // Redirect the user to the login page, etc.
    console.log('User logged out successfully')
  } catch (error) {
    console.error('Error logging out:', error)
    return error.response
  }
}

// Function to handle forgot password
export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post('/client/forgot-password', { email })
    return data
  } catch (error) {
    console.error('Error sending forgot password request:', error)
    return error.response
  }
}

// Function to handle reset password
export const resetPassword = async (formdata) => {
  try {
    const response = await api.post('/client/update-password', formdata)
    return response.data
  } catch (error) {
    console.error('Error resetting password:', error)
    return error.response
  }
}
export const sendOTP = async (credential) => {
  try {
    const response = await api.post('/client/send-otp', credential)
    // console.log('Response main', response)
    return response?.data
  } catch (error) {
    console.error('Error resetting password:', error)
    return error.response
  }
}

export const verifyOTP = async (credential) => {
  try {
    const response = await api.post('/client/auth/verify-otp', credential)
    return response.data
  } catch (error) {
    console.error('Error resetting password:', error)
    return error.response
  }
}

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyOTP,
  sendOTP,
}
