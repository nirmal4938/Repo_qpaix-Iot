import { combineReducers } from 'redux'
// import AuthReducer from './reducers/AuthReducer'
// import AuthReducer from './reducers/authReducer'
import AuthReducer from './reducers/AuthReducer'
import LayoutReducer from './reducers/LayoutReducer'
import ClientReducer from './reducers/ClientReducer'
import TankReducer from './reducers/TankReducer'
import ConstantReducer from './reducers/ConstantReducer'
const RootReducer = combineReducers({
  auth: AuthReducer,
  layout: LayoutReducer,
  clientPesonal: ClientReducer,
  tank: TankReducer,
  constant: ConstantReducer,
  // cient reducer
  // Add other reducers here if needed
})

export default RootReducer
