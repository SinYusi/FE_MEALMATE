import styled from "styled-components";
import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <LogoContainer>
      <h2>Meal</h2>
      <img src={logo} alt="로고" />
      <h2>Mate</h2>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export default Logo;