import api from './api'

// Function to create a new client
export const createTank = async (tankData) => {
  try {
    console.log('pumpData', tankData)
    const response = await api.post('/tanklevel/', tankData)
    return response.data
  } catch (error) {
    return error
  }
}

// Function to update a client by ID
export const updateTankById = async (data) => {
  try {
    const response = await api.post(`/tanklevel`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating tank  ${data?.encryptedId}:`, error)
    // throw error
    return error
  }
}

// Function to get all clients
export const getAllTank = async () => {
  try {
    const response = await api.get('/tanklevel/')
    return response.data
  } catch (error) {
    console.error('Error getting all tank:', error)
    // throw error
    return error
  }
}

// Function to get a client by ID
export const getTankById = async (id) => {
  try {
    const response = await api.get(`/tanklevel/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting tank with ID ${id}:`, error)
    // throw error
    return error
  }
}

// Function to delete a client by ID
export const deleteTankById = async (id) => {
  try {
    const response = await api.delete(`/tanklevel/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting tank with ID ${id}:`, error)
    // throw error
    return error
  }
}

export default {
  createTank,
  updateTankById,
  getAllTank,
  getTankById,
  deleteTankById,
}
