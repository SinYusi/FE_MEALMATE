import styled from "styled-components";
import MobileMainPageRecommend from "./components/MobileMainPageRecommend";
import MobileMainPagePost from "./components/MobileMainPagePost";
import MobilePopularRestaurant from "./components/MobilePopularRestaurant";
import Logo from "../../components/Logo";
import MobileCategoryRestaurant from "./components/MobileCategoryRestaurant";

const MobileMain = () => {
  return (
    <MainPageContainer>
      <Logo style={{ margin: 20 }} />
      <MobileMainPageRecommend />
      <MobileMainPagePost />
      <MobilePopularRestaurant />
      <MobileCategoryRestaurant />
    </MainPageContainer>
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