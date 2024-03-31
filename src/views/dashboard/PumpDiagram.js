import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const PumpDiagram = () => {
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
    containerRef.current.appendChild(renderer.domElement)

    // Create casing geometry
    const casingGeometry = new THREE.CylinderGeometry(1, 1, 2, 32)
    const casingMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc })
    const casingMesh = new THREE.Mesh(casingGeometry, casingMaterial)
    scene.add(casingMesh)

    // Create impeller geometry
    const impellerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
    const impellerMaterial = new THREE.MeshPhongMaterial({ color: 0x0077ff })
    const impellerMesh = new THREE.Mesh(impellerGeometry, impellerMaterial)
    impellerMesh.position.set(0, 0, 1)
    scene.add(impellerMesh)

    // Create motor geometry
    const motorGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const motorMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    const motorMesh = new THREE.Mesh(motorGeometry, motorMaterial)
    motorMesh.position.set(0, 0, -1)
    scene.add(motorMesh)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)

      // Rotate impeller for animation
      impellerMesh.rotation.z += 0.01

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      containerRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '200px', background: 'lightgrey' }}
    ></div>
  )
}
