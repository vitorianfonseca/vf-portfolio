// @ts-nocheck
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"

export function MacBookScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const videoEl = document.createElement("video")
    const screenSize: [number, number] = [29.4, 20]

    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      orbit: OrbitControls
    let darkPlasticMaterial: THREE.MeshStandardMaterial,
      cameraMaterial: THREE.MeshBasicMaterial,
      baseMetalMaterial: THREE.MeshStandardMaterial,
      logoMaterial: THREE.MeshBasicMaterial,
      screenMaterial: THREE.MeshBasicMaterial,
      keyboardMaterial: THREE.MeshBasicMaterial
    let macGroup: THREE.Group,
      lidGroup: THREE.Group,
      bottomGroup: THREE.Group,
      screenMesh: THREE.Mesh,
      lightHolder: THREE.Group,
      screenLight: any
    let screenImageTexture: THREE.Texture

    function initScene() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(40, canvasEl.clientWidth / canvasEl.clientHeight, 10, 1000)
      camera.position.z = 75

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasEl })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
      scene.add(ambientLight)

      lightHolder = new THREE.Group()
      scene.add(lightHolder)
      const light = new THREE.PointLight(0xfff5e1, 0.8)
      light.position.set(0, 5, 50)
      lightHolder.add(light)

      orbit = new OrbitControls(camera, renderer.domElement)
      orbit.minDistance = 45
      orbit.maxDistance = 120
      orbit.enablePan = false
      orbit.enableDamping = true

      macGroup = new THREE.Group()
      macGroup.position.z = -10
      scene.add(macGroup)
      lidGroup = new THREE.Group()
      macGroup.add(lidGroup)
      bottomGroup = new THREE.Group()
      macGroup.add(bottomGroup)
    }

    function updateSceneSize() {
      const w = canvasEl.clientWidth
      const h = canvasEl.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    function createMaterials() {
      const textLoader = new THREE.TextureLoader()
      screenImageTexture = textLoader.load("https://ksenia-k.com/img/threejs/macbook-screen-texture.png", (tex) => {
        tex.flipY = false
        tex.wrapS = THREE.RepeatWrapping
        tex.repeat.y = (tex.image.width / tex.image.height / screenSize[0]) * screenSize[1]
      })

      screenMaterial = new THREE.MeshBasicMaterial({ map: screenImageTexture, transparent: true, opacity: 0, side: THREE.BackSide })
      const keyboardTexture = textLoader.load("https://ksenia-k.com/img/threejs/keyboard-overlay.png")
      keyboardMaterial = new THREE.MeshBasicMaterial({ alphaMap: keyboardTexture, transparent: true })

      darkPlasticMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9, metalness: 0.9 })
      cameraMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 })
      baseMetalMaterial = new THREE.MeshStandardMaterial({ color: 0xcecfd3 })
      logoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    }

    function render() {
      orbit.update()
      lightHolder.quaternion.copy(camera.quaternion)
      renderer.render(scene, camera)
      animFrameId = requestAnimationFrame(render)
    }

    function parseModel(glb: any) {
      ;[...glb.scene.children].forEach((child: any) => {
        if (child.name === "_top") {
          lidGroup.add(child)
          ;[...child.children].forEach((mesh: any) => {
            if (mesh.name === "lid") mesh.material = baseMetalMaterial
            else if (mesh.name === "logo") mesh.material = logoMaterial
            else if (mesh.name === "screen-frame") mesh.material = darkPlasticMaterial
            else if (mesh.name === "camera") mesh.material = cameraMaterial
          })
        } else if (child.name === "_bottom") {
          bottomGroup.add(child)
          ;[...child.children].forEach((mesh: any) => {
            if (["base"].includes(mesh.name)) mesh.material = baseMetalMaterial
            else if (["legs", "keyboard", "inner"].includes(mesh.name)) mesh.material = darkPlasticMaterial
          })
        }
      })
    }

    function addScreen() {
      screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(screenSize[0], screenSize[1]), screenMaterial)
      screenMesh.position.set(0, 10.5, -0.11)
      screenMesh.rotation.set(Math.PI, 0, 0)
      lidGroup.add(screenMesh)

      screenLight = new (THREE as any).RectAreaLight(0xffffff, 0, screenSize[0], screenSize[1])
      screenLight.position.set(0, 10.5, 0)
      screenLight.rotation.set(Math.PI, 0, 0)
      lidGroup.add(screenLight)

      const darkScreen = screenMesh.clone()
      darkScreen.position.set(0, 10.5, -0.111)
      darkScreen.rotation.set(Math.PI, Math.PI, 0)
      darkScreen.material = darkPlasticMaterial
      lidGroup.add(darkScreen)
    }

    function addKeyboard() {
      const keyboardKeys = new THREE.Mesh(new THREE.PlaneGeometry(27.7, 11.6), keyboardMaterial)
      keyboardKeys.rotation.set(-0.5 * Math.PI, 0, 0)
      keyboardKeys.position.set(0, 0.045, 7.21)
      bottomGroup.add(keyboardKeys)
    }

    function createTimelines() {
      const floatingTl = gsap.timeline({ repeat: -1 })
        .to([lidGroup.position, bottomGroup.position], { duration: 1.5, y: "+=1", ease: "power1.inOut" }, 0)
        .to([lidGroup.position, bottomGroup.position], { duration: 1.5, y: "-=1", ease: "power1.inOut" })
        .timeScale(0)

      const screenOnTl = gsap.timeline({ paused: true })
        .to(screenMaterial, { duration: 0.1, opacity: 0.96 }, 0)
        .to(screenLight, { duration: 0.1, intensity: 1.5 }, 0)

      const laptopOpeningTl = gsap.timeline({ paused: true })
        .from(lidGroup.position, { duration: 0.75, z: "+=.5" }, 0)
        .fromTo(lidGroup.rotation, { duration: 1, x: 0.5 * Math.PI }, { x: -0.2 * Math.PI }, 0)
        .to(screenOnTl, { duration: 0.06, progress: 1 }, 0.05)

      const textureScrollTl = gsap.timeline({ paused: true })
        .to(screenImageTexture.offset, { duration: 2, y: 0.4, ease: "power1.inOut" })

      const laptopAppearTl = gsap.timeline({ paused: true })
        .fromTo(macGroup.rotation, { x: 0.5 * Math.PI, y: 0.2 * Math.PI }, { duration: 2, x: 0.05 * Math.PI, y: -0.1 * Math.PI }, 0)
        .fromTo(macGroup.position, { y: -50 }, { duration: 1, y: -8 }, 0)

      gsap.timeline({ defaults: { ease: "none" } })
        .to(laptopAppearTl, { duration: 1.5, progress: 1 }, 0)
        .to(laptopOpeningTl, { duration: 1, progress: 0.34 }, 0.5)
        .to(textureScrollTl, { duration: 1.5, progress: 1 }, 1.5)
        .to(textureScrollTl, { duration: 1, progress: 0 })
        .to(floatingTl, { duration: 1, timeScale: 1 }, 1)
    }

    let animFrameId: number

    initScene()
    createMaterials()

    const modelLoader = new GLTFLoader()
    modelLoader.load("https://ksenia-k.com/models/mac-noUv.glb", (glb) => {
      parseModel(glb)
      addScreen()
      addKeyboard()
      createTimelines()
      render()
      updateSceneSize()
    })

    window.addEventListener("resize", updateSceneSize)

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", updateSceneSize)
      renderer?.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
