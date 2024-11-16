import { useEffect } from "react";
import useGetWishList from "../../services/useGetWishList";
import Logo from "../../components/Logo";
import RestaurantCard from "../../components/RestaurantCard";
import styled from "styled-components";

const Wish = () => {
  const { wishList, getWishList } = useGetWishList();

  useEffect(() => {
    getWishList();
  }, [getWishList])

  return (
    <WishPageContainer>
      <Logo style={{margin: 20, width: 300}}/>
      <h2>찜 목록</h2>
      {
        wishList.map((data) => (
          <RestaurantCard restaurantData={data} />
        ))
      }
    </WishPageContainer>
  )
}

const WishPageContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Wish;