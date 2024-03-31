import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'src/components/common/Dialog'
import { Panel } from 'primereact/panel'
import { Menu } from 'primereact/menu'
import { configItems } from '../tank/Tank'
import useFlowmeter from './hooks/useEditFlowmeter'
import { ActionBodyTemplate, DataTableHeader, PanelHeaderTemplate } from './Template'
const FlowmeterList = ({}) => {
  const navigate = useNavigate()
  const { flowMeterList, removeFlowmeterById } = useFlowmeter({ id: null, will_refetch: true })
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const cogMenuRef = useRef(null)
  const actionMenuRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [selectedRows, setSelectedRows] = useState(null)
  const [selectedForAction, setSelectedForAction] = useState(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    location: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hwUniqueNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    deviceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    minRange: { value: null, matchMode: FilterMatchMode.CONTAINS },
    maxRange: { value: null, matchMode: FilterMatchMode.CONTAINS },
    minCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    maxCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    swDeviceId: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Location', icon: 'pi pi-compass' },
    { label: 'View Flowmeter', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update Flowmeter',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    {
      label: 'Delete Flowmeter',
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
    console.log('Confirmed')
    let result = await removeFlowmeterById(selectedForAction?.encryptedId)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }

  const handleView = (e) => {
    // console.log('View', rowData)
    navigate(`/flowmeter-list/view/${selectedForAction?.encryptedId}`)
    // Implement your view logic here
  }

  const handleEdit = (e) => {
    navigate(`/fowmeter-list/update/${selectedForAction?.encryptedId}`)

    // Implement your edit logic here
  }

  const handleDelete = (e) => {
    // confirmOnDelete()
    setIsConfirmOpen(true)

    // Implement your delete logic here
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
      <Menu model={actionMenuItems} popup ref={actionMenuRef} id="action_menu" />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to delete record with ID: ${selectedForAction?.encryptedId}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Panel
        headerTemplate={
          (options) => (
            <PanelHeaderTemplate
              options={options}
              title={'Flowmeter List'}
              configItems={configItems}
              cogMenuRef={cogMenuRef}
              onAddNew={() => navigate('/flowmeter-list/add')}
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
          value={flowMeterList}
          paginator
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
          globalFilterFields={[
            'deviceName',
            'location',
            'hwUniqueNo',
            'minRange',
            'maxRange',
            'minCount',
            'maxCount',
            'swDeviceId',
            'description',
          ]}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="srNo" header="SR No." sortable style={{ minWidth: '6rem' }} />
          <Column field="swDeviceId" header="SW Device ID" sortable style={{ minWidth: '10rem' }} />
          <Column field="hwUniqueNo" header="H/W No" sortable style={{ minWidth: '10rem' }} />
          <Column field="deviceName" header="Device Name" sortable style={{ minWidth: '10rem' }} />
          <Column
            field="locationdto.name"
            header="Location"
            sortable
            style={{ minWidth: '10rem' }}
          />
          <Column field="minRange" header="Min Range" sortable style={{ minWidth: '10rem' }} />
          <Column field="maxRange" header="Max Range" sortable style={{ minWidth: '10rem' }} />
          <Column field="minCount" header="Min Count" sortable style={{ minWidth: '10rem' }} />
          <Column field="maxCount" header="Max Count" sortable style={{ minWidth: '10rem' }} />
          <Column field="description" header="Description" sortable style={{ minWidth: '10rem' }} />

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
export default FlowmeterList
