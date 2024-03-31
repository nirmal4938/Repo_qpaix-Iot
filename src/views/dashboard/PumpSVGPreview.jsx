import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PumpSVGComponent = ({ innerStyle }) => {
  const checkboxRef = useRef(null)
  const rotorRef = useRef(null)
  let rotationTimeline = gsap.timeline({ paused: true, repeat: -1 })

  useEffect(() => {
    const checkbox = checkboxRef.current
    const rotor = rotorRef.current

    const handleCheckboxChange = () => {
      if (checkbox.checked) {
        rotationTimeline
          .to(rotor, {
            rotation: 360,
            transformOrigin: 'center',
            duration: 2,
            ease: 'power0.out',
          })
          .play()
      } else {
        rotationTimeline.pause(0).clear()
      }
    }

    checkbox.addEventListener('change', handleCheckboxChange)

    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange)
      rotationTimeline.pause(0).clear()
    }
  }, [])

  return (
    <svg
      id="pumpSvg"
      width={300}
      height={300}
      viewBox="-100 -50 300 200"
      x={250}
      // {...props}
      style={innerStyle}
    >
      <foreignObject width={20} height={20} x={5} y={5}>
        <input type="checkbox" id="pumpCheckbox" ref={checkboxRef} />
      </foreignObject>

      <rect x={-20} y={44} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
      <ellipse
        id="body"
        cx={50}
        cy={50}
        rx={40}
        ry={40}
        stroke="gray"
        strokeWidth={2}
        fill="lightgray"
      />
      <PipeGradient id="inletPipeGradient" />
      <rect
        x={50}
        y={50}
        width={40}
        height={30}
        fill="url(#inletPipeGradient)"
        transform="translate(-60, 0)"
        zIndex={1000}
      />
      <PipeGradient id="outletPipeGradient" />
      <rect
        x={0}
        y={20}
        width={40}
        height={30}
        fill="url(#outletPipeGradient)"
        transform="translate(70, 0)"
      />
      <rect x={110} y={14} width={10} height={42} stroke="gray" strokeWidth={3} fill="white" />
      <text x={50} y={110} fontSize={14} textAnchor="middle" fontFamily="sans-serif" fill="#350100">
        {'Pump'}
      </text>
      <g id="rotorGroup" transform="translate(50,50)" cursor="pointer">
        <circle id="rotorFrame" r={40} fill="#eee" stroke="#666" strokeWidth={2} />
        <circle
          id="rotorBackground"
          r={34}
          fill="#777"
          stroke="#222"
          strokeWidth={1}
          style={{
            transition: 'fill 0.5s ease-in-out',
          }}
        />
        <path
          id="rotor"
          d="M 0 0 V 30 l -10 -22.5 Z M 0 0 V -30 l 10 22.5 Z M 0 0 H 30 l -22.5 10 Z M 0 0 H -30 l 22.5 -10 Z"
          stroke="#222"
          strokeWidth={3}
          fill="#bbb"
          ref={rotorRef}
        />
      </g>
    </svg>
  )
}

const PipeGradient = ({ id }) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="gray" stopOpacity={1} />
      <stop offset="30%" stopColor="white" stopOpacity={1} />
      <stop offset="70%" stopColor="white" stopOpacity={1} />
      <stop offset="100%" stopColor="gray" stopOpacity={1} />
    </linearGradient>
  </defs>
)

export default PumpSVGComponent
