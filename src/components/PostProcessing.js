import { EffectComposer } from '@react-three/postprocessing'

const PostProcessing = ({ enabled = false }) => {
  if (!enabled) return null
  return (
    <EffectComposer>
    </EffectComposer>
  )
}

export default PostProcessing
