import { useCallback, useState, useEffect } from 'react'
import React from 'react'

import {
  createPump,
  updatePumpById,
  getAllPump,
  deletePumpById,
  getPumpById,
} from '../../../services/pumpService'
import { toast } from 'react-toastify'
import useTank from 'src/views/tank/hooks/useEditTank'
import { useNavigate } from 'react-router-dom'
import { PumpInitialState, deviceTypes } from 'src/constant/ComponentState'
const usePump = ({ id, will_refetch }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pumpData, setPumpData] = useState(PumpInitialState)
  const [pumpList, setPumpList] = useState([])
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [refetch, setRefetch] = useState(will_refetch)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refetch) {
          const result = await fetchAllPump()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = data?.map((row, index) => ({ ...row, srNo: index + 1 }))
            setPumpList(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchPumpById(id)
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = {
              ...data,
              location: { id: data?.locationdto.id, name: data?.locationdto.name },
            }
            console.log('Get by id', updatedData)
            setPumpData(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error(error.message)
      }
    }
    fetchData()
  }, [refetch, id])
  const handleSuccessSubmit = () => {
    setPumpData(PumpInitialState)
    setErrors({})
    navigate(-1)
  }
  const validateForm = (formState) => {
    const errors = {}

    const fieldsToValidate = [
      'location',
      'hwUniqueNo',
      'pumpName',
      'emMinRange',
      'emMaxRange',
      'emMinCount',
      'emMaxCount',
    ]
    // Validate TankInfo fields
    fieldsToValidate.forEach((field) => {
      if (typeof formState[field] === 'string' && !formState[field]?.trim()) {
        errors[field] = 'Please fill out this field.'
      } else if (
        ['emMinRange', 'emMaxRange', 'emMinCount', 'emMaxCount'].includes(field) &&
        formState[field] <= 0
      ) {
        errors[field] = 'Please fill out with positive value.'
      }
    })
    return errors
  }

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let result
    let deviceTypeId = deviceTypes?.pump
    const formErrors = validateForm(pumpData)
    if (Object.keys(formErrors).length === 0) {
      let requestBody = { ...pumpData, deviceTypeId: deviceTypeId }
      requestBody['locationdto'] = { id: requestBody?.location?.id }
      delete requestBody['location']
      // Form is valid, submit data
      if (id) {
        // update
        result = await updateExistingPump(requestBody)
        if (result?.status) {
          setTimeout(handleSuccessSubmit(), 2000)
        }
      } else {
        // create new
        result = await createNewPump(requestBody)
        if (result?.status) {
          handleSuccessSubmit()
        }
      }
      console.log('Form submitted:', pumpData)
    } else {
      setErrors(formErrors)
    }
  }

  const handleChange = useCallback((e) => {
    let { name, value } = e.target
    setPumpData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }, [])

  const createNewPump = async (pumpData) => {
    setLoading(true)
    setError(null)
    try {
      console.log('pump Data', pumpData)
      const newPump = await createPump(pumpData)
      setLoading(false)
      let { status, code, message, data } = newPump
      if (status) {
        toast.success(
          <>
            <div> {message}</div>
            <div>Software device id: {data}</div>
          </>,
        )
      } else {
        toast.error(message)
      }
      return newPump
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const updateExistingPump = async (pumpData) => {
    setLoading(true)
    setError(null)

    try {
      const updatedPump = await updatePumpById(pumpData)
      setLoading(false)
      let { status, code, message, data } = updatedPump
      if (status) {
        toast.success(message)
      } else {
        toast.error(message)
      }
      return updatedPump
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchAllPump = async () => {
    setLoading(true)
    setError(null)

    try {
      const clients = await getAllPump()
      setLoading(false)
      return clients
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchPumpById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const pump = await getPumpById(id)
      setLoading(false)
      return pump
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removePumpById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deletePumpById(id)
      setLoading(false)
      let { status, code, message, data } = response
      if (status) {
        toast.success(message)
        setRefetch(true)
      } else {
        toast.error(message)
      }
      return response
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  return {
    loading,
    error,
    formData: pumpData,
    handleChange,
    createNewPump,
    updateExistingPump,
    fetchAllPump,
    fetchPumpById,
    errors,
    handleSubmit,
    pumpList,
    removePumpById,
    handleBack,
  }
}

export default usePump
