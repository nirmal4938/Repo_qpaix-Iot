import React from 'react'
import AddEditClient from './views/clients/clientList/AddEditClient'
import LocationList from './views/clients/clientlocation/LocationList'
import AddEditLocation from './views/clients/clientlocation/AddEditLocation'
import TankList from './views/tank/Tank'
import AddEditTank from './views/tank/AddEditTank'
import PumpList from './views/pump/Pump'
import AddEditPump from './views/pump/addEditPump'
import FlowmeterList from './views/flowmeter/Flowmeter'
import AddEditFlowmeter from './views/flowmeter/AddEditFlowmeter'
import PHTDSMeterList from './views/phtdsmeter/PHTDSMeter'
import AddEditPHTDSMeter from './views/phtdsmeter/AddEditPHTDSMeter'
import { DashboardSuperAdmin } from './views/dashboard/DashboardSuperAdmin'
import { RolesManagementComponent } from './views/management/rolesmanagement'
import { TankAnalyseView } from './views/analyse/tank/TankAnalyseView'
import { RegisterUpdateClientView } from './views/clients/clientList/RegisterUpdateClientView'
import { RegisterUpdateLocationView } from './views/clients/clientlocation/RegisterUpdateLocation'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ClientList = React.lazy(() => import('./views/clients/clientList/ClientList'))

// const Tank = React.lazy(() => import('./views/tank/Tank'))
// const Pump = React.lazy(() => import('./views/pump/Pump'))
// const Flowmeter = React.lazy(() => import('./views/flowmeter/Flowmeter'))
// const PHTDSMeter = React.lazy(() => import('./views/phtdsmeter/PHTDSMeter'))
// const RolesManagementComponent = React.lazy(() => import('./views/management/rolesmanagement'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboards', element: DashboardSuperAdmin },
  { path: '/analyse-tank', name: 'Analyse', element: TankAnalyseView },

  { path: '/client-list', name: 'Client List', element: ClientList },
  { path: '/client-list/add', name: 'Add Client', element: RegisterUpdateClientView },
  { path: '/client-list/update/:id', name: 'Update Client', element: RegisterUpdateClientView },
  { path: '/client-list/view/:id', name: 'View Client', element: RegisterUpdateClientView },

  { path: '/client-location-list', name: 'Location List', element: LocationList },
  { path: '/client-location-list/add', name: 'Add Location', element: RegisterUpdateLocationView },
  {
    path: '/client-location-list/view/:id',
    name: 'View Location',
    element: RegisterUpdateLocationView,
  },
  {
    path: '/client-location-list/update/:id',
    name: 'Update Location',
    element: RegisterUpdateLocationView,
  },

  { path: '/tank-list', name: 'Tank List', element: TankList },
  { path: '/tank-list/add', name: 'Add Tank', element: AddEditTank },
  { path: '/tank-list/view/:id', name: 'View Tank', element: AddEditTank },
  { path: '/tank-list/update/:id', name: 'Update Tank', element: AddEditTank },

  { path: '/pump-list', name: 'Pump List', element: PumpList },
  { path: '/pump-list/add', name: 'Add Pump', element: AddEditPump },
  { path: '/pump-list/view/:id', name: 'View Pump', element: AddEditPump },
  { path: '/pump-list/update/:id', name: 'Update Pump', element: AddEditPump },

  { path: '/flowmeter-list', name: 'Flowmeter List', element: FlowmeterList },
  { path: '/flowmeter-list/add', name: 'Add Flowmeter', element: AddEditFlowmeter },
  { path: '/flowmeter-list/view/:id', name: 'View Flowmeter', element: AddEditFlowmeter },
  { path: '/fowmeter-list/update/:id', name: 'Update Flowmeter', element: AddEditFlowmeter },

  { path: '/ph-Tds-Meter-list', name: 'pH TDS Meter List', element: PHTDSMeterList },
  { path: '/ph-Tds-Meter-list/add', name: 'Add pH TDS Meter', element: AddEditPHTDSMeter },
  { path: '/ph-Tds-Meter-list/view/:id', name: 'View pH TDS Meter', element: AddEditPHTDSMeter },
  {
    path: '/ph-Tds-Meter-list/update/:id',
    name: 'Update pH TDS Meter',
    element: AddEditPHTDSMeter,
  },
  {
    path: '/manage-roles',
    name: 'Role & Permissions',
    element: RolesManagementComponent,
  },
]

export default routes
