import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const RecommendCard = ({ restaurantData }) => {
  const navigate = useNavigate();

  return (
    <RecommendCardContainer onClick={() => navigate(`/restaurant/${restaurantData.restaurantId}`)}>
      <RecommendCardImg src={restaurantData.restaurantImageUrl} alt="식당 사진" />
      <RestaurantName>{restaurantData.restaurantName}</RestaurantName>
    </RecommendCardContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const RecommendCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 150px;
  flex-shrink: 0; /* 슬라이더 내에서 크기를 고정 */
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.5s ease;

  animation: ${fadeIn} 1s ease-in;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const RecommendCardImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`;

const RestaurantName = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  text-align: center;
`;

export default RecommendCard;