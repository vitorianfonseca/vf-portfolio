"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function CubeMesh() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.x = s.clock.elapsedTime * 0.45
    ref.current.rotation.y = s.clock.elapsedTime * 0.65
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.55} />
    </mesh>
  )
}

export function MiniCube({ size = 90 }: { size?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} gl={{ alpha: true, antialias: true }}
      style={{ width: size, height: size, background: "transparent" }}>
      <CubeMesh />
    </Canvas>
  )
}

function TorusMesh() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.x = s.clock.elapsedTime * 0.55
    ref.current.rotation.y = s.clock.elapsedTime * 0.35
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.65, 0.22, 10, 24]} />
      <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.45} />
    </mesh>
  )
}

export function MiniTorus({ size = 90 }: { size?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} gl={{ alpha: true, antialias: true }}
      style={{ width: size, height: size, background: "transparent" }}>
      <TorusMesh />
    </Canvas>
  )
}

function OctaMesh() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.x = s.clock.elapsedTime * 0.3
    ref.current.rotation.y = s.clock.elapsedTime * 0.75
    ref.current.rotation.z = s.clock.elapsedTime * 0.2
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.85, 0]} />
      <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.45} />
    </mesh>
  )
}

export function MiniOctahedron({ size = 90 }: { size?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} gl={{ alpha: true, antialias: true }}
      style={{ width: size, height: size, background: "transparent" }}>
      <OctaMesh />
    </Canvas>
  )
}
