import React, { useEffect } from 'react'
import { gsap } from 'gsap'
const TankSVGComponent = ({ innerStyle }) => {
  useEffect(() => {
    let data = {
      waterLevel: 30,
    }
    gsap.to('#v-18', { height: 200, duration: 1 })
    const liquid = document.getElementById('v-18')
    if (data.waterLevel > 80) {
      liquid.setAttribute('fill', 'red')
    } else {
      liquid.setAttribute('fill', 'blue')
    }
  }, [])

  function updateSVG(data) {
    // Update water level in the tank
    const waterLevel = 200 - data.waterLevel * 2
    gsap.to('#v-18', { height: waterLevel, duration: 1 })
    const liquid = document.getElementById('v-18')
    console.log('Liquid recr', liquid)
    if (data.waterLevel > 80) {
      liquid.setAttribute('fill', 'red')
    } else {
      liquid.setAttribute('fill', 'blue')
    }
  }
  // document.getElementById('waterLevelText').textContent = `${data.waterLevel.toFixed(2)}%`
  // Update pump status
  // if (data.pumpStatus === 'on') {
  //   document.getElementById('pump').setAttribute('fill', 'green')
  //   document.getElementById('pumpStatusText').textContent = 'Status: On'
  // } else {
  //   document.getElementById('pump').setAttribute('fill', 'red')
  //   document.getElementById('pumpStatusText').textContent = 'Status: Off'
  // }
  // Simulated real-time data update (replace with actual data fetching)

  setInterval(() => {
    const data = {
      waterLevel: Math.random() * 100,
      pumpStatus: Math.random() > 0.5 ? 'on' : 'off',
    }
    // updateSVG(data)
  }, 2000)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={350}
      viewBox="0 0 200 350"
      fill="none"
      style={innerStyle}
    >
      <defs>
        <linearGradient id="linearGradientv-2-549212387" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: '#dbdbdb',
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: '#9d9d9d',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      <rect
        joint-selector="body"
        id="v-5"
        stroke="gray"
        strokeWidth={4}
        x={20}
        y={50}
        width={160}
        height={300}
        rx={120}
        ry={10}
        fill="url(#linearGradientv-2-549212387)"
      />
      <g
        model-id="1a489b74-2fd3-4881-ac8b-49871503fded"
        data-type="Panel"
        id="j_2"
        className="joint-cell joint-type-panel joint-element joint-theme-default"
        magnet-selector="panelBody"
        transform="translate(55,100)"
      >
        <rect
          joint-selector="panelBody"
          id="v-13"
          x={0}
          y={0}
          width={95}
          height={230}
          rx={1}
          ry={1}
          fill="lightgray"
          stroke="gray"
          strokeWidth={1}
        />
        <path
          joint-selector="panelTicks"
          id="v-15"
          transform="translate(55, 15)"
          d="M 0 0 h 8 M 0 20 h 8 M 0 40 h 8 M 0 60 h 8 M 0 80 h 8 M 0 100 h 8 M 0 120 h 8 M 0 140 h 8 M 0 160 h 8 M 0 180 h 8 M 0 200 h 8"
          fill="none"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <text
          joint-selector="panelValues"
          id="v-16"
          fontSize={14}
          xmlSpace="preserve"
          textAnchor="middle"
          x={80}
          y={10}
          fontFamily="sans-serif"
        >
          <tspan dy="0.8em" className="v-line" color="blue" stroke="blue">
            100
          </tspan>
          <tspan dy="20" x="80" className="v-line" color="blue" stroke="blue">
            {'90'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'80'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'70'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'60'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'50'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'40'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'30'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'20'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'10'}
          </tspan>
          <tspan dy={20} x={80} className="v-line" color="blue" stroke="blue">
            {'0'}
          </tspan>
        </text>
        <g
          joint-selector="panelWindow"
          id="v-14"
          transform="translate(10, 10) rotate(180) translate(-40,-205)"
        >
          <rect
            joint-selector="glass"
            id="v-19"
            x={0}
            y={0}
            width={40}
            height={200}
            fill="blue"
            stroke="none"
            fillOpacity={0.1}
          />
          <rect
            joint-selector="liquid"
            id="v-18"
            x={0}
            y={0}
            width={40}
            height={0}
            stroke="black"
            strokeWidth={2}
            strokeOpacity={0.2}
            fill="blue"
          />
          <rect
            joint-selector="frame"
            id="v-17"
            width={40}
            height={200}
            rx={1}
            ry={1}
            fill="none"
            stroke="black"
            strokeWidth={3}
          />
        </g>
      </g>
    </svg>
  )
}
export default TankSVGComponent
