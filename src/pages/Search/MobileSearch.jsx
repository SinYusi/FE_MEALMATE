import { useSearchParams } from "react-router-dom";
import useGetSearch from "../../services/useGetSearch";
import RestaurantCard from "../../components/RestaurantCard";
import { useEffect } from "react";
import styled from "styled-components";

const MobileSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { searchRestaurants, search } = useGetSearch();

  useEffect(() => {
    search(query);
  }, [search, query])

  console.log(searchRestaurants);

  return (
    <SearchContainer>
      {
        searchRestaurants.length > 0 ?
          searchRestaurants.map((data, index) => (
            <RestaurantCard restaurantData={data} key={data.restaurantId} />
          ))
          :
          null
      }
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`

export default MobileSearch;