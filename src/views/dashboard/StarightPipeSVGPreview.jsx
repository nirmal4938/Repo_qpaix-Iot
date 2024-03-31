import * as React from 'react'
const StraightPipeSVGComponent = ({ innerStyle, pipeWidth }) => (
  <svg
    width={200}
    height={35}
    viewBox=""
    x={20}
    y={400}
    xmlns="http://www.w3.org/2000/svg"
    style={innerStyle}
  >
    <defs>
      <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="blue" />
        <stop offset="50%" stopColor="white" />
        <stop offset="50%" stopColor="white" />
        <stop offset="100%" stopColor="blue" />
      </linearGradient>
    </defs>
    <g>
      <rect x={0} y={0} width={pipeWidth} height={30} fill="url(#pipeGradient)" />
    </g>
  </svg>
)
export default StraightPipeSVGComponent
