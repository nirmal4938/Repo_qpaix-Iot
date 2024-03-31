import React, { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
const MapComponent = ({ center, zoom, onUpdateCoordinates, id, isDisable }) => {
  const mapRef = useRef(null)
  console.log('map-id', id)
  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(`map-id-${id}`, {
        center: center,
        zoom: zoom,
        scrollWheelZoom: !isDisable,
        dragging: !isDisable,
      })

      // Add a tile layer (using OpenStreetMap tiles)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)

      // Add a click event listener to the map
      mapRef.current.on('click', isDisable && onUpdateCoordinates)
    }

    // Cleanup function
    return () => {
      mapRef.current.off('click', onUpdateCoordinates) // Remove the click event listener
      mapRef.current.remove() // Remove the map instance
      mapRef.current = null // Reset the map reference
    }
  }, [center])
  var popup = L.popup()

  // Function to handle map click events

  return (
    <div
      id={`map-id-${id}`}
      style={{ width: '100%', height: '400px', userSelect: isDisable ? 'none' : '' }}
    ></div>
  )
}
MapComponent.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  onUpdateCoordinates: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
}

export default React.memo(MapComponent)
