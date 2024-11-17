import axios from "axios";
import { useCallback, useState } from "react"

const useGetSearch = () => {
  const [searchRestaurants, setSearchRestaurants] = useState([]);
  const search = useCallback(async (query) => {
    const restaurantName = query.toString();
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.post(`${apiUrl}/restaurant/search`, {
      restaurantName,
    }).then(response => {
      setSearchRestaurants(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, [])
  return { searchRestaurants, search };
}

export default useGetSearch;