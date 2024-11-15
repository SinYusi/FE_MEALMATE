import axios from "axios";
import { useCallback, useState } from "react"

const useGetPopularRestaurant = () => {
  const [popularRestaurant, setPopularRestaurant] = useState([]);
  const getPopularRestaurant = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/restaurant/best`)
      .then(response => {
        setPopularRestaurant(response.data)
      }).catch(error => {
        console.error(error);
      })
  }, [])

  return { popularRestaurant, getPopularRestaurant };
}

export default useGetPopularRestaurant;