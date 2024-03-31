import React, { useState, useEffect } from 'react'

export const useConstant = () => {
  const [countriesDropdown, setCountriesDropdown] = useState([])
  const [statesDropdown, setStatesDropdown] = useState([])

  useEffect(() => {})

  const fetchCountries = () => {}

  const fetchStates = () => {}
  const exportPdf = (exportColumns, tableData, file_name) => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0)

        doc.autoTable(exportColumns, tableData)
        doc.save(file_name)
      })
    })
  }
  return {
    countriesDropdown,
    statesDropdown,
    exportPdf,
  }
}
