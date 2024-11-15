import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const RestaurantCard = ({ restaurantData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (restaurantData) {
      const currentTime = new Date();
      const currentFormattedTime = new Date(`1970-01-01T${currentTime.getHours()}:${currentTime.getMinutes()}:00`)
      const openAt = new Date(`1970-01-01T${restaurantData.openAt}:00`);
      const closeAt = new Date(`1970-01-01T${restaurantData.closeAt}:00`);
      if (currentFormattedTime >= openAt && currentFormattedTime <= closeAt) {
        setIsOpen(true);
      }
      else {
        setIsOpen(false);
      }
    }
  }, [restaurantData]);

  return (
    <CardContainer onClick={() => navigate(`/restaurant/${restaurantData.restaurantId}`)} >
      <RestaurantImg src={restaurantData.restaurantImageUrl} alt="식당 사진" />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h4 style={{ margin: 5 }}>{restaurantData?.restaurantName}</h4>
        <p style={{ margin: 5 }}>{restaurantData?.restaurantType}</p>
      </div>
      {isOpen ? <IsOpen style={{ color: 'green' }}>영업 중</IsOpen> : <IsOpen style={{ color: 'red' }}>영업 종료</IsOpen>}
      <LikeCount>❤️{restaurantData?.likeCount}</LikeCount>
    </CardContainer>
  );
}

// 슬라이드 인 애니메이션 정의
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  cursor: pointer;
  width: 80%;
  border-radius: 10px;
  display: flex;
  margin: 20px 0px 0px 0px;
  position: relative;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  transition: background-color 0.5s ease;
  
  animation: ${slideIn} 0.5s ease-out;
  
  &:hover {
    background-color: #f1f3f5;
  }
`;

const RestaurantImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const LikeCount = styled.p`
  position: absolute;
  right: 20px;
  bottom: 15px;
  margin: 0;
  font-size: 14px;
`;

const IsOpen = styled.p`
  position: absolute;
  right: 20px;
  top: 15px;
  mragin: 0;
  font-size: 14px;
`

export default RestaurantCard;