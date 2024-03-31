import { fetchCountriesAndStates } from '../../services/constantService'

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA'

export const fetchInitialData = () => {
  return async (dispatch) => {
    try {
      const { countries, states } = await fetchCountriesAndStates()
      dispatch(setInitialData(countries, states))
    } catch (error) {
      // Handle error if necessary
      console.log('error in ConstantAction.js', error)
    }
  }
}

export const setInitialData = (countries, states) => ({
  type: SET_INITIAL_DATA,
  payload: { countries, states },
})
