import { useRef } from 'react'

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

export default WorldFrame
