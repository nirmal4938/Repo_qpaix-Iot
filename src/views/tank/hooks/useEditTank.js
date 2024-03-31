import { useCallback, useState, useEffect } from 'react'
import React from 'react'
import {
  createTank,
  updateTankById,
  getAllTank,
  getTankById,
  deleteTankById,
} from '../../../services/tankService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateTankData } from 'src/redux/actions/TankAction'
import { useNavigate } from 'react-router-dom'
import { TankInitialState, deviceTypes } from 'src/constant/ComponentState'

const useTank = ({ id, will_refetch }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tankData, setTankData] = useState(TankInitialState)
  const [tankList, setTankList] = useState([])
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [refetch, setRefetch] = useState(will_refetch)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refetch) {
          const result = await fetchAllTanks()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = data?.map((row, index) => ({ ...row, srNo: index + 1 }))
            setTankList(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchTankById(id)
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = {
              ...data,
              location: { id: data?.locationdto.id, name: data?.locationdto.name },
            }
            // console.log('Updated data', updatedData)
            setTankData(updatedData)
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

  const validateForm = (formState) => {
    const errors = {}

    const fieldsToValidate = [
      'location',
      'hwUniqueNo',
      'tankType',
      'tankName',
      'tankCapacity',
      'ltMinRange',
      'ltMaxRange',
      'ltMinCount',
      'ltMaxCount',
    ]
    // Validate TankInfo fields
    fieldsToValidate.forEach((field) => {
      if (typeof formState[field] === 'string' && !formState[field]?.trim()) {
        errors[field] = 'Please fill out this field.'
      } else if (typeof formState[field] === 'object' && !formState[field]) {
        errors[field] = 'Please fill out this field.'
      } else if (
        ['tankCapacity', 'ltMinRange', 'ltMaxRange', 'ltMinCount', 'ltMaxCount'].includes(field) &&
        formState[field] <= 0
      ) {
        errors[field] = 'Please fill out with positive value.'
      }
    })
    return errors
  }

  const handleSuccessSubmit = () => {
    setTankData(TankInitialState)
    setErrors({})
    navigate(-1)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let deviceTypeId = deviceTypes?.tank
    let result
    let requestBody = { ...tankData, deviceTypeId: deviceTypeId }
    delete requestBody['updatedDate']
    delete requestBody['createdBy']
    delete requestBody['updatedBy']
    delete requestBody['updatedDate']
    delete requestBody['createdDate']
    delete requestBody['id']
    delete requestBody['isActive']
    delete requestBody['isDeleted']
    const formErrors = validateForm(tankData)
    if (Object.keys(formErrors).length === 0) {
      if (id) {
        requestBody['locationdto'] = { id: requestBody?.location?.id }
        delete requestBody['location']
        // update

        result = await updateExistingTank(requestBody)
        if (result?.status) {
          setTimeout(handleSuccessSubmit(), 2000)
        }

        // console.log('Form submitted-->:', requestBody)
      } else {
        requestBody['locationdto'] = { id: requestBody?.location?.id }
        delete requestBody['location']
        // create new
        result = await createNewTank(requestBody)
        let { status, data, message } = result
        if (status) {
          console.log('data  x x x x x x x', data)
          handleSuccessSubmit()
        }
      }
    } else {
      // Form has errors, display error messages
      setErrors(formErrors)
    }
  }

  const handleChange = useCallback(async (e) => {
    let { name, value } = e.target
    dispatch(updateTankData(name, value))
    setTankData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }, [])

  const createNewTank = async (tankData) => {
    setLoading(true)
    setError(null)

    try {
      const newTank = await createTank(tankData)
      setLoading(false)
      let { status, code, message, data } = newTank
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
      return newTank
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const updateExistingTank = async (body) => {
    setLoading(true)
    setError(null)

    try {
      const updatedTank = await updateTankById(body)
      setLoading(false)
      let { status, code, message, data } = updatedTank
      if (status) {
        toast.success(message)
      } else {
        toast.error(message)
      }
      return updatedTank
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchAllTanks = async () => {
    setLoading(true)
    setError(null)

    try {
      const Tanks = await getAllTank()
      setLoading(false)
      return Tanks
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchTankById = async (TankId) => {
    setLoading(true)
    setError(null)

    try {
      const Tank = await getTankById(TankId)
      setLoading(false)
      return Tank
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removeTankById = async (TankId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deleteTankById(TankId)
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
    formData: tankData,
    handleChange,
    createNewTank,
    updateExistingTank,
    fetchAllTanks,
    fetchTankById,
    removeTankById,
    errors,
    handleSubmit,
    tankList,
    setRefetch,
  }
}

export default useTank
