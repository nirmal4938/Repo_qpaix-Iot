import { Panel } from 'primereact/panel'
import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
// import { ActionBodyTemplate } from '../flowmeter/Template'
let initialUserRoles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Has full access to all features and settings',
    permissions: [
      'create_client',
      'read_client',
      'update_client',
      'delete_client',
      'create_location',
      'read_location',
      'update_location',
      'delete_location',
      'create_pump',
      'read_pump',
      'update_pump',
      'delete_pump',
      'create_tank',
      'read_tank',
      'update_tank',
      'delete_tank',
      'create_flowmeter',
      'read_flowmeter',
      'update_flowmeter',
      'delete_flowmeter',
      'create_ph_tds_meter',
      'read_ph_tds_meter',
      'update_ph_tds_meter',
      'delete_ph_tds_meter',
    ],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Can edit content and manage locations',
    permissions: [
      'read_client',
      'read_location',
      'create_location',
      'update_location',
      'delete_location',
      'read_pump',
      'update_pump',
      'delete_pump',
      'read_tank',
      'update_tank',
      'delete_tank',
      'read_flowmeter',
      'update_flowmeter',
      'delete_flowmeter',
      'read_ph_tds_meter',
      'update_ph_tds_meter',
      'delete_ph_tds_meter',
    ],
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Has read-only access to all data',
    permissions: [
      'read_client',
      'read_location',
      'read_pump',
      'read_tank',
      'read_flowmeter',
      'read_ph_tds_meter',
    ],
  },
]

export const RolesManagementComponent = () => {
  const [expanded, setExpanded] = useState(true)
  const [userRoles, setUserRoles] = React.useState(initialUserRoles)
  const [rolePermissions, setRolePermissions] = React.useState({})
  const [roleAssignments, setRoleAssignments] = React.useState({})
  const [auditLogs, setAuditLogs] = React.useState([])

  const ActionBodyTemplate = () => {
    return (
      <React.Fragment>
        <div className="action"></div>
      </React.Fragment>
    )
  }

  const UserRolesTable = () => {
    return (
      <React.Fragment>
        <div className="">
          <DataTable value={userRoles} showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="SR No." style={{ maxWidth: '2rem' }}></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="" header="Action" body={ActionBodyTemplate}></Column>
          </DataTable>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Panel
        header="Roles & Permissions"
        toggleable
        collapsed={!expanded}
        collapseIcon="pi pi-chevron-down"
        expandIcon="pi pi-chevron-up"
      >
        <TabView>
          <TabPanel header="User Roles">
            <p className="m-0">
              Manage user roles here. Define different roles such as admin, editor, viewer, etc.,
              and assign permissions accordingly.
            </p>
            <UserRolesTable />
            {/* You can add components like tables, forms, or any other UI elements to manage roles */}
          </TabPanel>
          <TabPanel header="Role Permissions">
            <p className="m-0">
              Set permissions for each role. Specify what actions or resources each role can access
              or modify.
            </p>
            {/* Add components to configure permissions for each role */}
          </TabPanel>
          <TabPanel header="Role Assignment">
            <p className="m-0">
              Assign roles to users. Manage which users have which roles in your system.
            </p>
            {/* Implement components to assign roles to users */}
          </TabPanel>
          <TabPanel header="Audit Logs">
            <p className="m-0">
              View audit logs. Keep track of changes made to roles and permissions for
              accountability and security purposes.
            </p>
            {/* Display audit logs or provide a way to view them */}
          </TabPanel>
        </TabView>
      </Panel>
    </React.Fragment>
  )
}
