import { VRButton } from '../utils/VRButton'
import { Canvas } from '@react-three/fiber'
import { XR, InteractionManager } from '@react-three/xr'

const XRCanvas = ({ children, ...rest }) => {
  return (
    <Canvas vr {...rest}>
      <XR>
        <InteractionManager>{children}</InteractionManager>
      </XR>
    </Canvas>
  )
}

const VRCanvas = ({ children, ...rest }) => {
  return (
    <XRCanvas onCreated={({ gl }) => document.body.appendChild(VRButton.createButton(gl))} {...rest}>
      {children}
    </XRCanvas>
  )
}

export default VRCanvas
