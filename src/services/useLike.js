import axios from "axios";
import { useCookies } from "react-cookie";

const useLikeService = () => {
  const token = useCookies(['access_token'])[0].access_token;
  const likeService = async (isLiked, restaurantId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (isLiked) {
      await axios.delete(`${apiUrl}/wish/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch(error => {
        console.error(error);
      })
    }
    if (!isLiked) {
      await axios.get(`${apiUrl}/wish/save/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch(error => console.error(error));
    }
  }
  return likeService;
}

export default useLikeService;