import React, { useState } from 'react'
import '../scss/auth_template/_auth_header.scss'
import PropTypes from 'prop-types'
import { Menubar } from 'primereact/menubar'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthHeaderComponent = ({ title }) => {
  const navigate = useNavigate()
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', url: '/' },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-user',
      command: () => {
        navigate('/auth/login')
      },
    },
  ]

  return (
    <div className="header-container">
      <div className="header-menubar">
        <Menubar
          model={items}
          start={<div className="title">{title}</div>}
          className="w-full justify-content-between, border-none"
        />
      </div>
    </div>
  )
}
AuthHeaderComponent.propTypes = {
  title: PropTypes.any,
}
export default AuthHeaderComponent
