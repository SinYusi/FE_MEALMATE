import axios from "axios";
import { useState } from "react"

const useGetSearch = async () => {
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const search = (restaurantName) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/restaurant/search`, {
      restaurantName,
    }).then(response => {
      setSearchRestaurants(response.data);
    }).catch(error => {
      console.error("검색 도중 오류 발생")
    })
  }
  return { searchRestaurants, search };
}

export default useGetSearch;