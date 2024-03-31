import React from 'react'
import { Chart } from 'primereact/chart'

const LineGraph = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="card">
      <Chart type="line" data={data} options={options} />
    </div>
  )
}

export default LineGraph
