import styled from "styled-components"

const OrangeBorderBox = ({ children, className }) => {
  return (
    <Box className={className}>
      {children}
    </Box>
  )
}

const Box = styled.div`
  border-radius: 10px;
  border: 1px solid #ff9800;
`

export default OrangeBorderBox