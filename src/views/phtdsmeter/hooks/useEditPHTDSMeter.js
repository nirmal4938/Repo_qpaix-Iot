import { useCallback, useState, useEffect } from 'react'
import React from 'react'
import {
  createPhTdSMeter,
  updatePhTdSMeterById,
  getAllPhTdSMeter,
  getPhTdSMeterById,
  deletePhTdSMeterById,
} from '../../../services/phTdSMeterService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { PHTDSMeterInitialState, deviceTypes } from 'src/constant/ComponentState'
const usePHTDSMeter = ({ id, wil_refetch }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [phTDSMeterData, setPHTDSMeterData] = useState(PHTDSMeterInitialState)
  const [phTDSMeterList, setphTDSMeterList] = useState([])
  const [errors, setErrors] = useState({})
  const [refetch, setRefetch] = useState(wil_refetch)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refetch) {
          const result = await fetchAllPhTdSMeter()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = data?.map((row, index) => ({ ...row, srNo: index + 1 }))
            setphTDSMeterList(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchPhTdSMeterById()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = {
              ...data,
              location: { id: data?.locationdto?.id, name: data?.locationdto?.name },
            }
            setPHTDSMeterData(updatedData)
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
    setPHTDSMeterData(PHTDSMeterInitialState)
    setErrors({})
    navigate(-1)
  }
  const validateForm = (formState) => {
    const errors = {}
    const fieldsToValidate = [
      'location',
      'hwUniqueNo',
      'meterName',
      'phMinRange',
      'phMaxRange',
      'phMinCount',
      'phMaxCount',
      'tdsMinRange',
      'tdsMaxRange',
      'tdsMinCount',
      'tdsMaxCount',
    ]
    // Validate TankInfo fields
    fieldsToValidate.forEach((field) => {
      if (typeof formState[field] === 'string' && !formState[field]?.trim()) {
        errors[field] = 'Please fill out this field.'
      } else if (
        [
          'phMinRange',
          'phMaxRange',
          'phMinCount',
          'phMaxCount',
          'tdsMinRange',
          'tdsMaxRange',
          'tdsMinCount',
          'tdsMaxCount',
        ].includes(field) &&
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
    let deviceTypeId = deviceTypes?.phtdsmeter
    const formErrors = validateForm(phTDSMeterData)
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data
      let requestBody = { ...phTDSMeterData, deviceTypeId: deviceTypeId }
      requestBody['locationdto'] = { id: requestBody?.location?.id }
      delete requestBody['location']
      if (id) {
        // update
        result = await updatePhTdSMeter(requestBody)
        if (result?.status) {
          handleSuccessSubmit()
        }
      } else {
        // create new
        result = await createNewPhTdSMeter(requestBody)
        if (result?.status) {
          handleSuccessSubmit()
        }
      }
      console.log('Form submitted:', requestBody)
    } else {
      // Form has errors, display error messages
      setErrors(formErrors)
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setPHTDSMeterData((prevState) => ({
      ...prevState,

      [name]: value,
    }))
  }

  const createNewPhTdSMeter = async (requestBody) => {
    setLoading(true)
    setError(null)

    try {
      const newMeter = await createPhTdSMeter(requestBody)
      setLoading(false)
      let { status, code, message, data } = newMeter
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
      return newMeter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
    // let { status, code, message, data } = result
  }

  const updatePhTdSMeter = async (requestBody) => {
    setLoading(true)
    setError(null)
    try {
      const updatedMeter = await updatePhTdSMeterById(requestBody)
      let { status, code, message, data } = updatedMeter
      if (status) {
        toast.success(message)
      } else {
        toast.error(message)
      }
      setLoading(false)
      return updatedMeter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchAllPhTdSMeter = async () => {
    setLoading(true)
    setError(null)

    try {
      const meters = await getAllPhTdSMeter()
      setLoading(false)
      return meters
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchPhTdSMeterById = async () => {
    setLoading(true)
    setError(null)

    try {
      const meter = await getPhTdSMeterById(id)
      setLoading(false)
      return meter
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removePhTdsMeterById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deletePhTdSMeterById(id)
      setLoading(false)
      setRefetch(true)
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
    formData: phTDSMeterData,
    handleChange,
    createNewPhTdSMeter,
    updatePhTdSMeter,
    fetchAllPhTdSMeter,
    fetchPhTdSMeterById,
    removePhTdsMeterById,
    errors,
    handleSubmit,
    phTDSMeterList,
    handleBack,
  }
}

export default usePHTDSMeter
