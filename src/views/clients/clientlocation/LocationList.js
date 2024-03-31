import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'src/components/common/Dialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { Panel } from 'primereact/panel'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { PanelHeaderTemplate, DataTableHeader, ActionBodyTemplate } from '../../flowmeter/Template'
import useEditLocation from './hooks/useEditLocation'

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
const LocationList = ({}) => {
  const { locations, removeLocationById } = useEditLocation({ id: null, will_refetch: true })
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const cogMenuRef = useRef(null)
  const actionMenuRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [selectedRows, setSelectedRows] = useState(null)
  const [selectedForAction, setSelectedForAction] = useState(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    serialId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    map: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    latitude: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    longitude: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Client', icon: 'pi pi-user-plus' },
    { label: 'View Location', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update Location',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    {
      label: 'Delete Location',
      icon: 'pi pi-trash',
      command: (e) => handleDelete(e),
    },
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
    // console.log('Confirmed', selectedForAction?.id)
    let result = await removeLocationById(selectedForAction?.id)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }
  const handleView = (e) => {
    // console.log('View', rowData)
    navigate(`/client-location-list/view/${selectedForAction?.id}`)
    // Implement your view logic here
  }

  const handleEdit = (e) => {
    // console.log('Edit', e)
    navigate(`/client-location-list/update/${selectedForAction?.id}`)

    // Implement your edit logic here
  }

  const handleDelete = (e) => {
    setIsConfirmOpen(true)
  }

  const handleOpenMenu = (e, rowData) => {
    actionMenuRef.current.toggle(e)
    // console.log("ro")
    setSelectedForAction(rowData)
  }

  const handleCloseMenu = (e, rowData) => {
    // setMenu(null);
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
        message="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Panel
        headerTemplate={
          (options) => (
            <PanelHeaderTemplate
              options={options}
              title={'Location List'}
              configItems={configItems}
              cogMenuRef={cogMenuRef}
              onAddNew={() => navigate('/client-location-list/add')}
            />
          ) // Pass setExpanded to headerTemplate
        }
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
          value={locations}
          paginator
          rows={10}
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          header={
            <DataTableHeader
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={onGlobalFilterChange}
            />
          }
          showGridlines
          rowsPerPageOptions={[5, 10, 20]}
          filters={filters}
          globalFilterFields={['name', 'latitude', 'longitude', 'map', 'id', 'serialId']}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {/* <Column selectionMode="multiple" headerStyle={{ width: '2rem' }}></Column> */}
          <Column field="serialId" header="Sr No." sortable></Column>
          <Column field="name" header="Location" sortable></Column>
          <Column field="latitude" header="Latitude" sortable></Column>
          <Column field="longitude" header="Longitude" sortable></Column>
          <Column field="map" header="Map Coordinate" sortable></Column>
          <Column
            field=""
            header="Action"
            body={(rowData) => (
              <ActionBodyTemplate rowData={rowData} handleOpenMenu={handleOpenMenu} />
            )}
            headerStyle={{ width: '4rem' }}
          ></Column>
        </DataTable>
      </div>
    </React.Fragment>
  )
}
export default LocationList
