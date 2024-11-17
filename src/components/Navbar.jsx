import styled from "styled-components";
import OrangeBorderTextField from "./OrangeBorderTextField";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Button, IconButton, InputAdornment, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import OrangeBorderButton from "./OrangeBorderButton";
import OrangeFilledButton from "./OrangeFilledButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const logoutHandle = async (e) => {
    dispatch(logout());
    navigate('/');
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
      <p style={{ cursor: "pointer", color: "black", margin: "0px 15px" }} onClick={() => navigate('/board')}>게시글</p>
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
      <OrangeBorderButton onClick={() => isAuthenticated ? logoutHandle() : navigate("/login")} style={{ marginLeft: "15px" }}>{isAuthenticated ? "로그아웃" : "로그인"}</OrangeBorderButton>
      {isAuthenticated ? null : <OrangeFilledButton onClick={() => navigate("/signin")} style={{ marginLeft: "25px" }}>가입하기</OrangeFilledButton>}
      {isAuthenticated ? <UserMenu /> : null}
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

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (url = null) => {
    setAnchorEl(null);
    if (url) {
      navigate(url);
    }
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ margin: "0px 10px" }}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'asic-button',
        }}
      >
        <MenuItem onClick={() => handleClose("/mypage")}>마이페이지</MenuItem>
        <MenuItem onClick={() => handleClose("/wish")}>내 찜</MenuItem>
        <MenuItem onClick={() => handleClose("/message")}>내 쪽지</MenuItem>
      </Menu>
    </>
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