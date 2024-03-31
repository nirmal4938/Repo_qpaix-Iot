export const updateTankData = (fieldName, value) => ({
  type: 'UPDATE_TANK_FIELD',
  payload: { fieldName, value },
})
