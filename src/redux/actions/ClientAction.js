export const updateClientField = (formName, fieldName, value) => ({
  type: 'UPDATE_CLIENT_FIELD',
  payload: { formName, fieldName, value },
})

export const submitClientForm = (formName, formData) => ({
  type: 'SUBMIT_FORM',
  payload: { formName, formData },
})
