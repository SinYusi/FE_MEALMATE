import axios from "axios";
import { useCallback, useState } from "react";

const useGetDetailRestaurant = () => {
  const [detailOfRestaurant, setDetailOfRestaurant] = useState({});

  const getDetailRestaurant = useCallback(async (restaurantId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/restaurant/${restaurantId}`)
      .then(response => setDetailOfRestaurant(response.data))
      .catch(error => console.error(error));
  }, [])

  return { detailOfRestaurant, getDetailRestaurant };
}

export default useGetDetailRestaurant;