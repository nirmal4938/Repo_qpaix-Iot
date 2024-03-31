import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import { ForgotPassword } from '../auth/ForgotPassword'
import { ResetPassword } from './ResetPassword'
import { ClientActivationAccount } from './ClientActivationAccount'
export const index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/activate-client-account/*" element={<ClientActivationAccount />} />
        <Route path={`/reset-password/:token/*`} element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </React.Fragment>
  )
}
