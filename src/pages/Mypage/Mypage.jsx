import { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { orange } from "@mui/material/colors";
import styled from "styled-components";
import useGetMyInformation from "../../services/useGetMyInformation";
import MypageTable from "./components/MyPageTable";
import Logo from "../../components/Logo";
import usePatchMyInformation from "../../services/usePatchMyInformation";

const Mypage = () => {
  const { myInformation, getMyInformation } = useGetMyInformation();
  const categoryName = ['보쌈', '일식', '고기', '피자', '찌개', '양식', '중식', '치킨', '집밥', '버거', '분식', '카페', '아시안'];
  const [userCategory, setUserCategory] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const patchMyInformation = usePatchMyInformation();

  useEffect(() => {
    getMyInformation();
  }, [getMyInformation]);

  useEffect(() => {
    if (myInformation?.categoryList) {
      const initialCategories = myInformation.categoryList.map(item => item.categoryName);
      setUserCategory(initialCategories);
    }
  }, [myInformation]);

  const modifyMyCategory = () => {
    patchMyInformation(myInformation.password, userCategory);
    setIsChanged(false)
  }

  return (
    <MyPageContainer>
      <Logo style={{ margin: 20 }} />
      <h2>내 정보</h2>
      <MypageTable myInformation={myInformation} userCategory={userCategory} />
      <h2 style={{ marginTop: 10 }}>내 관심 카테고리</h2>
      <FormGroup style={{ width: '320px', display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '10px 10px 10px 30px' }}>
        {
          categoryName.map((data) => (
            <FormControlLabel
              key={data}
              checked={userCategory.includes(data)}
              control={
                <Checkbox
                  sx={{ color: orange[800], '&.Mui-checked': { color: orange[600], }, }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserCategory([...userCategory, data]);
                      setIsChanged(true);
                    } else {
                      setUserCategory(userCategory.filter(category => category !== data));
                      setIsChanged(true);
                    }
                  }}
                />
              }
              label={data}
            />
          ))
        }
      </FormGroup>
      {
        isChanged && <ModifyCategoryBtn variant="contained" onClick={modifyMyCategory}>수정하기</ModifyCategoryBtn>
      }
    </MyPageContainer>
  )
}

const MyPageContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModifyCategoryBtn = styled(Button)`
  && {
    margin-left: 20px;
    min-width: 80px;
    white-space: nowrap;
    background-color: #ff9800;
    @media (max-width: 576px) {
      font-size: 12px;
      min-width: 60px;
    }
  }
`;

export default Mypage;