import styled from "styled-components";
import logo from "../assets/logo.png"

const Logo = ({ ...props }) => {
  return (
    <LogoContainer {...props}>
      <h2 style={{ fontSize: "200%" }}>MEAL</h2>
      <img src={logo} alt="로고" style={{ width: "100%", height: "100%" }} />
      <h2 style={{ fontSize: "200%" }}>MATE</h2>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export default Logo;