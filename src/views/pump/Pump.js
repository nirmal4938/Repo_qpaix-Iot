import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'src/components/common/Dialog'
import { Panel } from 'primereact/panel'
import { Menu } from 'primereact/menu'
import { configItems } from '../tank/Tank'
import usePump from './hooks/useEditPump'
import { PanelHeaderTemplate, DataTableHeader, ActionBodyTemplate } from '../flowmeter/Template'

const PumpList = ({}) => {
  const { pumpList, removePumpById } = usePump({ id: null, will_refetch: true })
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const cogMenuRef = useRef(null)
  const actionMenuRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [selectedRows, setSelectedRows] = useState(null)
  const [selectedForAction, setSelectedForAction] = useState(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    hwUniqueNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    pumpName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emMinRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emMaxRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emMinCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emMaxCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Location', icon: 'pi pi-compass' },
    { label: 'View Pump', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update Pump',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    { label: 'Delete Pump', icon: 'pi pi-trash', command: (e) => handleDelete(e) },
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
    let result = await removePumpById(selectedForAction?.encryptedId)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }

  const handleView = () => {
    navigate(`/pump-list/view/${selectedForAction?.encryptedId}`)
    // Implement your view logic here
  }

  const handleEdit = () => {
    navigate(`/pump-list/update/${selectedForAction?.encryptedId}`)

    // Implement your edit logic here
  }

  const handleDelete = (e) => {
    console.log('Delete')
    setIsConfirmOpen(true)
  }

  const handleOpenMenu = (e, rowData) => {
    actionMenuRef.current.toggle(e)
    setSelectedForAction(rowData)
  }

  return (
    <React.Fragment>
      <Menu model={actionMenuItems} popup ref={actionMenuRef} id="action_menu" />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to delete this item? ${selectedForAction?.encryptedId}`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Panel
        headerTemplate={
          (options) => (
            <PanelHeaderTemplate
              options={options}
              title={'Pump List'}
              configItems={configItems}
              cogMenuRef={cogMenuRef}
              onAddNew={() => navigate('/pump-list/add')}
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
          value={pumpList}
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
            'pumpName',
            'location',
            'hwUniqueNo',
            'emMinRange',
            'emMaxRange',
            'emMinCount',
            'emMaxCount',
            'description',
          ]}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {/* <Column selectionMode="multiple" headerStyle={{ width: '2rem' }}></Column> */}
          <Column field="srNo" header="SR No." sortable style={{ minWidth: '6rem' }}></Column>
          <Column
            field="locationdto.name"
            header="Location"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="hwUniqueNo"
            header="H/W No"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="swDeviceId"
            header="S/W Device ID"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column field="pumpName" header="Name" sortable style={{ minWidth: '10rem' }}></Column>

          <Column
            field="emMinRange"
            header="EM Min Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>

          <Column
            field="emMaxRange"
            header="EM Max Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="emMinCount"
            header="EM Min Count"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="emMaxCount"
            header="EM Max Count"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="description"
            header="Description"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
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
export default PumpList
