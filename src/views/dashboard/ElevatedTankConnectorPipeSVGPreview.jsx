import * as React from 'react'
const ElevatedTankConnectorSVGComponent = ({ innerStyle }) => (
  <svg
    width={260}
    height={400}
    viewBox=""
    x={500}
    y={120}
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
      <rect
        x={45}
        y={285}
        width={240}
        height={30}
        fill="url(#pipeGradient)"
        transform="rotate(-90 60 300)"
      />
      <rect x={0} y={300} width={60} height={30} fill="url(#pipeGradient)" />
      <circle
        cx={60}
        cy={315}
        r={15}
        fill="url(#pipeGradient)"
        stroke="url(#pipeGradient)"
        strokeWidth={2}
      />
      <rect x={60} y={60} width={180} height={30} fill="url(#pipeGradient)" />
      <circle
        cx={60}
        cy={75}
        r={15}
        fill="url(#pipeGradient)"
        stroke="url(#pipeGradient)"
        strokeWidth={2}
      />
      <rect
        x={225}
        y={75}
        width={100}
        height={30}
        fill="url(#pipeGradient)"
        transform="rotate(90 240 90)"
      />
      <circle
        cx={240}
        cy={75}
        r={15}
        fill="url(#pipeGradient)"
        stroke="url(#pipeGradient)"
        strokeWidth={2}
      />
    </g>
  </svg>
)
export default ElevatedTankConnectorSVGComponent
