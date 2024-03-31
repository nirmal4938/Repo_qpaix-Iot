import { useCallback, useEffect, useState } from 'react'
import {
  createLocation,
  updateLocationById,
  getAllLocation,
  getLocationById,
  deleteLocationById,
} from '../../../../services/locationService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { locationInitialState } from 'src/constant/ComponentState'
import { personType } from '../../clientList/types/location.type'
const transformApiResponse = (data) => {
  const locationInfo = {
    id: data?.id,
    name: data.name || '',
    latitude: data.latitude || '',
    longitude: data.longitude || '',
    map: data?.map || '',
  }

  const contactPersonInfo = data?.personInfos?.length ? data?.personInfos : [personType]

  const client = { encryptedId: data?.client?.encryptedId, name: data?.client?.name }

  return { locationInfo, contactPersonInfo, client }
}

const useEditLocation = ({ id, will_refetch }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locationData, setLocationData] = useState(locationInitialState)
  const [errors, setErrors] = useState({})
  const [locationsDropdown, setLocationsDropdown] = useState([])
  const [locations, setLocations] = useState([])
  const [refetch, setRefetch] = useState(will_refetch)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        if (refetch) {
          let locationsResult = await fetchAllLocations()
          let { code: code1, data: data1, message: message1, status: status1 } = locationsResult
          if (code1 === 200 && status1) {
            let allList = data1?.map((row, index) => ({
              id: row?.id,
              serialId: index + 1,
              ...row,
            }))
            setLocations(allList)
            let updatedData = data1?.map((row, index) => ({
              id: row?.id,
              name: row?.name?.concat('--')?.concat(row?.client?.name),
            }))
            setLocationsDropdown(updatedData)
          } else if (!status1) {
            toast.error(message1)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchLocationById(id)
          let { code, data, message, status } = result
          if (code === 200 && status) {
            let updatedData = transformApiResponse(data)
            setLocationData(updatedData)
            // toast.success(message)
          } else if (!status) {
            toast.error(message)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchLocations()
  }, [refetch, id])
  const fetchAllLocations = async () => {
    setLoading(true)
    setError(null)
    try {
      const locations = await getAllLocation()
      setLoading(false)
      return locations
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const handleSubmit = async (requestBody) => {
    // e.preventDefault()
    let result
    try {
      if (id) {
        result = await updateLocation(requestBody)
        let { status, code, message, data } = result
        if (status) {
          toast.success(message)
        } else {
          toast.error(message)
        }
      } else {
        // create new
        result = await createNewLocation(requestBody)
        let { status, code, message, data } = result
        if (status) {
          toast.success(message)
        } else {
          toast.error(message)
        }
      }
      return { result }
    } catch (err) {}
  }

  const handleChange = useCallback(
    (section, e) => {
      let { name, value } = e.target

      // dispatch(updateClientField(section, name, value))
      if (name.includes('.')) {
        const [sectionKey, nestedKey] = name.split('.')
        setLocationData((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [sectionKey]: {
              ...prevState[section][sectionKey],
              [nestedKey]: value,
            },
          },
        }))
      } else {
        // dispatch(updateClientField(section, name, value))
        setLocationData((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [name]: value,
          },
        }))
      }
    },
    [locationData],
  )

  const handleMapClick = (section, event) => {
    const { latLng } = event
    setLocationData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        locationMapPosition: {
          lat: latLng.lat(),
          lng: latLng.lng(),
        },
      },
    }))
  }

  const createNewLocation = async (body) => {
    setLoading(true)
    setError(null)

    try {
      const newClient = await createLocation(body)
      setLoading(false)
      let { status, code, message, data } = newClient

      return newClient
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const updateLocation = async (body) => {
    setLoading(true)
    setError(null)

    try {
      const updatedLocation = await updateLocationById(body)
      setLoading(false)
      let { status, code, message, data } = updatedLocation

      return updatedLocation
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchLocationById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const location = await getLocationById(id)
      setLoading(false)
      return location
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removeLocationById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deleteLocationById(id)
      let { status, code, message, data } = response
      if (status) {
        toast.success(message)
        setRefetch(true)
      } else {
        toast.error(message)
      }
      setLoading(false)
      return response
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
    formData: locationData,
    handleChange,
    errors,
    handleSubmit,
    handleMapClick,
    locations,
    locationsDropdown,
    removeLocationById,
  }
}

export default useEditLocation
