import { createStore, applyMiddleware, compose } from 'redux'
import RootReducer from '../RootReducer'
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
}
const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)))
const persistor = persistStore(store)
export { store, persistor }
