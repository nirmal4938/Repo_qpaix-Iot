import { useCallback, useState, useEffect } from 'react'
import React from 'react'

import {
  createFlowmeter,
  updateFlowmeterById,
  getAllFlowmeter,
  getFlowmeterById,
  deleteFlowmeterById,
} from '../../../services/flowmeterService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FlowmeterInitialState, deviceTypes } from 'src/constant/ComponentState'
const useFlowmeter = ({ id, will_refetch }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [flowMeterData, setFlowMeterData] = useState(FlowmeterInitialState)
  const [flowMeterList, setFlowMeterList] = useState([
    {
      srNo: 1,
      location: 'Dummy Location',
      hwUniqueNo: 'Dummy HWUniqueNO',
      deviceName: 'Dummy Device',
      minRange: '10',
      maxRange: '100',
      minCount: '5',
      maxCount: '50',
      swDeviceId: 100,
      description: 'This is a dummy description zzzxx.',
    },
    {
      srNo: 1,
      location: 'Dummy Unique',
      hwUniqueNo: 'Dummy HWUniqueNO 1',
      deviceName: 'Dummy Device',
      minRange: 104,
      maxRange: '100',
      minCount: '5',
      maxCount: '50',
      swDeviceId: 100,
      description: 'This is a dummy description.',
    },
  ])
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [refetch, setRefetch] = useState(will_refetch)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refetch) {
          const result = await fetchFlowmeterList()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            // console.log('data-list', dataList)
            // let { flowMeterDto, locationRegisterDTO } = data
            let updatedData = data?.map((row, index) => ({ ...row, srNo: index + 1 }))
            setFlowMeterList(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchFlowmeterById(id)
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = {
              ...data,
              location: { id: data?.locationdto?.id, name: data?.locationdto?.name },
            }
            setFlowMeterData(updatedData)
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
  }, [id, refetch])

  const handleSuccessSubmit = () => {
    setFlowMeterData(FlowmeterInitialState)
    setErrors({})
    navigate(-1)
  }
  const fetchFlowmeterList = async () => {
    try {
      const flowmeterList = await getAllFlowmeter()
      return flowmeterList
    } catch (error) {
      throw error
      // You might want to handle errors here or in the calling component
    }
  }
  const validateForm = (formState) => {
    const errors = {}

    const fieldsToValidate = [
      'location',
      'hwUniqueNo',
      'deviceName',
      'minRange',
      'maxRange',
      'minCount',
      'maxCount',
    ]
    // Validate flowmeter fields
    fieldsToValidate.forEach((field) => {
      if (typeof formState[field] === 'string' && !formState[field]?.trim()) {
        errors[field] = 'Please fill out this field.'
      }
      if (typeof formState[field] === 'object' && !formState[field]) {
        errors[field] = 'Please fill out this field.'
      } else if (
        ['minRange', 'maxRange', 'minCount', 'maxCount'].includes(field) &&
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
    let deviceTypeId = deviceTypes?.flowmeter
    const formErrors = validateForm(flowMeterData)
    console.log('Form formErrors:', formErrors)

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data
      let requestBody = { ...flowMeterData, deviceTypeId: deviceTypeId }
      requestBody['locationdto'] = { id: flowMeterData?.location?.id }
      delete requestBody['location']
      if (id) {
        // update
        result = await updateExistingFlowmeter(requestBody)
        if (result?.status) {
          handleSuccessSubmit()
        }
      } else {
        // create new
        result = await createNewFlowmeter(requestBody)
        if (result?.status) {
          handleSuccessSubmit()
        }
      }
      // console.log('Form submitted:', flowMeterData)
    } else {
      // Form has errors, display error messages
      setErrors(formErrors)
    }
  }

  const handleChange = useCallback((e) => {
    let { name, value } = e.target
    setFlowMeterData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }, [])

  const createNewFlowmeter = async (requestBody) => {
    setLoading(true)
    setError(null)

    try {
      const newFlowmeter = await createFlowmeter(requestBody)
      setLoading(false)
      let { status, code, message, data } = newFlowmeter
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
      return newFlowmeter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
    // let { status, code, message, data } = result
  }

  const updateExistingFlowmeter = async (requestBody) => {
    setLoading(true)
    setError(null)
    try {
      const updatedFlowmeter = await updateFlowmeterById(requestBody)
      let { status, code, message, data } = updatedFlowmeter
      if (status) {
        toast.success(message)
      } else {
        toast.error(message)
      }
      setLoading(false)
      return updatedFlowmeter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchFlowmeterById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const flowmeter = await getFlowmeterById(id)
      setLoading(false)
      return flowmeter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removeFlowmeterById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deleteFlowmeterById(id)
      setLoading(false)
      let { status, code, message, data } = response
      if (status) {
        setRefetch(true)
        toast.success(message)
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
    formData: flowMeterData,
    handleChange,
    createNewFlowmeter,
    updateExistingFlowmeter,
    fetchFlowmeterById,
    removeFlowmeterById,
    errors,
    handleSubmit,
    flowMeterList,
    handleBack,
  }
}

export default useFlowmeter
