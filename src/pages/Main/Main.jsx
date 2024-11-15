import styled from "styled-components";
import MainPagePost from "./components/MainPagePost";
import MainPageRecommend from "./components/MainPageRecommend";
import PopularRestaurant from "./components/PopularRestaurant";
import CategoryRestaurant from "./components/CategoryRestaurant";

const Main = () => {
  return (
    <MainPageContainer>
      <div style={{ display: "flex" }}>
        <MainPagePost />
        <MainPageRecommend />
      </div>
      <PopularRestaurant />
      <CategoryRestaurant />
    </MainPageContainer>
  )
}

const MainPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`

export default Main;