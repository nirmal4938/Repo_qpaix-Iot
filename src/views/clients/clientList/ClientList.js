import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'src/components/common/Dialog'

import { Panel } from 'primereact/panel'
import { Menu } from 'primereact/menu'
import { PanelHeaderTemplate, DataTableHeader, ActionBodyTemplate } from '../../flowmeter/Template'
import useClient from './hooks/useClient'
const configItems = [
  {
    label: 'Refresh',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
  },
  {
    separator: true,
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
]
const ClientList = ({}) => {
  const { clientList, removeClientById } = useClient({ id: null, will_refetch: true })
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const cogMenuRef = useRef(null)
  const actionMenuRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [selectedRows, setSelectedRows] = useState(null)
  const [selectedForAction, setSelectedForAction] = useState(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    clientName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Location', icon: 'pi pi-compass' },
    { label: 'View Client', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update Client',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    { label: 'Delete Client', icon: 'pi pi-trash', command: (e) => handleDelete(e) },
  ]
  const [tableData, setTableData] = useState([])
  useEffect(() => {}, [])
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleConfirm = async () => {
    let result = await removeClientById(selectedForAction?.id)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }

  const handleView = (rowData) => {
    // console.log('View', rowData)
    navigate(`/client-list/view/${selectedForAction?.encryptedId}`)
    // Implement your view logic here
  }

  const handleEdit = (rowData) => {
    console.log('Edit', selectedForAction)
    // Implement your edit logic here
    navigate(`/client-list/update/${selectedForAction?.encryptedId}`)
  }

  const handleDelete = (rowData) => {
    // confirmOnDelete()
    setIsConfirmOpen(true)

    // Implement your delete logic here
  }

  const handleOpenMenu = (e, rowData) => {
    actionMenuRef.current.toggle(e)

    setSelectedForAction(rowData)
  }

  const handleCloseMenu = (e, rowData) => {
    setSelectedForAction(null)
  }

  return (
    <React.Fragment>
      <Menu
        model={actionMenuItems}
        popup
        ref={actionMenuRef}
        id="action_menu"
        // onHide={handleCloseMenu}
      />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to delete record with ID: ${selectedForAction?.encryptedId}?`}
        onConfirm={handleConfirm}
        // onCancel={handleCancel}
      />
      <Panel
        headerTemplate={(options) => (
          <PanelHeaderTemplate
            options={options}
            title={'Client List'}
            configItems={configItems}
            cogMenuRef={cogMenuRef}
            onAddNew={() => navigate('/client-list/add')}
          />
        )}
        toggleable
        collapsed={!expanded}
        collapseIcon="pi pi-chevron-down"
        expandIcon="pi pi-chevron-up"
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Panel>
      <div className="">
        <DataTable
          value={clientList}
          paginator={true}
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          scrollable
          scrollDirection="horizontal"
          rows={10}
          header={
            <DataTableHeader
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={onGlobalFilterChange}
            />
          }
          showGridlines
          rowsPerPageOptions={[5, 10, 20]}
          filters={filters}
          globalFilterFields={['name', 'address', 'city', 'state', 'country', 'description']}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          filterDelay={2000}
          frozenRow
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="srNo" header="ID" sortable frozenRow></Column>
          <Column field="name" header="Name" sortable frozenRow></Column>
          <Column field="address" header="Address" sortable></Column>
          <Column field="city" header="City" sortable></Column>
          <Column field="state" header="State" sortable></Column>
          <Column field="country" header="Country" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column
            field=""
            header="Action"
            body={(rowData) => (
              <ActionBodyTemplate rowData={rowData} handleOpenMenu={handleOpenMenu} />
            )}
            headerStyle={{ width: '4rem' }}
            style={{ minWidth: '3rem' }}
          ></Column>
        </DataTable>
      </div>
    </React.Fragment>
  )
}
export default ClientList
