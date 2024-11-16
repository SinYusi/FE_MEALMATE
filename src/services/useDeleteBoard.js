import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useDeleteBoard = () => {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const navigate = useNavigate();

  const deleteBoard = async (boardId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.delete(`${apiUrl}/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => navigate(-1))
      .catch(error => console.error(error));
  }

  return deleteBoard;
}

export default useDeleteBoard;