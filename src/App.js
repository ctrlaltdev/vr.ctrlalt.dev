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

const Button = (props) => {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState(0x000000)

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <Box color={color} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} size={[0.4, 0.1, 0.1]} {...props}>
        <Text position={[0, 0, 0.05]} fontSize={0.05} color="#ffffff" anchorX="center" anchorY="middle">
          CTRL ALT DEV
        </Text>
      </Box>
    </Interactive>
  )
}

const Cube = ({ index = 0, color, size, scale = [1, 1, 1], thickness, ...rest }) => {
  const cube = useRef()
  const geometry = new THREE.BoxGeometry(size, size, size)

  useFrame(() => {
    if (index % 3 === 0) cube.current.rotation.x += 0.0005
    if (index % 3 === 1) cube.current.rotation.y += 0.0005
    if (index % 3 === 2) cube.current.rotation.z += 0.0005
  })

  return (
    <>
      <mesh ref={ cube } scale={scale} {...rest}>
        <lineSegments>
          <edgesGeometry attach="geometry" args={[ geometry ]} />
          <lineBasicMaterial attach="material" color={ color } linewidth={ thickness } transparent opacity={1} depthTest={false} side={ THREE.BackSide } />
        </lineSegments>
      </mesh>
    </>
  )
}

const WorldFrame = ({ size = 80, thickness = 2 }) => {
  const colors = [0xffff00, 0xff00ff, 0x00ffff]
  const cubes = colors.map((c, i) => <Cube key={c} index={i} color={c} size={size} thickness={thickness} />)
  return cubes
}

const Scene = () => {
  return (
    <>
      <Stars saturation={1} fade />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 30, 20]} />

      <WorldFrame size={ 40 } thickness={ 10 } />
      <Button position={[0, 2, -1]} />

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
        <color attach="background" args={["#050505"]} />
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
