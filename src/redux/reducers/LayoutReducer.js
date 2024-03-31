const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LAYOUT':
      const { fieldName, value } = action.payload
      return {
        ...state,
        [fieldName]: value,
      }
    // ... other cases
    default:
      return state
  }
}

export default LayoutReducer
