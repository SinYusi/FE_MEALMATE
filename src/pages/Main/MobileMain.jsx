import styled from "styled-components";
import MobileMainPageRecommend from "./components/MobileMainPageRecommend";
import MobileMainPagePost from "./components/MobileMainPagePost";
import MobilePopularRestaurant from "./components/MobilePopularRestaurant";
import Logo from "../../components/Logo";
import MobileCategoryRestaurant from "./components/MobileCategoryRestaurant";
import OrangeBorderTextField from "../../components/OrangeBorderTextField";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileMain = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <MainPageContainer>
      <Logo style={{ margin: 20 }} />
      <OrangeBorderTextField
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{margin: "10px 0px", width: "90%"}}
        InputProps={{
          endAdornment: (
            <SearchAdornment handleSearch={handleSearch} />
          ),
          style: { paddingRight: 0 },
        }}
      />
      <MobileMainPageRecommend />
      <MobileMainPagePost />
      <MobilePopularRestaurant />
      <MobileCategoryRestaurant />
    </MainPageContainer>
  )
}

const SearchAdornment = ({ handleSearch }) => {
  return (
    <InputAdornment position="end" style={{ paddingRight: 10 }}>
      <IconButton onClick={handleSearch} style={{ outline: "none", "&:focus": { outline: "none" }, padding: 0 }}>
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  )
}

const MainPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`

export default MobileMain;