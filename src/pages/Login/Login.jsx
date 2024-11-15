import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import Logo from "../../components/Logo";

const Login = () => {
  return (
    <LoginPage>
      <Logo style={{ margin: "60px 0px 30px 0px", width: 300 }} />
      <LoginForm />
    </LoginPage>
  )
}

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  background-color: #f1f3f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export default Login;