import { useState } from "react";
import styled from "styled-components";
import OrangeBorderTextField from "../../../components/OrangeBorderTextField";
import OrangeFilledButton from "../../../components/OrangeFilledButton";
import useLogin from "../../../services/useLogin";
import { Link } from "react-router-dom";

const MobileLoginForm = () => {
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
      <OrangeBorderTextField label="아이디" type="email" onChange={(e) => setEmail(e.target.value)} style={{ width: 300, margin: "0px 0px 15px 0px" }} />
      <OrangeBorderTextField label="비밀번호" type="password" onChange={(e) => setPassword(e.target.value)} style={{ width: 300, margin: "15px 0px 30px 0px" }} />
      <SignUpLink to="/signup">회원가입</SignUpLink>
      <OrangeFilledButton style={{ width: 300, marginBottom: 30 }} type="submit">로그인</OrangeFilledButton>
    </LoginBox >
  )
}

const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const ErrorBox = styled.div`
  height: 50px;
  width: 350px;
  margin-left: 50px;
`

const SignUpLink = styled(Link)`
  margin-bottom: 20px;
  font-size: 14px;
  color: #7e7e7e; /* 회색 텍스트 */
  text-decoration: none; /* 밑줄 제거 */
  
  &:hover {
    color: #4a4a4a; /* 호버 시 약간 더 진한 색 */
  }
`;

export default MobileLoginForm;