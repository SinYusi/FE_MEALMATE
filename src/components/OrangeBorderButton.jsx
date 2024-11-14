import { Button } from "@mui/material";
import styled from "styled-components";

const OrangeBorderButton = ({ children, ...props }) => {
  return (
    <Btn variant="outlined" {...props}>{children}</Btn>
  )
}

const Btn = styled(Button)`
  && {
    margin-left: 20px;
    min-width: 80px;
    white-space: nowrap;
    color: #ff9800;
    border-color: #ff9800;
    @media (max-width: 576px) {
      font-size: 12px;
      min-width: 60px;
    }
    &:focus {
      outline: none;
    }
  }
`

export default OrangeBorderButton;