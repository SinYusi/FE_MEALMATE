import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import Logo from "../../components/Logo";

const Login = () => {
  return (
    <LoginPage>
      <Logo style={{ margin: 20 }} />
      <LoginForm />
    </LoginPage>
  )
}

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  background-color: #f1f3f5;
  width: 100%;
`

export default Login;