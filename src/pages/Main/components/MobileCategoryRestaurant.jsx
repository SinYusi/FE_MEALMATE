import React, { useEffect, useState } from 'react';
import { Chip } from "@mui/material"
import styled from "styled-components";
import useGetCategoryRestaurant from '../../../services/useGetCategoryRestaurant';
import CategoryRestaurantCard from './CategoryRestaurantCard';

const MobileCategoryRestaurant = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ['전체', '일식', '고기', '피자', '찌개', '양식', '중식', '치킨', '집밥', '버거', '분식', '카페', '아시안', '술집'];
  const { categoryRestaurantList, getCategoryRestaurant } = useGetCategoryRestaurant();

  useEffect(() => {
    selectedCategory === '전체' ? getCategoryRestaurant(null) : getCategoryRestaurant(selectedCategory);
  }, [selectedCategory, getCategoryRestaurant]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryRestaurantContainer>
      <CategoryBox>
        {categories.map((category) => (
          <Category
            key={category}
            label={category}
            variant="outlined"
            onClick={() => handleCategoryClick(category)}
            isSelected={selectedCategory === category}
          />
        ))}
      </CategoryBox>
      <CategoryRestaurantCardBox>
        {
          categoryRestaurantList.map((data) => (
            <CategoryRestaurantCard restaurantData={data} key={data.restaurantId} />
          ))
        }
      </CategoryRestaurantCardBox>
    </CategoryRestaurantContainer>
  );
};

const CategoryRestaurantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CategoryBox = styled.div`
  display: flex;
  justify-content: flex-start; /* 카테고리를 왼쪽 정렬 */
  padding: 8px 0px;
  width: 350px;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  white-space: nowrap; /* 항목이 줄바꿈되지 않도록 설정 */
  -ms-overflow-style: none; /* IE/Edge에서 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* Webkit 브라우저에서 스크롤바 숨김 */
  }
`;

const Category = styled(Chip)`
  width: 59px;
  && {
    margin-right: 8px;
    flex-shrink: 0;
    border-color: ${props => props.isSelected ? 'orange' : 'rgba(0, 0, 0, 0.23)'};
  }
`;

const CategoryRestaurantCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 350px;
  max-width: 950px;
`

export default MobileCategoryRestaurant;