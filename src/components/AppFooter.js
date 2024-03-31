import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Qpaix Infitech
        </a>
        <span className="ms-1">&copy; 2024.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed & Maintained by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Qpaix Infitech.
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
