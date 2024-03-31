import React, { useState, useEffect, useRef, useCallback } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../../components/common/Dialog'
import { Panel } from 'primereact/panel'
import useTank from './hooks/useEditTank'
import { PanelHeaderTemplate, DataTableHeader, ActionBodyTemplate } from '../flowmeter/Template'
import { Menu } from 'primereact/menu'
import { tankTableColumnState } from '../../constant/ComponentState'
import { useConstant } from '../../constant/hooks/useConstantHook'
export const configItems = [
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'pi pi-refresh',
  },
  {
    key: 'search',
    label: 'Search',
    icon: 'pi pi-search',
  },
  { key: 'export_pdf', label: 'Export PDF', icon: 'pi pi-file-pdf' },
  {
    separator: true,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: 'pi pi-times',
  },
]
const TankList = ({}) => {
  const { tankList, removeTankById, setRefetch } = useTank({ id: null, will_refetch: true })
  const { exportPdf } = useConstant()
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
    HWUniqueNO: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tankType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tankName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tankCapacity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    LTMinRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    LTMaxRange: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    LTMinCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    LTMaxCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  let actionMenuItems = [
    { label: 'Add Person', icon: 'pi pi-user-plus' },
    { label: 'Add Location', icon: 'pi pi-compass' },
    { label: 'View Tank', icon: 'pi pi-eye', command: (e) => handleView(e) },
    {
      label: 'Update Tank',
      icon: 'pi pi-user-edit',
      command: (e) => handleEdit(e),
    },
    { label: 'Delete Tank', icon: 'pi pi-trash', command: (e) => handleDelete(e) },
  ]
  useEffect(() => {}, [])
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const exportColumns = tankTableColumnState.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }))

  const handleConfirm = async () => {
    let result = await removeTankById(selectedForAction?.encryptedId)
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    console.log('Canceled')
    setIsConfirmOpen(false)
  }

  const handleView = (evt) => {
    evt.originalEvent.preventDefault()
    navigate(`/tank-list/view/${selectedForAction?.encryptedId}`)
    // Implement your view logic here
  }

  const handleEdit = (evt) => {
    evt.originalEvent.preventDefault()
    navigate(`/tank-list/update/${selectedForAction?.encryptedId}`)
    // Implement your edit logic here
  }

  const handleDelete = (event) => {
    event.originalEvent.preventDefault()
    setIsConfirmOpen(true)
    // // Implement your delete logic here
    console.log('Delete tab clicked')
  }

  const handleOpenMenu = (e, rowData) => {
    actionMenuRef.current.toggle(e)
    console.log('action dow data oening menu', rowData)
    setSelectedForAction(rowData)
  }

  const handleCloseMenu = (e, rowData) => {
    // setMenu(null);
    console.log('closing menu')
    setSelectedForAction(null)
  }
  let extendedConfigItems = configItems?.reduce((acc, cur) => {
    if (cur?.key === 'export_pdf') {
      acc.push({ ...cur, command: () => exportPdf(exportColumns, tankList, 'tank.pdf') })
    } else {
      acc.push(cur)
    }
    return acc
  }, [])

  return (
    <React.Fragment>
      <Menu model={actionMenuItems} popup ref={actionMenuRef} id="action_menu" />
      {/* <ConfirmDialog accept={handleConfirm} /> */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to delete this item having id:? ${selectedForAction?.encryptedId}`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Panel
        headerTemplate={
          (options) => (
            <PanelHeaderTemplate
              options={options}
              title={'Tank List'}
              configItems={extendedConfigItems}
              cogMenuRef={cogMenuRef}
              onAddNew={() => navigate('/tank-list/add')}
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
          value={tankList}
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
            'tankName',
            'tankCapacity',
            'location',
            'hwUniqueNo',
            'swDeviceId',
            'tankType',
            'ltMinRange',
            'ltMaxRange',
            'ltMinCount',
            'ltMaxCount',
            'description',
          ]}
          // selectionMode={'checkbox'}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          // frozenRow={true}
          // frozenValue={null}
          size="small"
          stripedRows={true}
          alignFrozen="left"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {tankTableColumnState.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable={col?.sortable}
              style={col?.style}
              // frozenRow={col?.frozen}
              frozen={true}
            />
          ))}
          <Column
            field=""
            header="Action"
            body={(rowData) => (
              <ActionBodyTemplate rowData={rowData} handleOpenMenu={handleOpenMenu} />
            )}
            headerStyle={{ width: '4rem' }}
          />
        </DataTable>
      </div>
      {/* </div> */}
    </React.Fragment>
  )
}
export default TankList
