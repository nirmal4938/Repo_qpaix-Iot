import React, { useCallback, useMemo } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { DataView } from 'primereact/dataview'
import { Card } from 'primereact/card'
import classNames from 'classnames'
// import { Button } from '@coreui/coreui'
import { Button } from 'primereact/button'
import { useHook } from './hooks/useEditAnalysis'
import styled from 'styled-components'
import { Signal } from './Dialog'
import CIcon from '@coreui/icons-react'
import {
  cilBattery3,
  cilBattery5,
  cilWifiSignal0,
  cilWifiSignal3,
  cilWifiSignalOff,
} from '@coreui/icons'
import { ProgressBar } from 'primereact/progressbar'
import PropTypes from 'prop-types'
export const TankAnalyseView = ({}) => {
  //   const _data = useBack(() => useHook(), []);
  const { systemData } = useHook()
  //   console.log('_data', _data)
  //   Low Moderate High
  const deviceParameters = [
    {
      deviceNo: 'DIV0000000001',
      name: 'Device A',
      level: {
        currentLevel: '80%',
        maxCapacity: '10 liters',
      },
      time: '26 December 2024 10:00:00',
      deviceBattery: {
        NCB: '80 volts',
        CB: '20 volts',
      },
      signal: 'High',
    },
    {
      deviceNo: 'DIV0000000002',
      name: 'Device B',
      level: {
        currentLevel: '60%',
        maxCapacity: '20 liters',
      },
      time: '26 December 2024 11:30:00',
      deviceBattery: {
        NCB: '60 volts',
        CB: '40 volts',
      },
      signal: 'Moderate',
    },
    {
      deviceNo: 'DIV0000000003',
      name: 'Device C',
      level: {
        currentLevel: '50%',
        maxCapacity: '30 liters',
      },
      time: '26 December 2024 13:45:00',
      deviceBattery: {
        NCB: '50 volts',
        CB: '50 volts',
      },
      signal: 'Low',
    },
    {
      deviceNo: 'DIV0000000004',
      name: 'Device D',
      level: {
        currentLevel: '90%',
        maxCapacity: '40 liters',
      },
      time: '26 December 2024 15:20:00',
      deviceBattery: {
        NCB: '90 volts',
        CB: '10 volts',
      },
      signal: 'High',
    },
    {
      deviceNo: 'DIV0000000005',
      name: 'Device E',
      level: {
        currentLevel: '70%',
        maxCapacity: '50 liters',
      },
      time: '26 December 2024 16:55:00',
      deviceBattery: {
        NCB: '70 volts',
        CB: '30 volts',
      },
      signal: 'Moderate',
    },
    {
      deviceNo: 'DIV0000000006',
      name: 'Device F',
      level: {
        currentLevel: '40%',
        maxCapacity: '60 liters',
      },
      time: '26 December 2024 18:10:00',
      deviceBattery: {
        NCB: '40 volts',
        CB: '60 volts',
      },
      signal: 'Low',
    },
    {
      deviceNo: 'DIV0000000007',
      name: 'Device G',
      level: {
        currentLevel: '85%',
        maxCapacity: '70 liters',
      },
      time: '26 December 2024 19:30:00',
      deviceBattery: {
        NCB: '85 volts',
        CB: '15 volts',
      },
      signal: 'High',
    },
    {
      deviceNo: 'DIV0000000008',
      name: 'Device H',
      level: {
        currentLevel: '65%',
        maxCapacity: '80 liters',
      },
      time: '26 December 2024 20:45:00',
      deviceBattery: {
        NCB: '65 volts',
        CB: '35 volts',
      },
      signal: 'Moderate',
    },
    {
      deviceNo: 'DIV0000000009',
      name: 'Device I',
      level: {
        currentLevel: '45%',
        maxCapacity: '90 liters',
      },
      time: '26 December 2024 21:55:00',
      deviceBattery: {
        NCB: '45 volts',
        CB: '55 volts',
      },
      signal: 'Low',
    },
    {
      deviceNo: 'DIV0000000010',
      name: 'Device J',
      level: {
        currentLevel: '95%',
        maxCapacity: '100 liters',
      },
      time: '26 December 2024 22:45:00',
      deviceBattery: {
        NCB: '95 volts',
        CB: '5 volts',
      },
      signal: 'High',
    },
  ]

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
      <div className="card">
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
          <TabPanel header="Pump">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
              modi.
            </p>
          </TabPanel>
          <TabPanel header="Flowmeter">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel header="pH-TDs-Meter">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabView>
      </div>
    </React.Fragment>
  )
}
TankAnalyseView.propTypes = {
  title: PropTypes.any,
  value: PropTypes.any,
  component: PropTypes.any,
  children: PropTypes.any,
}
