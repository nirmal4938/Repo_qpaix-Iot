import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/AuthAction'
const initialState = {
  user: {
    // encryptedId: '',
    // personName: '',
    // contactNo: '',
    // description: '',
    // email: '',
    // password: '',
    encryptedId: '',
    fname: 'nirmal',
    lname: '',
    mname: '',
    contactNo: '',
    description: '',
    emailId: '',
  },
  jwtToken: '',
  loading: '',
  message: '',
  isLoggedIn: true,
}
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, message: null }
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: action.payload.user,
        jwtToken: action.payload.jwtToken,
        message: action.payload.message,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        jwtToken: null,
        loading: false,
        message: null,
      }
    case 'UPDATE_FIELD':
      const { formName, fieldName, value } = action.payload
      let keys = `${formName}.${fieldName}`
      console.log('keys', keys)
      return updateNestedField(state, keys, value)
    case 'SUBMIT_FORM':
      // Handle form submission logic based on the formName and formData
      console.log(`Form submitted: ${action.payload.formName}`, action.payload.formData)
      return state
    // ... other cases
    default:
      return state
  }
}
const updateNestedField = (state, relativePath, value) => {
  const keys = relativePath.split('.')

  // Ensure the state is not mutated
  let updatedState = { ...state }

  // Traverse the path and update the nested structure
  let currentLevel = updatedState
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    currentLevel[key] = { ...currentLevel[key] }
    currentLevel = currentLevel[key]
  }
  // Update the final property with the new value
  currentLevel[keys[keys.length - 1]] = value
  return updatedState
  // 2.15
}

export default AuthReducer
