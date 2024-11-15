import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CategoryRestaurantCard = ({ restaurantData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
  }, [restaurantData])

  return (
    <CategoryRestaurantCardContainer>
      <CategoryRestaurantCardBox onClick={() => navigate(`/restaurant/${restaurantData.restaurantId}`)}>
        <RestaurantImg src={restaurantData.restaurantImageUrl} alt="식당 사진" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "150px", margin: 10 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <RestaurantName>{restaurantData.restaurantName}</RestaurantName>
            {isOpen ? <IsOpen style={{ color: "green" }}>영업 중</IsOpen> : <IsOpen style={{ color: "red" }}>영업 종료</IsOpen>}
          </div>
          <p style={{ margin: 0 }}>❤️{restaurantData.likeCount}</p>
        </div>
      </CategoryRestaurantCardBox>
    </CategoryRestaurantCardContainer >
  )
}

const CategoryRestaurantCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
`

const CategoryRestaurantCardBox = styled.div`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5%;
  width: 170px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  transition: background-color 0.5s ease;
  
  &:hover {
    background-color: #f1f3f5;
  }
`

const RestaurantImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 10px 10px 0px 10px;
`

const IsOpen = styled.p`
  margin: 0;
  font-size: 14px;
`

const RestaurantName = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`

export default CategoryRestaurantCard;