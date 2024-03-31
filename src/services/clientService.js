import api from './api'

// Function to create a new client
export const createClient = async (clientData) => {
  try {
    const response = await api.post('/client/registerOrUpdate', clientData)
    return response.data
  } catch (error) {
    console.error('Error creating client:', error)
    return error.response?.data
    // throw error
  }
}

// Function to update a client by ID
export const updateClientById = async (clientData) => {
  try {
    const response = await api.post(`/client/registerOrUpdate`, clientData)
    return response.data
  } catch (error) {
    console.error(`Error updating client with ID:`, error)
    return error.response?.data

    // throw error
  }
}

// Function to get all clients
export const getAllClients = async () => {
  try {
    const response = await api.get('/client/')
    return response.data
  } catch (error) {
    console.error('Error getting all clients:', error)
    return error.response?.data

    // throw error
  }
}

// Function to get a client by ID
export const getClientById = async (clientId) => {
  try {
    const response = await api.get(`/client/${clientId}`)
    return response.data
  } catch (error) {
    console.error(`Error getting client with ID ${clientId}:`, error)
    return error.response?.data

    // throw error
  }
}

// Function to delete a client by ID
export const deleteClientById = async (clientId) => {
  try {
    const response = await api.delete(`/client/${clientId}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting client with ID ${clientId}:`, error)
    return error.response?.data

    // throw error
  }
}

export default {
  createClient,
  updateClientById,
  getAllClients,
  getClientById,
  deleteClientById,
}
