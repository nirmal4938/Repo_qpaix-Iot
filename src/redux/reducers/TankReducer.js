const initialState = {
  tankData: {
    id: null,
    location: '',
    hwUniqueNo: '',
    tankType: '',
    tankName: '',
    tankCapacity: '',
    ltMinRange: '',
    ltMaxRange: '',
    ltMinCount: '',
    ltMaxCount: '',
    description: '',
    createdDate: '',
    updatedDate: '',
    createdBy: '',
    updatedBy: '',
    isActive: null,
    isDeleted: null,
  },
  tankList: [],
}

const TankReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TANK_FIELD':
      const { fieldName, value } = action.payload
      return {
        ...state,
        tankData: {
          ...state.tankData,
          [fieldName]: value,
        },
      }
    // ... other cases
    default:
      return state
  }
}

export default TankReducer
