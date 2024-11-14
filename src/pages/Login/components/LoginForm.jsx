import { useState } from "react";
import styled from "styled-components";
import OrangeBorderTextField from "../../../components/OrangeBorderTextField";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginBox>
      <OrangeBorderTextField label="아이디"/>
    </LoginBox>
  )
}

const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  aligin-items: center;
  justify-content: center;
  background-color: white;
  width: 800px;
`

export default LoginForm;