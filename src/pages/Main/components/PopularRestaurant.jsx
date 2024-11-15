import { useEffect } from "react";
import useGetPopularRestaurant from "../../../services/useGetPopularRestaurant";
import RestaurantCard from "../../../components/RestaurantCard";
import styled from "styled-components";
import OrangeBorderBox from "../../../components/OrangeBorderBox";
import Divider from "../../../components/Divider";

const PopularRestaurant = () => {
  const { popularRestaurant, getPopularRestaurant } = useGetPopularRestaurant();

  useEffect(() => {
    const getData = async () => {
      await getPopularRestaurant();
    }

    getData();
  }, [])

  return (
    <PopularRestaurantContainer>
      <h2 style={{ margin: 10 }}>난리난 식당!</h2>
      <Divider style={{ width: "90%" }} />
      {
        popularRestaurant.map(data => (
          <RestaurantCard restaurantData={data} key={data.restaurantId} />
        ))
      }
    </PopularRestaurantContainer>
  )
}

const PopularRestaurantContainer = styled(OrangeBorderBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 840px;
  height: 500px;
  margin: 20px;
`

export default PopularRestaurant;