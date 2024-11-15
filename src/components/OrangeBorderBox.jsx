import styled from "styled-components"

const OrangeBorderBox = ({ children }) => {
  return (
    <Box>
      {children}
    </Box>
  )
}

const Box = styled.div`
  border-radius: 10px;
  border-color: #ff9800;
`

export default OrangeBorderBox