import { useEffect } from "react";
import useGetWishList from "../../services/useGetWishList";
import Logo from "../../components/Logo";
import RestaurantCard from "../../components/RestaurantCard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileWish = () => {
  const { wishList, getWishList } = useGetWishList();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    getWishList();
  }, [getWishList])

  return (
    <WishPageContainer>
      <Logo style={{ margin: 20, width: 300 }} />
      <h2>찜 목록</h2>
      {
        isAuthenticated ?
          wishList.map((data) => (
            <RestaurantCard restaurantData={data} />
          ))
          :
          (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h3>로그인하시면 찜 목록이 보입니다!</h3>
              <Link to="/login">로그인하기</Link>
            </div>
          )
      }
    </WishPageContainer>
  )
}

const WishPageContainer = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MobileWish;