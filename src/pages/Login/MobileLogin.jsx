import styled from "styled-components";
import Logo from "../../components/Logo";
import MobileLoginForm from "./components/MobileLoginForm";

const MobileLogin = () => {
  return (
    <LoginPage>
      <Logo style={{ margin: "150px 0px 30px 0px", width: 300 }} />
      <MobileLoginForm />
    </LoginPage>
  );
};

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f3f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default MobileLogin;