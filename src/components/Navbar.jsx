import styled from "styled-components";
import OrangeBorderTextField from "./OrangeBorderTextField";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Button, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import OrangeBorderButton from "./OrangeBorderButton";
import OrangeFilledButton from "./OrangeFilledButton";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleSearch = () => {
    navigate(`/search/${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  return (
    <NavbarContainer>
      <img src={logo} alt="로고" style={{ width: 50, height: 50, cursor: "pointer", margin: 15 }} onClick={() => navigate('/')} />
      <p style={{ cursor: "pointer", color: "black", margin: "0px 15px" }}>게시글</p>
      <OrangeBorderTextField
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{ style: { height: 20, padding: "10px 5px" } }}
        style={{ width: windowWidth > 1200 ? "600px" : "400px", paddingRight: 0, margin: 15 }}
        InputProps={{
          endAdornment: (
            <SearchAdornment handleSearch={handleSearch} />
          ),
          style: { paddingRight: 0 },
        }}
      />
      <OrangeBorderButton onClick={() => navigate("/login")}>로그인</OrangeBorderButton>
      <OrangeFilledButton onClick={() => navigate("/signin")}>가입하기</OrangeFilledButton>
    </NavbarContainer>
  );
};

const SearchAdornment = ({ handleSearch }) => {
  return (
    <InputAdornment position="end" style={{ paddingRight: 10 }}>
      <IconButton onClick={handleSearch} style={{ outline: "none", "&:focus": { outline: "none" }, padding: 0 }}>
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  )
}

const NavbarContainer = styled.div`
  position: fixed;
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
`;

export default Navbar;