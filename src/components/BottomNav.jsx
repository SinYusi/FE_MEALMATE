import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [value, setValue] = useState(2);
  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/board');
    if (newValue === 1) navigate('/wish');
    if (newValue === 2) navigate('/');
    if (newValue === 3) navigate('/message');
    if (newValue === 4) navigate('/mypage');
  }

  return (
    <StyledBottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
    >
      <StyledBottomNavigationAction label="게시판" icon={<DashboardIcon />} />
      <StyledBottomNavigationAction label="좋아요" icon={<FavoriteIcon />} />
      <StyledBottomNavigationAction label="홈" icon={<HomeIcon />} />
      <StyledBottomNavigationAction label="쪽지" icon={<EmailIcon />} />
      <StyledBottomNavigationAction label="마이페이지" icon={<AccountBoxIcon />} />
    </StyledBottomNavigation>
  );
};

const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000; /* 다른 요소 위에 표시 */
  background-color: #ffffff; /* 배경색 설정 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 상단 그림자 추가 */
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  & .MuiBottomNavigationAction-label {
    white-space: nowrap; /* 줄바꿈 방지 */
    overflow: hidden; /* 내용이 길어지면 잘리도록 설정 */
    text-overflow: ellipsis; /* 말줄임표 추가 */
    transition: color 0.3s ease;

    &.Mui-selected {
      font-weight: bold; /* 선택된 상태에서 텍스트를 강조 */
      color: #ff9800; /* 선택된 라벨 색상 설정 */
    }
  }

  &.Mui-selected {
    color: #ff9800; /* 선택된 상태의 아이콘 및 텍스트 색상 */
    
    & .MuiSvgIcon-root {
      color: #ff9800; /* 선택된 아이콘 색상 */
    }
  }

  & .MuiSvgIcon-root {
    transition: color 0.3s ease;
    color: #757575; /* 기본 아이콘 색상 */
  }
`;

export default BottomNav;