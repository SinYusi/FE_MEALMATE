import styled from "styled-components";
import OrangeBorderTextField from "./OrangeBorderTextField";
import logo from "../assets/logo.png";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <NavbarContainer>
      <img src={logo} alt="로고" style={{ width: 50, height: 50, cursor: "pointer" }} onClick={() => navigate('/')} />
      <OrangeBorderTextField
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{ style: { height: 20, padding: "10px 5px" } }}
        style={{ width: 200, paddingRight: 0 }}
        InputProps={{
          endAdornment: (
            <SearchAdornment handleSearch={handleSearch} />
          ),
          style: { paddingRight: 0 },
        }}
      />
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