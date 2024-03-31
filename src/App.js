import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from './views/auth/hooks/useAuth'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
import AuthLayout from './layout/AuthLayout'
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// import DefaultLayout from './layout/DefaultLayout'

const App = () => {
  const { isLoggedIn } = useAuth()
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.layout.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter basename="/">
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/auth/*"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthLayout />}
          />
          <Route path="/" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/auth" />} />
          <Route path="*" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/auth" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
