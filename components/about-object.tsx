"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const TURNS  = 3.5
const STEPS  = 42
const RADIUS = 0.9
const HEIGHT = 3.6

function HelixStrand({ offset, color, emissive }: { offset: number; color: string; emissive: string }) {
  const nodes = useMemo(() => {
    return Array.from({ length: STEPS }, (_, i) => {
      const t = i / (STEPS - 1)
      const angle = t * TURNS * Math.PI * 2 + offset
      return new THREE.Vector3(
        t * HEIGHT - HEIGHT / 2,
        Math.cos(angle) * RADIUS,
        Math.sin(angle) * RADIUS
      )
    })
  }, [offset])

  const curve   = useMemo(() => new THREE.CatmullRomCurve3(nodes), [nodes])
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.022, 7, false), [curve])

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={i % 4 === 0 ? 2.5 : 1.0}
          />
        </mesh>
      ))}
    </group>
  )
}

function CrossLinks() {
  const geo = useMemo(() => {
    const positions: number[] = []
    const linkCount = 14
    for (let i = 0; i < linkCount; i++) {
      const t = i / (linkCount - 1)
      const angle = t * TURNS * Math.PI * 2
      const y = t * HEIGHT - HEIGHT / 2
      positions.push(
        Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS,
        Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS,
      )
    }
    const arr = new Float32Array(positions)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#c4b5fd" transparent opacity={0.22} />
    </lineSegments>
  )
}

function Dust() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(60 * 3)
    for (let i = 0; i < 60; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 5
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fb7185" size={0.022} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.x += 0.004
    groupRef.current.rotation.y += (pointer.x * 0.2  - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.z += (pointer.y * 0.12 - groupRef.current.rotation.z) * 0.03
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
  })

  return (
    <group ref={groupRef}>
      <HelixStrand offset={0}       color="#fce7ef" emissive="#fb7185" />
      <HelixStrand offset={Math.PI} color="#e9d5ff" emissive="#c4b5fd" />
      <CrossLinks />
      <Dust />
    </group>
  )
}

export function AboutObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true, antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[ 4,  4,  3]} color="#ffffff" intensity={50} />
      <pointLight position={[-3, -2,  2]} color="#fb7185" intensity={35} />
      <pointLight position={[ 2,  3, -2]} color="#c4b5fd" intensity={20} />
      <Scene />
    </Canvas>
  )
}
