import { useState } from "react";
import styled from "styled-components";
import OrangeBorderTextField from "../../../components/OrangeBorderTextField";
import OrangeFilledButton from "../../../components/OrangeFilledButton";
import useLogin from "../../../services/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, errorMessage, login } = useLogin();

  const loginSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <LoginBox onSubmit={loginSubmit}>
      <ErrorBox>
        {error ? <p style={{ fontSize: "14px", color: "red" }}>{errorMessage}</p> : null}
      </ErrorBox>
      <OrangeBorderTextField label="아이디" type="email" onChange={(e) => setEmail(e.target.value)} style={{ width: 350, margin: "0px 0px 15px 0px" }} />
      <OrangeBorderTextField label="비밀번호" type="password" onChange={(e) => setPassword(e.target.value)} style={{ width: 350, margin: "15px 0px 30px 0px" }} />
      <OrangeFilledButton style={{ width: 350, marginBottom: 30 }} type="submit">로그인</OrangeFilledButton>
    </LoginBox >
  )
}

const LoginBox = styled.form`
  marign: 20px;
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 30px;
    width: 450px;
  }

  @media (max-width: 480px) {
    margin: 20px;
    width: 320px;
  }
`

const ErrorBox = styled.div`
  height: 50px;
  width: 350px;
`

export default LoginForm;