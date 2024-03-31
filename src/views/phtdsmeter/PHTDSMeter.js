import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'src/components/common/Dialog'
import { Panel } from 'primereact/panel'
import { Menu } from 'primereact/menu'
import { configItems } from '../tank/Tank'
import usePHTDSMeter from './hooks/useEditPHTDSMeter'
import { PanelHeaderTemplate, DataTableHeader, ActionBodyTemplate } from '../flowmeter/Template'

const PHTDSMeterList = ({}) => {
  const { phTDSMeterList, removePhTdsMeterById } = usePHTDSMeter({ id: null, wil_refetch: true })
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
    meterName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phMinRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phMaxRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phMinCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phMaxCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tdsMinRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tdsMaxRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tdsMinCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tdsMaxCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Location', icon: 'pi pi-compass' },
    { label: 'View meter', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update meter',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    { label: 'Delete meter', icon: 'pi pi-trash', command: (e) => handleDelete(e) },
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
    let result = await removePhTdsMeterById(selectedForAction?.encryptedId)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }

  const handleView = (e) => {
    navigate(`/ph-Tds-Meter-list/view/${selectedForAction?.encryptedId}`)
    // Implement your view logic here
  }

  const handleEdit = (e) => {
    // console.log('Edit', rowData?.id)
    navigate(`/ph-Tds-Meter-list/update/${selectedForAction?.encryptedId}`)

    // Implement your edit logic here
  }

  const handleDelete = async (e) => {
    setIsConfirmOpen(true)

    // Implement your delete logic here
  }

  const handleOpenMenu = (e, rowData) => {
    actionMenuRef.current.toggle(e)
    // console.log("ro")
    setSelectedForAction(rowData)
  }

  return (
    <React.Fragment>
      <Menu model={actionMenuItems} popup ref={actionMenuRef} id="action_menu" />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to delete record with id: ${selectedForAction?.encryptedId}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Panel
        headerTemplate={
          (options) => (
            <PanelHeaderTemplate
              options={options}
              title={'ph TdS Meter List'}
              configItems={configItems}
              cogMenuRef={cogMenuRef}
              onAddNew={() => navigate('/ph-Tds-Meter-list/add')}
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
          value={phTDSMeterList}
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
            'phMinRange',
            'phMaxRange',
            'phMinCount',
            'phMaxCount',
            'tdsMinRange',
            'tdsMaxRange',
            'tdsMinCount',
            'tdsMaxCount',
          ]}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {/* <Column selectionMode="multiple" headerStyle={{ width: '2rem' }}></Column> */}
          <Column field="id" header="ID" sortable></Column>
          <Column
            field="swDeviceId"
            header="S/W Device Id"
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
            field="locationdto.name"
            header="Location"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="meterName"
            header="Meter Name"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>

          <Column
            field="phMinRange"
            header="ph Min Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>

          <Column
            field="phMaxRange"
            header="ph Max Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="phMinCount"
            header="ph Min Count"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="phMaxCount"
            header="ph Max Count"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="tdsMinRange"
            header="TDS Min Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>

          <Column
            field="tdsMaxRange"
            header="TDS Max Range"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="tdsMinCount"
            header="TDS Min Count"
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="tdsMaxCount"
            header="TDS Max Count"
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
export default PHTDSMeterList
