import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Card } from 'primereact/card'
import { DataView } from 'primereact/dataview'
import { Button } from 'primereact/button'
import { useHook } from '../analyse/tank/hooks/useEditAnalysis'
import styled from 'styled-components'
import { Signal } from '../analyse/tank/Dialog'
import CIcon from '@coreui/icons-react'
import {
  cilBattery3,
  cilBattery5,
  cilWifiSignal0,
  cilWifiSignal3,
  cilWifiSignalOff,
} from '@coreui/icons'
import { ProgressBar } from 'primereact/progressbar'
import { TabPanel, TabView } from 'primereact/tabview'

const Dashboard = () => {
  //   const _data = useBack(() => useHook(), []);
  const { systemData } = useHook()
  //   console.log('_data', _data)
  //   Low Moderate High

  const hanldeViewAnalysis = () => {
    let message = '😊 Smiling Face with Smiling Eyes'
    console.log(`%cSuccess: ${message}`, 'color: green; font-weight: bold;')
  }

  //   const Signal = styled

  const itemTemplate = (device) => {
    let { deviceNo, deviceBattery, name, level, time } = device
    let index = 1
    console.log('Device Battery', deviceBattery.NCB.for)
    const ListItemTemplate = ({ title, value, component, children }) => {
      return (
        <div
          className={classNames({
            flex: !component,
            'justify-content-between align-items-center': true,
          })}
        >
          <b>{title}:</b>
          <div className={classNames({ flex: !component, 'gap-2 ': true })}>
            <p className="m-0">{value && value}</p>
            {component}
            <>{children}</>
          </div>
        </div>
      )
    }
    itemTemplate.propTypes = {
      title: PropTypes.any,
      value: PropTypes.any,
      component: PropTypes.any,
      children: PropTypes.any,
    }
    const CardTitleTemplate = () => {
      return (
        <>
          <div>`Device ${deviceNo}`</div>
          <div>
            <Button
              severity="info"
              text
              raised
              icon="pi pi-ellipsis-h"
              onClick={hanldeViewAnalysis}
            />
          </div>
        </>
      )
    }
    const getSeverity = (_value) => {
      let value = parseInt(_value)
      console.log('severity value', value)

      if (value >= 60) {
        return '#34c158'
      } else if (value < 60 && value >= 30) {
        return '#e7e735'
      } else if (value < 30) {
        return '#b12121'
      } else {
        return null
      }
    }
    let _color = getSeverity(level?.currentLevel)
    console.log('_color', _color)
    return (
      <div
        className={classNames({
          'col-12 md:col-6 lg:col-4 gap-2': true,
        })}
      >
        <Card title={<CardTitleTemplate />} style={{ marginBottom: '2rem' }}>
          <ListItemTemplate title={'Name'} value={device.name} />
          <ListItemTemplate
            title={'Level'}
            component={<ProgressBar value={level?.currentLevel} color={_color} />}
          />

          <ListItemTemplate title={'Max Capacity'} value={level.maxCapacity} />
          <ListItemTemplate title={'Time'} value={time} />
          <ListItemTemplate title={'Device Battery'}>
            <div className="" style={{ display: 'contents' }}>
              <div className="" style={{ display: 'grid' }}>
                <>{deviceBattery.NCB?.for}</>
                <>
                  {deviceBattery.NCB.value > 60 ? (
                    <CIcon
                      icon={cilBattery5}
                      size="24px"
                      style={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
                    />
                  ) : (
                    <CIcon
                      icon={cilBattery3}
                      size="24px"
                      style={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
                    />
                  )}
                </>
              </div>
              <div className="" style={{ display: 'grid' }}>
                <>{deviceBattery.CB?.for}</>
                <>
                  {deviceBattery.CB.value > 60 ? (
                    <CIcon
                      icon={cilBattery5}
                      size="24px"
                      style={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
                    />
                  ) : (
                    <CIcon
                      icon={cilBattery3}
                      size="24px"
                      style={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
                    />
                  )}
                </>
              </div>
            </div>
          </ListItemTemplate>

          <ListItemTemplate title={'Signal'} value={device.signal}>
            {device.signal === 'Moderate' ? (
              <CIcon icon={cilWifiSignal3} className="text-warning" size="xl" title="low" />
            ) : device.signal === 'Low' ? (
              <CIcon icon={cilWifiSignalOff} className="text-danger" size="xl" title="low" />
            ) : (
              <Signal className="pi pi-wifi" color="#2196f3" size="24px" />
            )}
          </ListItemTemplate>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      <TabView>
        <TabPanel header="Tank">
          <DataView
            value={systemData?._Qsets}
            layout="string"
            itemTemplate={itemTemplate}
            className={classNames({
              '.p-nogutter': 'flex justify-content-between',
            })}
          />
        </TabPanel>
      </TabView>
      {/* <div className="row">
          <Card className="col-4">
            <div className="p-card-body">
              <div className="p-card-content flex">
                <div className="" style={{ width: '40%' }}>
                  <>Image</>
                </div>
                <div className="" style={{ width: '60%' }}>
                  <>Description</>
                </div>
              </div>
            </div>
          </Card>
        </div> */}
      {/* <DeviceOverview deviceType="Tanks" devices={deviceData.tanks} /> 
         <DeviceOverview deviceType="Pumps" devices={deviceData.pumps} />
        <DeviceOverview deviceType="Flowmeters" devices={deviceData.flowmeters} />
        <DeviceOverview deviceType="pHMeters" devices={deviceData.pHMeters} />
        <DeviceOverview deviceType="TDSMeters" devices={deviceData.TDSMeters} />  */}
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired, // Example type, adjust as needed
  component: PropTypes.element.isRequired, // Example type, adjust as needed
  children: PropTypes.node.isRequired, // Example type, adjust as needed
  title: PropTypes.any,
}

export default Dashboard
