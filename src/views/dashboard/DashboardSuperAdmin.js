import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import classNames from 'classnames'
import styled from 'styled-components'
import { TankDiagram } from './TankDiagram'
import { PumpDiagram } from './PumpDiagram'
import { FlowmeterDiagram } from './FlowmeterDiagram'
import { PH_TDSDiagram } from './PH_TDSDiagarm'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import LineGraph, { LineChart } from './LineChart'
import TankSVGComponent from './TankSVGPreview'
import TankValveConnectorPipeComponent from './TankValveConnectorPipeSVGPreview'
import PumpSVGComponent from './PumpSVGPreview'
import ValveSVGComponent from './ValveSVGPreview'
import StraightPipeSVGComponent from './StarightPipeSVGPreview'
import { ScadaAgriField } from './SacdaAgriField'
import AgriField from './agri_field.png'
import ElevatedTankSVGComponent from './ElevatedTankSVGPreview'
import ElevatedTankConnectorSVGComponent from './ElevatedTankConnectorPipeSVGPreview'
import ManualValveSVGComponent from './ManualValveSVGPreview'
import ESRSourcePipeSVGComponent from './ESRSourcePipe'
import PropTypes from 'prop-types'
export const DashboardSuperAdmin = () => {
  let superAdminDashboardData = [
    {
      deviceType: 'Tank',
      summary: {
        totalDevices: 50,
        activeDevices: 40,
        inactiveDevices: 10,
        criticalAlerts: 3,
        averageTankLevel: {
          value: 68,
          unit: '%',
        },
      },
    },
    {
      deviceType: 'Pump',
      summary: {
        totalDevices: 30,
        activeDevices: 25,
        inactiveDevices: 5,
        criticalAlerts: 2,
        averageFlowRate: {
          value: 10,
          unit: 'm3/h',
        },
      },
    },
    {
      deviceType: 'Flowmeter',
      summary: {
        totalDevices: 20,
        activeDevices: 18,
        inactiveDevices: 2,
        criticalAlerts: 1,
        averageFlowRate: {
          value: 15,
          unit: 'm3/h',
        },
      },
    },
    {
      deviceType: 'pH/TDS Meter',
      summary: {
        totalDevices: 15,
        activeDevices: 12,
        inactiveDevices: 3,
        criticalAlerts: 0,
        averagepH: {
          value: 7.2,
        },
        averageTDS: {
          value: 150,
          unit: 'ppm',
        },
      },
    },
  ]
  const StyledCard = styled(Card)`
    margin-bottom: 20px;
  `
  const StyledCardHeader = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
    background: #d3d3d3;
    padding: 0px 15px;
  `
  // DeviceSummaryCard.PropTypes = {

  // }

  // import PropTypes from 'prop-types'

  DashboardSuperAdmin.propTypes = {
    device: PropTypes.shape({
      deviceType: PropTypes.string.isRequired,
      summary: PropTypes.shape({
        totalDevices: PropTypes.number.isRequired,
        activeDevices: PropTypes.number.isRequired,
        inactiveDevices: PropTypes.number.isRequired,
        criticalAlerts: PropTypes.number.isRequired,
        averageTankLevel: PropTypes.shape({
          value: PropTypes.number.isRequired,
          unit: PropTypes.string.isRequired,
        }).isRequired,
        averageFlowRate: PropTypes.shape({
          value: PropTypes.number.isRequired,
          unit: PropTypes.string.isRequired,
        }),
        averagepH: PropTypes.shape({
          value: PropTypes.number.isRequired,
        }),
        averageTDS: PropTypes.shape({
          value: PropTypes.number.isRequired,
          unit: PropTypes.string.isRequired,
        }),
      }).isRequired,
      length: PropTypes.number.isRequired,
      filter: PropTypes.any.isRequired, // You may need to specify a more specific type
      reduce: PropTypes.any.isRequired, // You may need to specify a more specific type
    }).isRequired,
    clientOverview: PropTypes.shape({
      totalClients: PropTypes.number.isRequired,
      totalDevices: PropTypes.number.isRequired,
      activeDevices: PropTypes.number.isRequired,
      criticalAlerts: PropTypes.number.isRequired,
      averageDeviceHealth: PropTypes.number.isRequired,
    }).isRequired,
  }

  const DeviceSummaryCard = ({ device }) => {
    const DeviceSummaryComponent = getDeviceSummaryComponent(device.deviceType)

    return (
      <div className={classNames('col-12 md:col-6 lg:col-6 gap-2')}>
        <StyledCardHeader>{`${device.deviceType} Summary`}</StyledCardHeader>
        <StyledCard className="device-card">
          <div className="d-flex">
            {/* Render the tank diagram in 30% width */}
            <div className="mr-3" style={{ flex: '0 0 30%' }}>
              {device?.deviceType === 'Tank' && <TankDiagram tankData={tankData} />}
              {device?.deviceType === 'Pump' && <PumpDiagram pumpData={{}} />}
              {device?.deviceType === 'Flowmeter' && <FlowmeterDiagram />}
              {device?.deviceType === 'pH/TDS Meter' && <PH_TDSDiagram />}
              {/* Add similar conditionals for other device types */}
            </div>
            {/* Render the summary component in 70% width */}
            <div style={{ flex: '1', alignItems: 'center', display: 'flex' }}>
              <DeviceSummaryComponent device={device} />
            </div>
          </div>
        </StyledCard>
      </div>
    )
  }
  const valueTemplate = (value) => {
    return (
      <React.Fragment>
        {value}/<b>100</b>
      </React.Fragment>
    )
  }
  //   <DeviceSummaryComponent device={device} />
  const TankSummary = ({ device }) => (
    <div className="tank-summary">
      <div className="summary-item">
        <span>Total Devices: {device.summary.totalDevices}</span>
      </div>
      <div className="summary-item">
        <span>Active Devices: </span>
        <ProgressBar
          value={(device.summary.activeDevices / device.summary.totalDevices) * 100}
          displayValueTemplate={valueTemplate}
        />
      </div>
      <div className="summary-item">
        <span>Inactive Devices: </span>
        <ProgressBar
          value={(device.summary.inactiveDevices / device.summary.totalDevices) * 100}
          displayValueTemplate={valueTemplate}
        />
      </div>
      <div className="summary-item">
        <span>Critical Alerts: {device.summary.criticalAlerts}</span>
      </div>
      <div className="summary-item">
        <span>
          Average Tank Level: {device.summary.averageTankLevel.value}
          {device.summary.averageTankLevel.unit}
        </span>
        <ProgressBar value={device.summary.averageTankLevel.value} />
      </div>
    </div>
  )
  const LocationSummaryCard = ({ device }) => {
    return (
      <div className={classNames('col-12 md:col-6 lg:col-6 gap-2')}>
        <StyledCardHeader>{`Location Summary`}</StyledCardHeader>
        <StyledCard className="location-card">
          <div className="d-flex">
            <div style={{ flex: '1', alignItems: 'center' }}>
              <ul>
                <li>Total Locations: {device.length}</li>
                <li>
                  Active Locations::{' '}
                  {device.filter((location) => location.status === 'Active').length}
                </li>
                <li>
                  Inactive Devices:{' '}
                  {device.filter((location) => location.status === 'Inactive').length}
                </li>
                <li>
                  Critical Alerts:{' '}
                  {device.reduce((total, location) => total + location.criticalAlerts, 0)}
                </li>
                <li>
                  Important Notifications:{' '}
                  {device.reduce((total, location) => total + location.importantNotifications, 0)}
                </li>
                <Button>Manage Locations</Button>
              </ul>
            </div>
          </div>
        </StyledCard>
      </div>
    )
  }

  const FlowmeterSummary = ({ device }) => (
    <ul>
      <li>Total Devices: {device.summary.totalDevices}</li>
      <li>Active Devices: {device.summary.activeDevices}</li>
      <li>Inactive Devices: {device.summary.inactiveDevices}</li>
      <li>Critical Alerts: {device.summary.criticalAlerts}</li>
      <li>
        Average Flow Rate: {device.summary.averageFlowRate.value}
        {device.summary.averageFlowRate.unit}
      </li>
    </ul>
  )

  const PhTDSMeterSummary = ({ device }) => (
    <ul>
      <li>Total Devices: {device.summary.totalDevices}</li>
      <li>Active Devices: {device.summary.activeDevices}</li>
      <li>Inactive Devices: {device.summary.inactiveDevices}</li>
      <li>Critical Alerts: {device.summary.criticalAlerts}</li>
      <li>Average pH: {device.summary.averagepH.value}</li>
      <li>
        Average TDS: {device.summary.averageTDS.value}
        {device.summary.averageTDS.unit}
      </li>
    </ul>
  )

  const getDeviceSummaryComponent = (deviceType) => {
    switch (deviceType) {
      case 'Tank':
        return TankSummary
      case 'Pump':
      case 'Flowmeter':
        return FlowmeterSummary
      case 'pH/TDS Meter':
        return PhTDSMeterSummary
      default:
        return null
    }
  }
  const tankData = {
    level: 1.5,
    maxLevel: 2,
    unit: 'm',
  }
  const superAdminLocationData = [
    {
      name: 'Location 1',
      status: 'Active',
      deviceType: 'Tank',
      criticalAlerts: 1,
      importantNotifications: 2,
    },
    {
      name: 'Location 2',
      status: 'Inactive',
      deviceType: 'Tank',
      criticalAlerts: 0,
      importantNotifications: 1,
    },
    {
      name: 'Location 3',
      status: 'Active',
      deviceType: 'Pump',
      criticalAlerts: 2,
      importantNotifications: 3,
    },
    {
      name: 'Location 4',
      status: 'Active',
      deviceType: 'Flowmeter',
      criticalAlerts: 0,
      importantNotifications: 1,
    },
    {
      name: 'Location 5',
      status: 'Inactive',
      deviceType: 'pH/TDS Meter',
      criticalAlerts: 1,
      importantNotifications: 0,
    },
  ]
  const superAdminClientOverviewData = {
    totalClients: 100,
    totalDevices: 2500,
    activeDevices: 2000,
    criticalAlerts: 50,
    averageDeviceHealth: 'Good',
    recentClientActivity: [
      {
        clientName: 'Client A',
        activity: 'Added 10 new devices',
      },
      {
        clientName: 'Client B',
        activity: 'Resolved critical alert',
      },
      {
        clientName: 'Client C',
        activity: 'Updated device firmware',
      },
    ],
  }
  const ClientSummaryCard = ({ clientOverview }) => {
    return (
      <div className={classNames('col-12 md:col-6 lg:col-6 gap-2')}>
        <StyledCardHeader>{`Client Summary`}</StyledCardHeader>
        <StyledCard className="client-card">
          <div className="d-flex">
            <div style={{ flex: '1', alignItems: 'center' }}>
              <ul>
                <li>Total Clients: {clientOverview.totalClients}</li>
                <li>Total Devices:{clientOverview.totalDevices}</li>
                <li>Active Devices:{clientOverview.activeDevices}</li>
                <li>
                  Critical Alerts:
                  {clientOverview.criticalAlerts}
                </li>

                <li>
                  Average Device Health:
                  {clientOverview.averageDeviceHealth}
                </li>
                {/* <li>
                  Recent Client Activity:
                  <ul>
                    {clientOverview.recentClientActivity.map((activity, index) => (
                      <li key={index}>
                        {activity.clientName}: {activity.activity}
                      </li>
                    ))}
                  </ul>
                </li> */}
                <Button>Manage Locations</Button>
              </ul>
            </div>
          </div>
        </StyledCard>
      </div>
    )
  }

  const data = {
    labels: [
      'Day 1',
      'Day 2',
      'Day 3',
      'Day 4',
      'Day 5',
      'Day 6',
      'Day 7',
      'Day 8',
      'Day 9',
      'Day 10',
      'Day 11',
      'Day 12',
      'Day 13',
      'Day 14',
      'Day 15',
      'Day 16',
      'Day 17',
      'Day 18',
      'Day 19',
      'Day 20',
      'Day 21',
      'Day 22',
      'Day 23',
      'Day 24',
      'Day 25',
      'Day 26',
      'Day 27',
      'Day 28',
      'Day 29',
      'Day 30',
    ],
    datasets: [
      {
        label: 'Parameter 1',
        data: [
          100, 120, 110, 130, 115, 125, 135, 130, 140, 120, 110, 130, 115, 125, 135, 130, 140, 120,
          110, 130, 115, 125, 135, 130, 140, 120, 110, 130, 115, 125,
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Parameter 2',
        data: [
          200, 210, 220, 215, 230, 225, 235, 220, 210, 200, 205, 220, 225, 230, 235, 220, 210, 200,
          205, 220, 225, 230, 235, 220, 210, 200, 205, 220, 225, 230,
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }
  return (
    <React.Fragment>
      <div className="dashboard">
        {/* <TankDiagram tankData={tankData} /> */}
        <div
          className="topbar"
          style={{
            height: '60px',
            background: 'rgb(33 38 49)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 15px',
            alignItems: 'center',
          }}
        >
          <div className="topbar-title">
            <h4>QPI. Automation</h4>
          </div>
          <div className="topbar-timestamp">TimeStamp here</div>
        </div>
        <div className="flex grid">
          <div className="col-12 lg:col-9 md:col-9">
            <div className="scada-container">
              <div className="scada-elements-wrapper">
                {/* <TankValveConnectorPipeComponent
              innerStyle={{
                position: 'absolute',
                bottom: '50%',
                left: '85px',
              }}
            /> */}
                {/* this component is a preview purpose pipe(ETP1V1) */}
                <StraightPipeSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '51%', left: '18%' }}
                  pipeWidth={70}
                />
                {/* this component is a preview purpose pipe source(inlet) for gsr tank */}
                <ESRSourcePipeSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '71%', left: '2%' }}
                />
                <TankSVGComponent innerStyle={{ bottom: '35%', position: 'absolute' }} />
                {/* this component is a preview purpose pipe(p2) */}

                <StraightPipeSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '51.5%', left: '36%' }}
                  pipeWidth={60}
                />
                {/* <StraightPipeSVGComponent
              innerStyle={{ position: 'absolute', bottom: '81px', left: '61%' }}
              pipeWidth={100}
            /> */}
                {/* this component is a preview purpose valve(V1) */}
                <ValveSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '34.5%', left: '18.5%' }}
                />
                <ElevatedTankConnectorSVGComponent
                  innerStyle={{ position: 'absolute', right: '17.2%', bottom: '46.8%' }}
                />
                {/* this component is a preview purpose pump(MVP1) */}
                <PumpSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '35.8%', left: '32%' }}
                />
                {/* <StraightPipeSVGComponent
              innerStyle={{ position: 'absolute', bottom: '84px', left: '78%' }}
              pipeWidth={100}
            />
            <ValveSVGComponent innerStyle={{ position: 'absolute', bottom: '84px', left: '64%' }} /> */}

                <ElevatedTankSVGComponent
                  innerStyle={{ position: 'absolute', right: '75px', bottom: '36%' }}
                />
                <StraightPipeSVGComponent
                  innerStyle={{ position: 'absolute', bottom: '70.5%', right: '-55px' }}
                  pipeWidth={27}
                />
                <ManualValveSVGComponent
                  innerStyle={{ right: '10px', position: 'absolute', bottom: '66.1%' }}
                />
              </div>

              {/* <div
            className=""
            style={{
              width: '90px',
              height: '90px',
              position: 'absolute',
              right: '0px',
              top: '60%',
            }}
          >
            <img src={AgriField} style={{ height: '90%' }} />
          </div> */}
            </div>
          </div>
          <div className="col-12 lg:col-3 md:col-3">col-3</div>
        </div>
        <div className="row">
          <div className="col-12">
            <LineGraph data={data} />
          </div>
          {superAdminDashboardData.map((device, index) => (
            <DeviceSummaryCard key={index} device={device} />
          ))}
          <LocationSummaryCard device={superAdminLocationData} />
          <ClientSummaryCard clientOverview={superAdminClientOverviewData} />
        </div>
      </div>
    </React.Fragment>
  )
}
