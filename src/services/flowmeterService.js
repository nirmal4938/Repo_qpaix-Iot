import api from './api'

// Function to create a new client
export const createFlowmeter = async (flowmeterData) => {
  try {
    console.log('flowmeterData', flowmeterData)
    const response = await api.post('/flowmeter/', flowmeterData)
    return response.data
  } catch (error) {
    return error
  }
}

// Function to update a client by ID
export const updateFlowmeterById = async (data) => {
  try {
    const response = await api.post(`/flowmeter`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating Flowmeter  ${data?.encryptedId}:`, error)
    // throw error
    return error
  }
}

// Function to get all clients
export const getAllFlowmeter = async () => {
  try {
    const response = await api.get('/flowmeter/')
    return response.data
  } catch (error) {
    console.error('Error getting all flowmeter:', error)
    // throw error
    return error
  }
}

// Function to get a client by ID
export const getFlowmeterById = async (flowmeterId) => {
  try {
    const response = await api.get(`/flowmeter/${flowmeterId}`)
    return response.data
  } catch (error) {
    console.error(`Error getting flowmeter with ID ${flowmeterId}:`, error)
    // throw error
    return error
  }
}

// Function to delete a client by ID
export const deleteFlowmeterById = async (flowmeterId) => {
  try {
    const response = await api.delete(`/flowmeter/${flowmeterId}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting flowmeter with ID ${flowmeterId}:`, error)
    // throw error
    return error
  }
}

export default {
  createFlowmeter,
  updateFlowmeterById,
  getAllFlowmeter,
  getFlowmeterById,
  deleteFlowmeterById,
}
