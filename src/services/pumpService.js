import api from './api'

// Function to create a new client
export const createPump = async (pumpData) => {
  try {
    const response = await api.post('/pump', pumpData)
    return response.data
  } catch (error) {
    return error
  }
}

// Function to update a client by ID
export const updatePumpById = async (data) => {
  try {
    const response = await api.post(`/pump`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating Pump  ${data?.encryptedId}:`, error)
    // throw error
    return error
  }
}

// Function to get all clients
export const getAllPump = async () => {
  try {
    const response = await api.get('/pump/')
    return response.data
  } catch (error) {
    console.error('Error getting all pump:', error)
    // throw error
    return error
  }
}

// Function to get a client by ID
export const getPumpById = async (id) => {
  try {
    const response = await api.get(`/pump/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting pump with ID ${id}:`, error)
    // throw error
    return error
  }
}

// Function to delete a client by ID
export const deletePumpById = async (id) => {
  try {
    const response = await api.delete(`/pump/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting pump with ID ${id}:`, error)
    // throw error
    return error
  }
}

export default {
  createPump,
  updatePumpById,
  getAllPump,
  getAllPump,
  deletePumpById,
}
