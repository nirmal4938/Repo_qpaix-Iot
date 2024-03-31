import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import authRoutes from '../authRoutes'

const AuthAppContent = () => {
  return (
    // <CContainer className="px-1 m-0" lg>
    //   <Suspense fallback={<CSpinner color="primary" />}>
    <Routes>
      {authRoutes.map((route, idx) => {
        return (
          route && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          )
        )
      })}
    </Routes>
    //   </Suspense>
    // </CContainer>
  )
}

export default React.memo(AuthAppContent)
