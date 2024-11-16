import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const BottomNav = () => {
  const [value, setValue] = useState(2);

  return (
    <BottomNavContainer>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="게시판" icon={<DashboardIcon />} />
        <BottomNavigationAction label="좋아요" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction label="쪽지" icon={<EmailIcon />} />
        <StyledBottomNavigationAction style={{ fontSize: "10px" }} label="마이페이지" icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </BottomNavContainer>
  )
}

const BottomNavContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  &.Mui-selected {
    color: #ff9800; /* 선택된 상태의 색상 설정 */
  }

  & .MuiBottomNavigationAction-label {
    white-space: nowrap; /* 줄바꿈 방지 */
    overflow: hidden; /* 내용이 길어지면 잘리도록 설정 */
    text-overflow: ellipsis; /* 말줄임표 추가 */

    &.Mui-selected {
      font-weight: bold; /* 선택된 상태에서 텍스트를 강조 */
      color: #ff9800; /* 선택된 라벨 색상 설정 */
    }
  }
`;

export default BottomNav;