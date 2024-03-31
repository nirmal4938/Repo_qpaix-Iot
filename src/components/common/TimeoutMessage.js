import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'primereact/message'

const TimeoutMessage = ({ text, timeout, severity, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose && onClose() // Call the onClose callback if provided
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout, onClose])

  return isVisible ? <Message text={text} severity={severity} className="w-full" /> : null
}

TimeoutMessage.propTypes = {
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

export default TimeoutMessage
