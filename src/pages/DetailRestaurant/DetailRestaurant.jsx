import { useParams } from "react-router-dom";
import RestaurantInformation from "./components/RestaurantInformation";
import styled from "styled-components";
import RestaurantBoard from "./components/RestaurantBoard";

const DetailRestaurant = () => {
  const restaurantId = useParams().id;

  return (
    <DetailRestaurantPageContainer>
      <RestaurantInformation restaurantId={restaurantId} />
      <RestaurantBoard restaurantId={restaurantId} />
    </DetailRestaurantPageContainer>
  )
}

const DetailRestaurantPageContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default DetailRestaurant;