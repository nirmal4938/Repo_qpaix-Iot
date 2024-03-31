import { useCallback, useState, useEffect } from 'react'
import {
  createClient,
  updateClientById,
  getAllClients,
  getClientById,
  deleteClientById,
} from '../../../../services/clientService'
import { updateClientField } from 'src/redux/actions/ClientAction'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clientInitialState } from 'src/constant/ComponentState'
import { locationType, personType, clientType } from '../types/location.type'
const transformApiResponse = (request) => {
  const clientInfo = {
    name: request.name,
    address: request.address,
    city: request.city,
    description: request.description,
    country: request?.country,
    state: request?.state,
    id: request.encryptedId,
  }
  const contactPersonInfo = request.personInfos?.length ? request.personInfos : [personType]
  // const locations = request.locations?.length ? request.locations : [locationType]

  return {
    clientInfo,
    contactPersonInfo,
    // locations,
  }
}

const useClient = ({ id, will_refetch }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [clientData, setClientData] = useState(clientInitialState)
  const [clientList, setClientList] = useState([])
  const [errors, setErrors] = useState({})
  const [refetch, setRefetch] = useState(will_refetch)
  const [clientDropdown, setClientDropdwon] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refetch) {
          const result = await fetchAllClients()
          let { code, data, message, status } = result
          if (code === 200 && status) {
            // console.log('data-list', dataList)
            let updatedData = data?.map((row, index) => ({
              id: row?.encryptedId,
              srNo: index + 1,
              name: row?.name,
              address: row?.address,
              city: row?.city,
              country: row?.country?.name,
              state: row?.state?.name,
              description: row?.description,
              encryptedId: row?.encryptedId,
            }))
            setClientList(updatedData)
            let dropdwonData = data?.map((cl, index) => ({
              encryptedId: cl?.encryptedId,
              name: cl?.name,
            }))
            console.log('clientDropdown', dropdwonData)
            setClientDropdwon(dropdwonData)
            // toast.success(message)
          } else if (!status) {
            console.log('___>', result)
            toast.error(message)
          }
          setRefetch(false)
        } else if (id) {
          const result = await fetchClientById(id)
          let { code, data, message, status } = result
          if (code === 200 && status) {
            const transformedData = transformApiResponse(data)
            console.log('transformedData', transformedData)

            setClientData(transformedData)
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

  const handleSubmit = async (bodyData) => {
    // e.preventDefault()
    let result
    if (id) {
      // update

      result = await updateClientById(bodyData)
      let { status, code, message, data } = result
      if (status) {
        console.log('result', result)
        toast.success(message)
      } else {
        toast.error(message)
      }
    } else {
      // create new
      result = await createClient(bodyData)
      let { status, code, message, data } = result
      if (status) {
        console.log('result', result)
        toast.success(message)
      } else {
        toast.error(message)
      }
    }
    return { result }
  }

  const handleChange = useCallback(
    (section, e) => {
      let { name, value } = e.target

      dispatch(updateClientField(section, name, value))
      if (name.includes('.')) {
        const [sectionKey, nestedKey] = name.split('.')
        setClientData((prevState) => ({
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
        setClientData((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [name]: value,
          },
        }))
      }
    },
    [clientData],
  )
  // console.log('clientDatat', clientData, errors)
  const createNewClient = async () => {
    setLoading(true)
    setError(null)

    try {
      const newClient = await createClient(clientData)
      setLoading(false)
      return newClient
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const updateExistingClient = async (clientData) => {
    setLoading(true)
    setError(null)

    try {
      const updatedClient = await updateClientById(clientData)
      setLoading(false)
      return updatedClient
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchAllClients = async () => {
    setLoading(true)
    setError(null)

    try {
      const clients = await getAllClients()
      setLoading(false)
      return clients
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const fetchClientById = async (clientId) => {
    setLoading(true)
    setError(null)

    try {
      const client = await getClientById(clientId)
      setLoading(false)
      return client
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  const removeClientById = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deleteClientById(id)
      setLoading(false)
      let { status, code, message, data } = response
      if (status) {
        toast.success(message)
      } else {
        toast.error(message)
      }
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
    formData: clientData,
    handleChange,
    createNewClient,
    updateExistingClient,
    fetchAllClients,
    fetchClientById,
    removeClientById,
    errors,
    handleSubmit,
    clientList,
    clientDropdown,
  }
}

export default useClient
