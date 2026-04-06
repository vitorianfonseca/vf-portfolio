/* eslint-disable react/no-unknown-property */
"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei"
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import * as THREE from "three"

extend({ MeshLineGeometry, MeshLineMaterial })

interface LanyardProps {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  bandColor?: string
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  bandColor = "#fb7185",
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} bandColor={bandColor} />
          </Physics>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, bandColor = "#fb7185" }) {
  const band  = useRef<any>(null)
  const fixed = useRef<any>(null)
  const j1    = useRef<any>(null)
  const j2    = useRef<any>(null)
  const j3    = useRef<any>(null)
  const card  = useRef<any>(null)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  }

  // Both suspend via Suspense boundary above — all loaded before any JSX runs
  const { nodes, materials } = useGLTF("/card.glb") as any
  const photo = useTexture("/me.png")

  const cardTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext("2d")!

    const W = 1024, H = 1024
    // CX: horizontal center of the card face UV region in canvas space.
    // Adjusted empirically from screenshots — card UV center ≈ 40% of canvas width.
    const CX = Math.round(W * 0.25)  // 256px

    // Background — dark gradient
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, "#2D2A26")
    bg.addColorStop(1, "#1a1714")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Photo — contain, centered on CX
    const ph = photo.image as HTMLImageElement
    if (ph) {
      const srcW = ph.naturalWidth
      const srcH = ph.naturalHeight
      // constrain photo width to ~80% of canvas so there are margins on both sides
      const maxPhotoW = W * 0.80
      const scale = Math.min(maxPhotoW / srcW, (H * 0.72) / srcH)
      const drawW = srcW * scale
      const drawH = srcH * scale
      const drawX = CX - drawW / 2
      const drawY = 0
      ctx.drawImage(ph, 0, 0, srcW, srcH, drawX, drawY, drawW, drawH)
    }

    // Gradient fade: photo bottom into card background
    const fade = ctx.createLinearGradient(0, H * 0.52, 0, H * 0.74)
    fade.addColorStop(0, "rgba(26,23,20,0)")
    fade.addColorStop(1, "rgba(26,23,20,1)")
    ctx.fillStyle = fade
    ctx.fillRect(0, H * 0.52, W, H * 0.22)

    // Accent line top
    ctx.fillStyle = "#fb7185"
    ctx.fillRect(0, 0, W * 0.80, 18)

    // Role
    ctx.fillStyle = "#fb7185"
    ctx.font = "400 38px 'Courier New', monospace"
    ctx.textAlign = "center"
    ctx.fillText("frontend developer", CX, H * 0.82)

    // Divider
    ctx.strokeStyle = "rgba(251,113,133,0.3)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(CX - W * 0.20, H * 0.87)
    ctx.lineTo(CX + W * 0.20, H * 0.87)
    ctx.stroke()

    // Location
    ctx.fillStyle = "rgba(253,248,245,0.38)"
    ctx.font = "30px 'Courier New', monospace"
    ctx.textAlign = "center"
    ctx.fillText("Leiria, PT", CX, H * 0.93)

    const tex = new THREE.CanvasTexture(canvas)
    tex.flipY = false
    tex.needsUpdate = true
    return tex
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo.image])

  const bandTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 1024
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = bandColor
    ctx.fillRect(0, 0, 256, 1024)
    ctx.fillStyle = "rgba(255,255,255,0.55)"
    ctx.font = "bold 52px sans-serif"
    ctx.textAlign = "center"
    ;[180, 512, 844].forEach(y => ctx.fillText("VF", 128, y))
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.needsUpdate = true
    return tex
  }, [bandColor])

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab"
      return () => void (document.body.style.cursor = "auto")
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(r => r.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      })
    }
    if (fixed.current) {
      ;[j1, j2].forEach(ref => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = "chordal"

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false) }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} material-color="white" />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} material-color="white" />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error meshline */}
        <meshLineGeometry />
        {/* @ts-expect-error meshline */}
        <meshLineMaterial
          map={bandTexture}
          useMap={1}
          color="white"
          depthTest={true}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={1.5}
        />
      </mesh>
    </>
  )
}
