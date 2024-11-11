import styled from "styled-components"
import OrangeBorderTextField from "./OrangeBorderTextField";
import logo from "../assets/logo.png"
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  return (
    <NavbarContainer>
      <OrangeBorderTextField onChange={e => setQuery(e.target.value)} style={{ heigth: 80, width: 80 }}></OrangeBorderTextField>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
  postion: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  color: white;
  height: 60px;
  z-index: 1000;
`

export default Navbar;