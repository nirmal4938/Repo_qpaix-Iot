import { Button } from 'primereact/button'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Styled components for the dialog
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000; /* Ensure it's on top */
`

const DialogWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1001; /* Ensure it's on top of overlay */
`

const Header = styled.div`
  padding: 16px;
  background-color: #f0f0f0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 18px;
  font-weight: 450;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Body = styled.div`
  padding: 16px;
`

const Footer = styled.div`
  padding: 16px;
  background-color: #f0f0f0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`
export const Signal = styled.i.attrs((props) => ({
  className: props.className || '',
}))`
  font-size: ${({ size }) => size || '24px'};
  color: ${({ color }) => color || 'black'};
`

const Icon = styled.i.attrs((props) => ({
  className: props.className || '',
}))`
  font-size: ${({ size }) => size || '24px'};
  color: ${({ color }) => color || 'black'};
`
// const Button = styled.button`
//   margin-left: 8px;
// `

// Custom Dialog component
const ConfirmDialog = ({ isOpen, onClose, message, onConfirm, onCancel }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <DialogWrapper isOpen={isOpen}>
        <Header>
          {' '}
          <span
            className="pi pi-info-circle"
            style={{
              color: '#2196f3',
              fontSize: '20px',
            }}
          ></span>{' '}
          Confirmation
        </Header>
        <Body>{message}</Body>
        <Footer>
          {/* <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button> */}
          <Button
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            onClick={onCancel}
            raised
            outlined
          />
          <Button icon="pi pi-check" aria-label="Filter" onClick={onConfirm} raised />
        </Footer>
      </DialogWrapper>
    </>
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ConfirmDialog
