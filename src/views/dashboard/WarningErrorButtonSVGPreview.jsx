import * as React from 'react'
const WarningErrorButtonSVGComponent = ({ innerStyle, ...props }) => (
  <svg width={100} height={100} xmlns="http://www.w3.org/2000/svg" style={innerStyle} {...props}>
    <defs>
      <radialGradient id="warning_btn_defauilt_gradient" cx="50%" cy="50%" r="75%">
        <stop
          offset="0%"
          style={{
            stopColor: 'gray',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: 'black',
            stopOpacity: 1,
          }}
        />
      </radialGradient>
      <radialGradient id="warning_btn_error_gradient" cx="50%" cy="50%" r="75%">
        <stop
          offset="0%"
          style={{
            stopColor: 'lightcoral',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: 'red',
            stopOpacity: 1,
          }}
        />
      </radialGradient>
      {'\n    \n    warning_btn_success_gradient\n  '}
    </defs>
    <circle
      cx={50}
      cy={50}
      r={25}
      fill="url(#warning_btn_defauilt_gradient)"
      stroke="gray"
      strokeWidth={1}
    />
    <circle
      cx={50}
      cy={50}
      r={21}
      fill="url(#warning_btn_error_gradient)"
      stroke="gray"
      strokeWidth={1}
    />
  </svg>
)
export default WarningErrorButtonSVGComponent
