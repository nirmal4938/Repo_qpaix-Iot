import React, { useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch'
const ManualValveSVGComponent = ({ innerStyle }) => {
  const [checked, setChecked] = useState(true)
  return (
    <svg
      width={150}
      height={140}
      viewBox="-100 -50 250 100"
      xmlns="http://www.w3.org/2000/svg"
      style={innerStyle}
    >
      <defs>
        <radialGradient id="bodyGradient" cx={30} cy={30} r={30} fx={30} fy={30}>
          <stop offset="10%" stopColor="gray" />
          <stop offset="40%" stopColor="white" />
          <stop offset="50%" stopColor="white" />
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
      {checked && (
        <>
          <path d="M 42 30 h -24" stroke="#0077FF" strokeWidth={24} strokeDasharray="3,1">
            <animate
              attributeName="stroke-dashoffset"
              dur="3s"
              values="0;24"
              repeatCount="indefinite"
            />
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
        </>
      )}

      <path
        d="M 0 0 C 0 -30 60 -30 60 0 Z"
        transform="translate(0, -20)"
        stroke="#333"
        strokeWidth={2}
        rx={5}
        ry={5}
        fill="#666"
      />
      <foreignObject x={5} y={65} width={55} height={30}>
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
          </div>
        </body>
      </foreignObject>
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
      <text x={30} y={130} fontSize={14} textAnchor="middle" fill="#350100">
        {'\n            Valve\n          '}
      </text>
      <g>
        <rect x={-25} y={15} width={30} height={30} fill="url(#valvePipeGradient)" />
        <rect x={55} y={15} width={30} height={30} fill="url(#valvePipeGradient)" />
        <rect x={80} y={8} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
        <rect x={-30} y={8} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
      </g>
    </svg>
  )
}
export default ManualValveSVGComponent
