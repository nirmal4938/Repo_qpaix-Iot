import { SET_INITIAL_DATA } from '../actions/ConstantAction'
const initialState = {
  countries: [],
  states: [],
}

const ConstantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_DATA:
      return {
        ...state,
        countries: action.payload.countries,
        states: action.payload.states,
      }
    // ... other cases
    default:
      return state
  }
}

export default ConstantReducer
