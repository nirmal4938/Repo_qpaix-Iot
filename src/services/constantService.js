import api from './api'

export const fetchCountriesAndStates = async () => {
  try {
    const [countriesResponse, statesResponse] = await Promise.all([
      api.get('client/countries'),
      api.get('client/states'),
    ])

    // if (!countriesResponse.ok) {
    //   throw new Error('Failed to fetch countries')
    // }
    // if (!statesResponse.ok) {
    //   throw new Error('Failed to fetch states')
    // }
    let countries, states
    if (countriesResponse?.status === 200 && countriesResponse?.status === 200) {
      countries = countriesResponse?.data
      states = statesResponse?.data
    }

    return { countries, states }
  } catch (error) {
    // Handle error if necessary
    console.error('Error fetching countries and states:', error)
    // throw error
    return error
  }
}
