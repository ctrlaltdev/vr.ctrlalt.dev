import React, { Suspense } from 'react'

import VRCanvas from './components/CustomXRCanvas'
import { Hands, DefaultXRControllers, useXR } from '@react-three/xr'
import { Stars, Loader } from '@react-three/drei'

import Light from './components/Light'
import WorldFrame from './components/WorldFrame'
import Title from './components/Title'
import Skills from './components/Skills'

import PostProcessing from './components/PostProcessing'

import './World.css'

const Scene = () => {
  const { isPresenting } = useXR()

  return (
    <>
      { isPresenting ? 
        <Suspense fallback={null}>
          <WorldFrame size={ 80 } thickness={ 0.25 } />

          <Title position={[0, 6, -20]} size={3} letterSpacing={ 0.125 } color="#ffffff" />

          <Skills position={[ 0, 1, -5 ]} />
        </Suspense>
        :
        <Stars saturation={1} fade />
      }
    </>
  )
}

const World = () => {
  return (
    <div className='Home'>
      <VRCanvas>
        <color attach="background" args={["#1A1A1A"]} />
        {/* <fog color="#161616" attach="fog" near={1} far={15} /> */}

        <Light />

        <Scene />

        <DefaultXRControllers />
        <Hands />

        <PostProcessing />
      </VRCanvas>
      <Loader />
    </div>
  )
}

export default World
