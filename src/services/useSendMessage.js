import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

const useSendMessage = () => {
  const [cookie] = useCookies(['access_token']);
  const token = cookie.access_token;
  const navigate = useNavigate();

  const sendMessage = async (message, opponentId, noteRoomId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.post(`${apiUrl}/note`, {
      message,
      opponentId,
      noteRoomId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => navigate(`/message/${noteRoomId}`, { state: { opponentId } }))
      .catch(error => console.error(error));
  }

  return sendMessage;
}

export default useSendMessage