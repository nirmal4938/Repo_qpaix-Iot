import * as React from 'react'
const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={400}
    height={400}
    viewBox="0 0 124 124"
    fill="none"
    {...props}
  >
    {'-->\n'}
    <svg xmlns="http://www.w3.org/2000/svg" width={230} height={230} {...props}>
      <g transform="rotate(-90, 125, 125)">
        <rect
          joint-selector="panelBody"
          id="v-13"
          x={0}
          y={0}
          width={80}
          height={230}
          rx={1}
          ry={1}
          fill="lightgray"
          stroke="gray"
          strokeWidth={2}
        />
        <path
          joint-selector="panelTicks"
          id="v-15"
          transform="translate(25, 15)"
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
          x={40}
          y={10}
          fontFamily="sans-serif"
        >
          <tspan dy="0.8em" className="v-line" fill="blue" stroke="blue">
            {'\n            100\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            90\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            80\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            70\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            60\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            50\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            40\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            30\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            20\n        '}
          </tspan>
          <tspan dy={20} x={60} className="v-line" fill="blue" stroke="blue">
            {'\n            10\n        '}
          </tspan>
          <tspan dy={20} x={50} className="v-line" fill="blue" stroke="blue">
            {'\n            0\n        '}
          </tspan>
        </text>
      </g>
    </svg>
  </svg>
)
export default SVGComponent
