"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/* ─── Morphing liquid-metal sphere ──────────────────────── */
function MorphSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  const geo = useMemo(() => new THREE.SphereGeometry(1.0, 48, 48), [])
  const orig = useMemo(
    () => Float32Array.from(geo.attributes.position.array),
    [geo]
  )
  const frameCount = useRef(0)

  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color:              new THREE.Color("#f5b8c8"),
      emissive:           new THREE.Color("#fb7185"),
      emissiveIntensity:  0.40,
      roughness:          0.03,
      metalness:          0.12,
      transmission:       0.55,
      thickness:          2.2,
      ior:                2.3,
      clearcoat:          1,
      clearcoatRoughness: 0,
      transparent:        true,
      opacity:            0.96,
    })
    return m
  }, [])

  useFrame((s) => {
    frameCount.current++
    // update morph every other frame to halve CPU cost
    if (frameCount.current % 2 !== 0) return

    const t   = s.clock.elapsedTime
    const pos = geo.attributes.position
    const n   = pos.count
    const px  = pointer.x * 0.5
    const py  = pointer.y * 0.5

    for (let i = 0; i < n; i++) {
      const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2]
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const nx = ox / len, ny = oy / len, nz = oz / len

      const d =
        Math.sin(nx * 3.2 + t * 0.60 + px) * Math.sin(ny * 2.6 + t * 0.45) * 0.16 +
        Math.sin(nz * 4.5 + nx * 2.4 + t * 0.80) * 0.09 +
        Math.sin(ny * 6.0 + nz * 3.0 + t * 0.35 + py) * 0.05

      pos.setXYZ(i, nx * (1.0 + d), ny * (1.0 + d), nz * (1.0 + d))
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color("#c4b5fd"),
    wireframe:   true,
    transparent: true,
    opacity:     0.09,
  }), [])

  return (
    <>
      <mesh ref={meshRef} geometry={geo} material={mat} />
      {/* Wireframe overlay — same morph, the "mesh beneath the art" */}
      <mesh geometry={geo} material={wireMat} scale={1.003} />
    </>
  )
}

/* ─── Geometric cage — structural framework around the blob ─ */
function GeoCage() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.x = t * 0.07
      ref.current.rotation.y = -t * 0.11
      ref.current.rotation.z =  t * 0.05
    }
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.38, 2]} />
      <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

/* ─── Atmospheric halos ──────────────────────────────────── */
function Atmosphere() {
  const h1 = useRef<THREE.Mesh>(null)
  const h2 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (h1.current) h1.current.scale.setScalar(1 + Math.sin(t * 0.60) * 0.04)
    if (h2.current) h2.current.scale.setScalar(1 + Math.sin(t * 0.38 + 1.2) * 0.06)
  })

  return (
    <>
      <mesh ref={h1}>
        <sphereGeometry args={[1.45, 20, 20]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.055} side={THREE.BackSide} />
      </mesh>
      <mesh ref={h2}>
        <sphereGeometry args={[1.80, 20, 20]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.030} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

/* ─── Inner glowing crystal ──────────────────────────────── */
function Core() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const glow  = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (outer.current) { outer.current.rotation.y = t * 0.45; outer.current.rotation.x = t * 0.28 }
    if (inner.current) { inner.current.rotation.z = -t * 0.60; inner.current.rotation.y = t * 0.38 }
    if (glow.current)  glow.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.15)
  })

  return (
    <>
      <mesh ref={glow}>
        <sphereGeometry args={[0.48, 16, 16]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.08} />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshPhysicalMaterial
          color="#fff0f4" emissive="#fb7185" emissiveIntensity={0.8}
          roughness={0} metalness={0} transmission={0.6} thickness={0.5} ior={2.2}
          clearcoat={1} clearcoatRoughness={0} transparent opacity={0.92}
        />
      </mesh>
      <mesh ref={inner}>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={5.0}
          roughness={0} metalness={0} transparent opacity={0.90}
        />
      </mesh>
    </>
  )
}

/* ─── Orbiting sparkle ring ──────────────────────────────── */
function SparkleRing() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(55 * 3)
    for (let i = 0; i < 55; i++) {
      const theta = (i / 55) * Math.PI * 2
      const r     = 1.55 + (Math.random() - 0.5) * 0.50
      const h     = (Math.random() - 0.5) * 1.00
      arr[i * 3]     = Math.cos(theta) * r
      arr[i * 3 + 1] = h
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [])

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.06
      ref.current.rotation.x = s.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fce7ef" size={0.022} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ─── Scene ──────────────────────────────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((s) => {
    if (!groupRef.current) return
    const t = s.clock.elapsedTime
    groupRef.current.rotation.y  = t * 0.045
    groupRef.current.rotation.x += (pointer.y * 0.22 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z += (pointer.x * 0.06 - groupRef.current.rotation.z) * 0.03
    groupRef.current.position.y  = Math.sin(t * 0.40) * 0.08
  })

  return (
    <group ref={groupRef}>
      <Atmosphere />
      <MorphSphere />
      <GeoCage />
      <Core />
      <SparkleRing />
    </group>
  )
}

/* ─── Canvas ─────────────────────────────────────────────── */
export function FloatingGem() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true, antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.2,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <color attach="background" args={["#FDF8F5"]} />
      <ambientLight intensity={0.08} />
      <pointLight position={[ 5,  5,  3]} color="#ffffff"  intensity={200} />
      <pointLight position={[-5,  1, -3]} color="#c4b5fd"  intensity={90}  />
      <pointLight position={[ 0, -5,  3]} color="#fb7185"  intensity={80}  />
      <pointLight position={[ 2,  4, -4]} color="#fce7ef"  intensity={65}  />
      <pointLight position={[-3, -3, -3]} color="#ffffff"  intensity={55}  />
      <Scene />
    </Canvas>
  )
}
