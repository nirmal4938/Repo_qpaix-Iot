import api from './api'

// Function to create a new client
export const createLocation = async (locationData) => {
  try {
    const response = await api.post('/client/location', locationData)
    return response.data
  } catch (error) {
    console.error('Error creating location:', error)
    return error.response.data
    // throw error
  }
}

// Function to update a client by ID
export const updateLocationById = async (locationData) => {
  try {
    const response = await api.post(`/client/location/`, locationData)
    return response.data
  } catch (error) {
    console.error(`Error updating location with ID`, error)
    return error.response.data

    // throw error
  }
}

// Function to get all clients
export const getAllLocation = async () => {
  try {
    const response = await api.get('/client/location')
    return response.data
  } catch (error) {
    console.error('Error getting all location:', error)
    return error.response.data

    // throw error
  }
}

// Function to get a client by ID
export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/client/location/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting location with ID ${id}:`, error)
    return error.response.data

    // throw error
  }
}

// Function to delete a client by ID
export const deleteLocationById = async (clientId) => {
  try {
    const response = await api.delete(`/client/location/${clientId}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting location with ID ${clientId}:`, error)
    return error.response.data

    // throw error
  }
}

export default {
  createLocation,
  updateLocationById,
  getAllLocation,
  getLocationById,
  deleteLocationById,
}
