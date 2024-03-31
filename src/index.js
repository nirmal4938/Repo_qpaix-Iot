import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import 'primereact/resources/themes/saga-blue/theme.css' // Theme
import 'primereact/resources/primereact.min.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { store, persistor } from './redux/store/ConfigureStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    <ToastContainer position="bottom-right" hideProgressBar={true} />
  </Provider>,
)

reportWebVitals()
