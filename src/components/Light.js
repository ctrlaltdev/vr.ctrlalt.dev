const Light = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 30, 20]} />
    </>
  )
}

export default Light
