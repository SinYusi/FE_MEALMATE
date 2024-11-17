import { useSearchParams } from "react-router-dom";
import useGetSearch from "../../services/useGetSearch";
import RestaurantCard from "../../components/RestaurantCard";
import { useEffect } from "react";
import styled from "styled-components";
import Logo from "../../components/Logo";
import noneImg from "../../assets/noneImg.png"

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { searchRestaurants, search } = useGetSearch();

  useEffect(() => {
    search(query);
  }, [search, query])

  return (
    <SearchContainer>
      <Logo style={{ margin: 20 }} />
      {
        searchRestaurants.length > 0 ?
          searchRestaurants.map((data, index) => (
            <RestaurantCard restaurantData={data} key={data.restaurantId} />
          ))
          :
          <>
            <img src={noneImg} alt="없음" />
            <p>검색어에 해당하는 식당이 없습니다.</p>
          </>
      }
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Search;