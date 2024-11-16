import { useParams } from "react-router-dom";
import styled from "styled-components";
import MobileRestaurantBoard from "./components/MobileRestaurantBoard";
import MobileRestaurantInformation from "./components/MobileRestaurantInformation";

const MobileDetailRestaurant = () => {
  const restaurantId = useParams().id;

  return (
    <DetailRestaurantPageContainer>
      <MobileRestaurantInformation restaurantId={restaurantId} />
      <MobileRestaurantBoard restaurantId={restaurantId} />
    </DetailRestaurantPageContainer>
  )
}

const DetailRestaurantPageContainer = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MobileDetailRestaurant;