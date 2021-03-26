import { Billboard, Text } from '@react-three/drei'
const fontURL = "https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrcVIT9d0c8.woff"

const Title = ({ position }) => {
  return (
    <Billboard position={ position } material-transparent material-opacity={0}>
      <Text fontSize={4} font={ fontURL } letterSpacing={0.125} color="#ffffff" anchorX="center" anchorY="middle">
        YORICK DEMICHELIS
      </Text>
    </Billboard>
  )
}

export default Title
