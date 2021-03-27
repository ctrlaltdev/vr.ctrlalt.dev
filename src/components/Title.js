import { Billboard, Text } from '@react-three/drei'
const fontURL = "https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrcVIT9d0c8.woff"

const Title = ({ position = [0, 0, 0], size = 1, ...rest }) => {
  return (
    <Billboard position={ position } material-transparent material-opacity={0}>
      <Text fontSize={ size } font={ fontURL } anchorX="center" anchorY="middle" { ...rest }>
        YORICK DEMICHELIS
      </Text>
    </Billboard>
  )
}

export default Title
