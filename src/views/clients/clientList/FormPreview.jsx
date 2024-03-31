import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Preview = ({ previews }) => {
  const TitleWrapper = styled.div`
    text-align: start;
    margin-bottom: 10px;
    background: #607d8b;
  `

  const TitleText = styled.h1`
    font-size: 18px;
    color: #fff;
    padding: 5px !important;
  `
  return (
    <React.Fragment>
      {previews?.map(({ Component, props, title }, index) => (
        <div key={index}>
          {console.log('props', props.value)}
          {/* Render each component with its props */}
          <TitleWrapper>
            <TitleText>{title}</TitleText>
          </TitleWrapper>
          <Component {...props} />
        </div>
      ))}
    </React.Fragment>
  )
}
Preview.propTypes = {
  previews: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.any,
}
