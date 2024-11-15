import axios from "axios";
import { useCallback, useState } from "react"
import { useCookies } from "react-cookie";

const useGetRecommendRestaurant = () => {
  const [recommendRestaurant, setRecommendRestaurant] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const getRecommendRestaurant = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/member/suggestion`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setRecommendRestaurant(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, [token]);

  return { recommendRestaurant, getRecommendRestaurant };
}

export default useGetRecommendRestaurant;