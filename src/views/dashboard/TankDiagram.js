import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const TankDiagram = ({ tankData }) => {
  const containerRef = useRef()

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create tank geometry
    const tankGeometry = new THREE.CylinderGeometry(2, 2, 4, 32, 1, true)
    const tankMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.5,
    }) // Phong material for more realistic lighting
    const tankMesh = new THREE.Mesh(tankGeometry, tankMaterial)
    scene.add(tankMesh)

    // Calculate default liquid level
    const defaultLiquidLevel = tankData.maxLevel * 0.68 // Default liquid level set to 68%

    // Create liquid level geometry
    const liquidLevelGeometry = new THREE.CylinderGeometry(
      1.9, // Radius at the top
      1.9, // Radius at the bottom
      3.8 * (defaultLiquidLevel / tankData.maxLevel), // Height of the cylinder
      32, // Number of segments
    )

    // Create liquid level material
    const liquidLevelMaterial = new THREE.MeshPhongMaterial({
      color: 0x0077ff, // Liquid color
      transparent: false, // Make the material transparent
      opacity: 0.7, // Set the opacity
    })

    // Create liquid level mesh
    const liquidLevelMesh = new THREE.Mesh(liquidLevelGeometry, liquidLevelMaterial)

    // Position the liquid level mesh at the correct height within the tank
    liquidLevelMesh.position.y = -2 + (3.8 * (defaultLiquidLevel / tankData.maxLevel)) / 2

    // Add the liquid level mesh to the scene
    scene.add(liquidLevelMesh)

    // Load texture for tank
    // const tankTextureLoader = new THREE.TextureLoader()
    // tankTextureLoader.load('/textures/tank_texture.jpg', (texture) => {
    //   tankMaterial.map = texture
    //   tankMaterial.needsUpdate = true
    // })

    camera.position.z = 5

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const animate = function () {
      requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      containerRef.current.removeChild(renderer.domElement)
    }
  }, [tankData])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '200px', background: 'lightgrey' }}
    ></div>
  )
}
