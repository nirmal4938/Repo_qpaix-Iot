const initialState = {
  clientInfo: {
    clientName: 'Nirmal',
    address: '',
    city: '',
    state: '',
    country: '',
    description: '',
  },
  contactPersonInfo: {
    personName: { firstName: '', middleName: '', lastName: '' },
    emailId: '',
    contactNo: '',
    description: '',
  },
}

// ... other forms

const ClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CLIENT_FIELD':
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
}

export default ClientReducer
