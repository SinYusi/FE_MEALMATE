import axios from "axios";
import { useCookies } from "react-cookie";

const useAddBoard = () => {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token

  const addBoard = async (title, content, restaurantId, onClose) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (title && content) {
      axios.post(`${apiUrl}/board`, {
        title,
        content,
        restaurantId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => onClose(true))
        .catch(error => console.error(error));
    }
  }

  return addBoard;
}

export default useAddBoard;