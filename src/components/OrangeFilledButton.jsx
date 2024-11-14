import { Button } from "@mui/material"
import styled from "styled-components"

const OrangeFilledButton = ({ children, ...props }) => {
  return (
    <FilledButton variant="contained" {...props}>{children}</FilledButton>
  )
}

const FilledButton = styled(Button)`
  && {
    margin-left: 20px;
    min-width: 80px;
    white-space: nowrap;
    background-color: #ff9800;
    @media (max-width: 576px) {
      font-size: 12px;
      min-width: 60px;
    }
    &:focus {
      outline: none;
    }
  }
`

export default OrangeFilledButton