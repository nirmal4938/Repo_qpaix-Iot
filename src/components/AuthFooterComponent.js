// AuthFooter.js
import React from 'react'
import '../scss/auth_template/_auth_footer.scss'
import { Button } from 'primereact/button'

const AuthFooterComponent = () => {
  return (
    <div className="w-full surface-300 bg-indigo-100 p-4">
      <div className="flex justify-content-evenly flex-column  sm:flex-row">
        <div className="section-self">
          <div className="self-parent">
            <div className="logo-title">
              <span>
                © 2024 <h4>NetControl Hub</h4>
              </span>
            </div>
          </div>
        </div>
        <div className="section-product">
          <div className="product-parent">
            <div className="section-name mb-3">
              <h5>Products</h5>
            </div>
            <div className="section-items">
              <p className="section-item">Product1</p>
            </div>
          </div>
        </div>
        <div className="section-solutions">
          <div className="solution-parent">
            <div className="section-name mb-3">
              <h5>Solutions</h5>
            </div>
            <div className="section-items">
              <p className="section-item">Solution1</p>
            </div>
          </div>
        </div>
        <div className="section-resources">
          <div className="resources-parent">
            <div className="section-name mb-3">
              <h5>Resources</h5>
            </div>
            <div className="section-items">
              <p className="section-item">Resource1</p>
            </div>
          </div>
        </div>
        <div className="section-about-us">
          <div className="about-us-parent">
            <div className="section-name mb-3">
              <h5>About Us</h5>
            </div>
            <div className="section-items">
              <p className="section-item">About us 1</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid justify-content-between align-content-center">
        <div className="col-12 md:col-6 text-center md:text-left">
          <span>© 2024 Qpaix Infitech</span>
        </div>
        <div className="col-12 md:col-6 text-center md:text-right">
          <Button label="Privacy Policy" className="p-button-text p-button-sm" />
          <Button label="Terms of Use" className="p-button-text p-button-sm" />
        </div>
      </div> */}
    </div>
  )
}

export default AuthFooterComponent
