import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const FlowmeterDiagram = () => {
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
    const casingMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.5,
    })
    const casingMesh = new THREE.Mesh(casingGeometry, casingMaterial)
    scene.add(casingMesh)

    // Create propeller geometry
    const propellerGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1)
    const propellerMaterial = new THREE.MeshPhongMaterial({ color: 0x0077ff })
    const propellerMesh = new THREE.Mesh(propellerGeometry, propellerMaterial)
    propellerMesh.position.set(0, 0, -1)
    scene.add(propellerMesh)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)

      // Rotate propeller for animation
      propellerMesh.rotation.z += 0.1

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
