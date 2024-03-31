import * as React from 'react'
const TankValveConnectorPipeComponent = ({ innerStyle }) => (
  <svg
    width={300}
    height={200}
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
    <g style={{ position: 'absolute !important', left: '29px !important' }}>
      <rect
        x={15}
        y={115}
        width={100}
        height={30}
        fill="url(#pipeGradient)"
        transform="rotate(-90 30 130)"
      />
      <rect x={30} y={130} width={200} height={30} fill="url(#pipeGradient)" />
      <circle
        cx={30}
        cy={145}
        r={15}
        fill="url(#pipeGradient)"
        stroke="url(#pipeGradient)"
        strokeWidth={2}
      />
    </g>
  </svg>
)
export default TankValveConnectorPipeComponent
