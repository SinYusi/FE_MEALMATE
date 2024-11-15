import axios from "axios";
import { useCallback, useState } from "react"

const useGetCategoryRestaurant = () => {
  const [categoryRestaurantList, setCategoryRestaurantList] = useState([]);

  const getCategoryRestaurant = useCallback(async (type) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/restaurant`, {
      params: {
        type,
      }
    }).then(response => {
      setCategoryRestaurantList(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);
  return { categoryRestaurantList, getCategoryRestaurant };
};

export default useGetCategoryRestaurant;