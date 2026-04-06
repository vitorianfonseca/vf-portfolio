"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 80 }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.4 + Math.random() * 1.2
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
    ref.current.rotation.x = state.clock.elapsedTime * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fb7185" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function CircuitSphere() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { mouse } = useThree()

  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 2), [])
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(icoGeo), [icoGeo])

  const lineMaterial = useMemo(() => new THREE.LineDashedMaterial({
    color: "#fb7185",
    transparent: true,
    opacity: 0.55,
    dashSize: 0.07,
    gapSize: 0.1,
  }), [])

  const nodes = useMemo(() => {
    const pos = icoGeo.attributes.position
    const seen = new Set<string>()
    const result: [number, number, number][] = []
    for (let i = 0; i < pos.count; i++) {
      const x = +pos.getX(i).toFixed(3)
      const y = +pos.getY(i).toFixed(3)
      const z = +pos.getZ(i).toFixed(3)
      const key = `${x},${y},${z}`
      if (!seen.has(key)) { seen.add(key); result.push([x, y, z]) }
    }
    return result
  }, [icoGeo])

  useEffect(() => { linesRef.current?.computeLineDistances() }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.006
    groupRef.current.rotation.x += (mouse.y * 0.22 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z += (mouse.x * 0.09 - groupRef.current.rotation.z) * 0.04
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.2
    lineMaterial.dashOffset -= 0.005
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshStandardMaterial color="#fce7ef" emissive="#5c0018" emissiveIntensity={0.45} metalness={0.55} roughness={0.22} transparent opacity={0.72} />
      </mesh>
      <lineSegments ref={linesRef} geometry={edgesGeo} material={lineMaterial} />
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos} scale={0.042}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={2.5} />
        </mesh>
      ))}
      <mesh scale={1.38}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

export function CrystalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, clearColor: [0, 0, 0, 0] }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[ 4,  4,  3]} color="#fb7185" intensity={12} />
      <pointLight position={[-4, -2,  2]} color="#c4b5fd" intensity={8}  />
      <pointLight position={[ 0, -4,  4]} color="#fce7ef" intensity={5}  />
      <pointLight position={[-2,  5,  1]} color="#fb7185" intensity={7}  />
      <CircuitSphere />
      <Particles />
    </Canvas>
  )
}
