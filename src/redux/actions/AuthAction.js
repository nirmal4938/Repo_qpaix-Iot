export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export const loginRequest = () => ({ type: LOGIN_REQUEST })
export const loginSuccess = (success_payload) => ({ type: LOGIN_SUCCESS, payload: success_payload })
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })
export const logout = () => ({ type: LOGOUT })
export const updateField = (formName, fieldName, value) => ({
  type: 'UPDATE_FIELD',
  payload: { formName, fieldName, value },
})

export const submitForm = (formName, formData) => ({
  type: 'SUBMIT_FORM',
  payload: { formName, formData },
})
