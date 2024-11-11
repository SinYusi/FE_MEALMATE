import { TextField } from "@mui/material";
import styled from "styled-components";

const OrangeBorderTextField = ({ ...props }) => {
  return (
    <StyledTextField {...props} />
  )
}

const StyledTextField = styled(TextField)`
  &&{
    margin: 10px 0px;
  }

  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #ff9800;
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #ff9800;
  }
`;

export default OrangeBorderTextField;