import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

const useGetLikeInformation = () => {
  const [cookie] = useCookies(['access_token']);
  const token = cookie.access_token;
  const [isLiked, setIsLiked] = useState(false);

  const getLikeInformation = useCallback(async (restaurantId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/wish/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setIsLiked(response.data))
      .catch(error => console.error(error));
  }, [token])

  return { isLiked, setIsLiked, getLikeInformation };
}

export default useGetLikeInformation;