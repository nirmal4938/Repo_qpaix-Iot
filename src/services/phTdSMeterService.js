import api from './api'

// Function to create a new client
export const createPhTdSMeter = async (flowmeterData) => {
  try {
    console.log('flowmeterData', flowmeterData)
    const response = await api.post('/phtdsmeter/', flowmeterData)
    return response.data
  } catch (error) {
    return error
  }
}

// Function to update a client by ID
export const updatePhTdSMeterById = async (data) => {
  try {
    const response = await api.post(`/phtdsmeter`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating Flowmeter  ${data?.encryptedId}:`, error)
    // throw error
    return error
  }
}

// Function to get all clients
export const getAllPhTdSMeter = async () => {
  try {
    const response = await api.get('/phtdsmeter/')
    return response.data
  } catch (error) {
    console.error('Error getting all flowmeter:', error)
    // throw error
    return error
  }
}

// Function to get a client by ID
export const getPhTdSMeterById = async (flowmeterId) => {
  try {
    const response = await api.get(`/phtdsmeter/${flowmeterId}`)
    return response.data
  } catch (error) {
    console.error(`Error getting flowmeter with ID ${flowmeterId}:`, error)
    // throw error
    return error
  }
}

// Function to delete a client by ID
export const deletePhTdSMeterById = async (flowmeterId) => {
  try {
    const response = await api.delete(`/phtdsmeter/${flowmeterId}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting flowmeter with ID ${flowmeterId}:`, error)
    // throw error
    return error
  }
}

export default {
  createPhTdSMeter,
  updatePhTdSMeterById,
  getAllPhTdSMeter,
  getPhTdSMeterById,
  deletePhTdSMeterById,
}
