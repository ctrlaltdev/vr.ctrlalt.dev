import { Text } from '@react-three/drei'

const fontURL = "https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrcVIT9d0c8.woff"

const list = [
  { n: 'Golang', c: '#7FD5EA', k: 'go' },
  { n: 'JavaScript', c: '#F0DB4F', k: 'js' },
  { n: 'Python', c: '#4B8BBE', k: 'py' },
  // { n: 'PHP', c: '#8892BE', k: 'php' },
  { n: 'SH', c: '#4EAA25', k: 'sh' },
  { n: 'React', c: '#61DBFB', k: 'react' },
  { n: 'GraphQL', c: '#E535AB', k: 'gql' },
  { n: 'Docker', c: '#0DB7ED', k: 'docker' },
  { n: 'K8s', c: '#3371E3', k: 'k8s' },
  { n: 'AWS', c: '#FF9900', k: 'aws' },
  { n: 'Terraform', c: '#623CE4', k: 'tf' }
]

const Skill = ({ element, size, position }) => {
  return (
    <mesh position={ position }>
      <boxBufferGeometry args={ [size, size, size] } />
      <meshPhongMaterial color={element.c} />
      <Text position={[ 0, -0.4, 0.55 ]} fontSize={ 0.18 } font={ fontURL } anchorX="center" anchorY="bottom" color="#000000" opacity={0.5} transparent>
        { element.n }
      </Text>
    </mesh>
  )
}

const List = ({ size, position, ratio = 1.5, ...rest }) => {
  const half = list.length / 2

  const elements = list.map((e, i) => {
    const pos = [ ...position ]
    pos[0] = 0 - (half * ratio) + (i * size * ratio) + size / 2

    return (
      <Skill key={ e.k } element={ e } position={ pos } size={ size } { ...rest } />
    )
  })

  return (
    <group>
      { elements }
    </group>
  )
}

const Skills = (props) => {
  return (
    <>
      <List size={1} { ...props } />
    </>
  )
}

export default Skills
