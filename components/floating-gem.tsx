"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.02
    wireRef.current.rotation.x = meshRef.current.rotation.x
    wireRef.current.rotation.y = meshRef.current.rotation.y
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.12
    wireRef.current.position.y = meshRef.current.position.y
  })

  return (
    <>
      {/* Solid — thin tube, glass-like */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.13, 300, 20, 2, 3]} />
        <meshPhysicalMaterial
          color="#f8d7e3"
          emissive="#fb7185"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.0}
          transmission={0.7}
          thickness={0.4}
          ior={1.9}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe on top — slightly larger */}
      <mesh ref={wireRef} scale={1.01}>
        <torusKnotGeometry args={[1.1, 0.13, 150, 10, 2, 3]} />
        <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.12} />
      </mesh>
    </>
  )
}

function OrbitRing({ radius, tilt, speed, color, opacity }: {
  radius: number; tilt: number; speed: number; color: string; opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Sparkles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 1.6
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fb7185" size={0.03} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

export function FloatingGem() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 3]}  color="#ffffff" intensity={60} />
      <pointLight position={[-4, -3, 2]} color="#c4b5fd" intensity={30} />
      <pointLight position={[0, -5, 4]}  color="#fb7185" intensity={20} />
      <pointLight position={[2, 4, -2]}  color="#fce7ef" intensity={25} />

      <TorusKnot />
      <OrbitRing radius={2.3} tilt={Math.PI / 2.5} speed={0.2}   color="#fb7185" opacity={0.22} />
      <OrbitRing radius={2.9} tilt={Math.PI / 5}   speed={-0.13} color="#c4b5fd" opacity={0.16} />
      <OrbitRing radius={1.8} tilt={Math.PI / 1.4} speed={0.3}   color="#fce7ef" opacity={0.18} />
      <Sparkles />
    </Canvas>
  )
}
