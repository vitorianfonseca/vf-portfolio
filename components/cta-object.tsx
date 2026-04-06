"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* ─── Particle flowing along a ring (local XY space) ────── */
function RingParticle({ radius, speed, offset, color, size }: {
  radius: number; speed: number; offset: number; color: string; size: number
}) {
  const dotRef   = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const a = s.clock.elapsedTime * speed + offset
    if (dotRef.current)   dotRef.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0)
    if (trailRef.current) {
      const b = a - 0.4
      trailRef.current.position.set(Math.cos(b) * radius, Math.sin(b) * radius, 0)
    }
  })

  return (
    <>
      <mesh ref={dotRef}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={trailRef}>
        <sphereGeometry args={[size * 0.5, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </>
  )
}

/* ─── Elegant gyroscopic ring ────────────────────────────── */
function ElegantRing({ radius, tube, tiltX, tiltZ, spinSpeed, particleSpeed, color, opacity, particles }: {
  radius: number; tube: number; tiltX: number; tiltZ: number
  spinSpeed: number; particleSpeed: number; color: string; opacity: number; particles: number
}) {
  const gyroRef = useRef<THREE.Group>(null)

  useFrame((s) => {
    if (gyroRef.current) gyroRef.current.rotation.y = s.clock.elapsedTime * spinSpeed
  })

  return (
    <group ref={gyroRef}>
      <group rotation={[tiltX, 0, tiltZ]}>
        <mesh>
          <torusGeometry args={[radius, tube, 16, 160]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={opacity}
          />
        </mesh>
        {Array.from({ length: particles }, (_, i) => (
          <RingParticle
            key={i}
            radius={radius}
            speed={particleSpeed}
            offset={(i / particles) * Math.PI * 2}
            color={color}
            size={0.030}
          />
        ))}
      </group>
    </group>
  )
}

/* ─── Small bright crystal core ─────────────────────────── */
function Core() {
  const ref     = useRef<THREE.Group>(null)
  const g1Ref   = useRef<THREE.Mesh>(null)
  const g2Ref   = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (ref.current)  { ref.current.rotation.y = t * 0.22; ref.current.rotation.x = t * 0.14 }
    if (g1Ref.current) g1Ref.current.scale.setScalar(1 + Math.sin(t * 1.0) * 0.10)
    if (g2Ref.current) g2Ref.current.scale.setScalar(1 + Math.sin(t * 0.6 + 1) * 0.15)
  })

  return (
    <>
      {/* Soft halos */}
      <mesh ref={g2Ref}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.04} />
      </mesh>
      <mesh ref={g1Ref}>
        <sphereGeometry args={[0.36, 16, 16]} />
        <meshBasicMaterial color="#fce7ef" transparent opacity={0.07} />
      </mesh>
      {/* Crystal */}
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial
            color="#fce7ef"
            emissive="#fb7185"
            emissiveIntensity={1.5}
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh scale={1.02}>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.20} />
        </mesh>
      </group>
    </>
  )
}

/* ─── Floating dust ──────────────────────────────────────── */
function Dust() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(160 * 3)
    for (let i = 0; i < 160; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.8 + Math.random() * 2.0
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i*3+2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.04
    ref.current.rotation.x = s.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fce7ef" size={0.018} transparent opacity={0.40} sizeAttenuation />
    </points>
  )
}

/* ─── Canvas export ──────────────────────────────────────── */
export function CtaObject() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.5], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4,  4,  3]}  color="#ffffff"  intensity={60} />
      <pointLight position={[-3, -2,  2]} color="#fb7185"  intensity={50} />
      <pointLight position={[0,  -4,  3]} color="#fce7ef"  intensity={20} />
      <pointLight position={[2,   3, -2]} color="#c4b5fd"  intensity={28} />

      <Core />

      {/* Three rings at angles that avoid the flat "Saturn" look */}
      <ElegantRing
        radius={1.15} tube={0.011}
        tiltX={Math.PI / 2.8} tiltZ={0.5}
        spinSpeed={0.18}  particleSpeed={0.9}  particles={3}
        color="#fb7185" opacity={0.65}
      />
      <ElegantRing
        radius={1.35} tube={0.009}
        tiltX={Math.PI / 2.0} tiltZ={-1.1}
        spinSpeed={-0.13} particleSpeed={-0.7} particles={2}
        color="#c4b5fd" opacity={0.50}
      />
      <ElegantRing
        radius={0.95} tube={0.008}
        tiltX={Math.PI / 3.5} tiltZ={1.8}
        spinSpeed={0.24}  particleSpeed={1.1}  particles={2}
        color="#fce7ef" opacity={0.42}
      />

      <Dust />
    </Canvas>
  )
}
