import React, { useEffect } from 'react'
import '../../scss/auth_template/_auth_home.scss'
export const HomePage = () => {
  const HeroSection = () => {
    return (
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-slogan">Harnessing Data Dynamics with SCADA Brilliance</h1>
          <p>Your compelling message or slogan goes here.</p>
          <a href="#" className="btn">
            Get Started
          </a>
        </div>
      </div>
    )
  }
  return (
    <React.Fragment>
      <HeroSection />
    </React.Fragment>
  )
}
