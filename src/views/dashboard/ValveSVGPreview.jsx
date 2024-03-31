import * as React from 'react'
const ValveSVGComponent = ({ innerStyle }) => (
  <svg
    width={250}
    height={250}
    viewBox="-100 -50 300 200"
    style={innerStyle}
    xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <defs>
      <radialGradient id="bodyGradient" cx={30} cy={30} r={30} fx={30} fy={30}>
        <stop offset="80%" stopColor="white" />
        <stop offset="100%" stopColor="gray" />
      </radialGradient>
      <linearGradient id="valvePipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="gray" />
        <stop offset="30%" stopColor="white" />
        <stop offset="70%" stopColor="white" />
        <stop offset="100%" stopColor="gray" />
      </linearGradient>
    </defs>
    <ellipse
      cx={30}
      cy={30}
      rx={28}
      ry={28}
      stroke="gray"
      strokeWidth={2}
      fill="url(#bodyGradient)"
    />
    <path d="M 42 30 h -24" stroke="#0077FF" strokeWidth={24} strokeDasharray="3,1">
      <animate attributeName="stroke-dashoffset" dur="3s" values="0;24" repeatCount="indefinite" />
    </path>
    <rect
      x={15}
      y={15}
      width={30}
      height={30}
      stroke="#777"
      strokeWidth={2}
      fill="none"
      rx={1}
      ry={1}
    />
    <rect id="cover" x={15} y={15} width={24} height={30} stroke="#333" strokeWidth={2} fill="#fff">
      <animate attributeName="width" dur="0.2s" from={24} to={6} fill="freeze" />
    </rect>
    <rect x={25} y={-30} width={10} height={30} stroke="#333" strokeWidth={2} fill="#555" />
    <path
      d="M 0 0 C 0 -30 60 -30 60 0 Z"
      transform="translate(0, -20)"
      stroke="#333"
      strokeWidth={2}
      rx={5}
      ry={5}
      fill="#666"
    />
    <text x={30} y={85} fontSize={14} textAnchor="middle" fill="#350100">
      {'\n          Valve\n        '}
    </text>
    <g>
      <rect x={-25} y={15} width={30} height={30} fill="url(#valvePipeGradient)" />
      <rect x={55} y={15} width={30} height={30} fill="url(#valvePipeGradient)" />
      <rect x={80} y={8} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
      <rect x={-30} y={9} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
    </g>
  </svg>
)
export default ValveSVGComponent
