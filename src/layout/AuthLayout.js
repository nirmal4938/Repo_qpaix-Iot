// AuthLayout.js
import React from 'react'
import AuthHeaderComponent from '../components/AuthHeaderComponent'
import AuthAppContent from '../components/AuthAppContent'
import AuthFooterComponent from '../components/AuthFooterComponent'
import Login from '../views/pages/login/Login'

// import Register from '../views/pages/register/Register'

const AuthLayout = () => {
  return (
    <>
      <div className="w-full">
        <AuthHeaderComponent title={'NetControl Hub'} />
        <div className="body flex-grow-1">
          <AuthAppContent />
        </div>
        <AuthFooterComponent />
      </div>
    </>
  )
}

export default AuthLayout
