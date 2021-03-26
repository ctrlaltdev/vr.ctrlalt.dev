import * as THREE from "three"
import React, { Suspense, useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { VRCanvas, Interactive, Hands, DefaultXRControllers } from '@react-three/xr'
import { Html, Text, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import './App.css'

const Box = ({ color, size, scale, children, ...rest }) => {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

const Title = ({ position }) => {
  const fontURL = "https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrcVIT9d0c8.woff"
  return (
    <Text position={ position } fontSize={4} font={ fontURL } letterSpacing={0.125} color="#ffffff" anchorX="center" anchorY="middle">
      YORICK DEMICHELIS
    </Text>
  )
}

const WireSquare = ({ dimensions, color, size, ...rest }) => {
  const X = 0
  const Y = 0
  const Z = 0
  const R = size / 2
  return (
    <group {...rest}>
      <mesh position={[X + R, Y, Z + R]}>
          <cylinderGeometry args={dimensions} />
          <meshBasicMaterial color={ color } />
      </mesh>
      <mesh position={[X - R, Y, Z + R]}>
          <cylinderGeometry args={dimensions} />
          <meshBasicMaterial color={ color } />
      </mesh>
      <mesh position={[X + R, Y, Z - R]}>
          <cylinderGeometry args={dimensions} />
          <meshBasicMaterial color={ color } />
      </mesh>
      <mesh position={[X - R, Y, Z - R]}>
          <cylinderGeometry args={dimensions} />
          <meshBasicMaterial color={ color } />
      </mesh>
    </group>
  )
}

const WireCube = ({ index = 0, color, size, scale = [1, 1, 1], thickness, ...rest }) => {
  const cube = useRef()

  const adjustedSize = size - (index * 2)
  const edgeDimensions = [ thickness, thickness, adjustedSize, 24 ]

  useFrame(() => {
    if (index % 3 === 0) cube.current.rotation.x += 0.0005
    if (index % 3 === 1) cube.current.rotation.y += 0.0005
    if (index % 3 === 2) cube.current.rotation.z += 0.0005
  })

  return (
    <>
      <group ref={ cube } scale={scale} rotation-x={ Math.PI / (Math.random() + 1) } rotation-y={ Math.PI / (Math.random() + 1) } rotation-z={ Math.PI / (Math.random() + 1) }  {...rest}>
        <WireSquare dimensions={ edgeDimensions } color={ color } size={ adjustedSize } />
        <WireSquare dimensions={ edgeDimensions } color={ color } size={ adjustedSize } rotation-x={ Math.PI / 2 } />
        <WireSquare dimensions={ edgeDimensions } color={ color } size={ adjustedSize } rotation-z={ Math.PI / 2 } />
      </group>
    </>
  )
}

const WorldFrame = ({ size = 80, thickness = 2, ...rest }) => {
  const colors = [0x4D4D00, 0x4D004D, 0x004D4D]
  const cubes = colors.map((c, i) => <WireCube key={c} index={i} color={c} size={size} thickness={thickness} {...rest} />)
  return cubes
}

const Scene = () => {
  return (
    <>
      {/* <Stars saturation={1} fade /> */}

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 30, 20]} />

      <WorldFrame size={ 80 } thickness={ 0.25 } />

      <Title position={[0, 1.5, -20]} />

      <DefaultXRControllers />
      <Hands />
    </>
  )
}

const PostProcessings = ({ enabled = false }) => {
  if (!enabled) return null
  return (
    <EffectComposer>
      {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} height={500} /> */}
    </EffectComposer>
  )
}

const App = () => {
  return (
    <div className='Home'>
      <VRCanvas>
        <color attach="background" args={["#1A1A1A"]} />
        {/* <fog color="#161616" attach="fog" near={1} far={15} /> */}

        <Suspense fallback={<Html center>Loading.</Html>}>
          <Scene />
        </Suspense>

        <PostProcessings />
      </VRCanvas>
    </div>
  )
}

export default App
