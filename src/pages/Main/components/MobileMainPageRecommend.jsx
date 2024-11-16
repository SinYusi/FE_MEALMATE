import { useSelector } from "react-redux";
import styled from "styled-components";
import Divider from "../../../components/Divider";
import OrangeBorderBox from "../../../components/OrangeBorderBox";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import useGetRecommendRestaurant from "../../../services/useGetRecommendRestaurant";
import { useEffect, useRef, useState } from "react";
import RecommendCard from "./RecommendCard";

const MobileMainPageRecommend = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { recommendRestaurant, getRecommendRestaurant } = useGetRecommendRestaurant();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardBoxRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const getData = async () => {
        await getRecommendRestaurant();
      }

      getData();
    }
  }, [getRecommendRestaurant]);

  const handleNextClick = () => {
    if (cardBoxRef.current) {
      const newIndex = Math.min(currentIndex + 1, 4);
      setCurrentIndex(newIndex);
      cardBoxRef.current.scrollLeft += 280;
    }
  };

  const handlePrevClick = () => {
    if (cardBoxRef.current) {
      const newIndex = Math.min(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
      cardBoxRef.current.scrollLeft -= 280;
    }
  };

  return (
    <RecommendContainer>
      <Title>회원님에게 딱 맞는 식당!</Title>
      <Divider style={{ width: "90%" }} />
      {
        isAuthenticated ?
          <BtnContainer>
            {recommendRestaurant.length > 2 ? <PrevBtn variant="text" onClick={handlePrevClick}>{"<"}</PrevBtn> : null}
            <RecommendBox ref={cardBoxRef}>
              {
                recommendRestaurant?.map((data) => (
                  <RecommendCard key={data.restaurantId} restaurantData={data} />
                ))
              }
            </RecommendBox>
            {recommendRestaurant.length > 2 ? <NextBtn variant="text" onClick={handleNextClick}>{">"}</NextBtn> : null}
          </BtnContainer>
          :
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 150 }}>
            <p>로그인하면 알맞는 식당 추천해드려요!</p>
            <Link to="/login">로그인하기</Link>
          </div>
      }
    </RecommendContainer>
  )
}

const RecommendContainer = styled(OrangeBorderBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 220px;
  margin: 10px;
`

const Title = styled.p`
  margin: 10px;
  font-weight: bold;
`

const PrevBtn = styled(Button)`
  position: absolut;
  left: -10px;
  top: 10px;
  transform: translateY(-50%);
  opacity: 0;
  &&{
    transition: opacity 0.5s ease;
    width: 30px;
    min-width: 30px;
    height: 50px;
    &:focus {
      outline: none;
    }
  }
`

const NextBtn = styled(Button)`
  position: absolute;
  right: -10px;
  top: 10px;
  transform: translateY(-50%);
  opacity: 0;
  && {
    transition: opacity 0.5s ease;
    width: 30px;
    min-width: 30px;
    height: 50px;
    &:focus {
      outline: none;
    }
  }
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover ${PrevBtn}, &:hover ${NextBtn}{
    opacity: 1;
  }
`

const RecommendBox = styled.div`
  display: flex;
  width: 280px;
  overflow: hidden;
  scroll-behavior: smooth;
`

export default MobileMainPageRecommend;