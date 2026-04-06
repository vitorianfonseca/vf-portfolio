"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function GlassIcosa() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.y = t * 0.18
    meshRef.current.rotation.z = t * 0.07
    wireRef.current.rotation.copy(meshRef.current.rotation)
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
    wireRef.current.position.y = meshRef.current.position.y
  })

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshPhysicalMaterial
          color="#fce7ef"
          emissive="#fb7185"
          emissiveIntensity={0.25}
          metalness={0.0}
          roughness={0.0}
          transmission={0.85}
          thickness={0.5}
          ior={1.8}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.02}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.15} />
      </mesh>
    </>
  )
}

function FloatRing({ radius, tilt, speed, color, opacity }: {
  radius: number; tilt: number; speed: number; color: string; opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.007, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

export function ContactGem() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4,  4,  3]} color="#ffffff"  intensity={50} />
      <pointLight position={[-3, -2, 2]} color="#fb7185"  intensity={35} />
      <pointLight position={[0,  -4, 3]} color="#fce7ef"  intensity={20} />
      <pointLight position={[2,  3, -2]} color="#c4b5fd"  intensity={18} />

      <GlassIcosa />
      <FloatRing radius={2.1} tilt={Math.PI / 3}   speed={0.25}  color="#fb7185" opacity={0.20} />
      <FloatRing radius={2.6} tilt={Math.PI / 6}   speed={-0.15} color="#fce7ef" opacity={0.14} />
    </Canvas>
  )
}
