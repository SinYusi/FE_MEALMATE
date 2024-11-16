import axios from "axios";
import { useCookies } from "react-cookie"
import useSendMessage from "./useSendMessage";

const useCreateNoteRoom = () => {
  const [cookie] = useCookies(['access_token']);
  const token = cookie.access_token;
  const sendMessage = useSendMessage();

  const createNoteRoom = async (message, opponentId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.post(`${apiUrl}/noteroom`, {
      opponentId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => sendMessage(message, opponentId, response.data))
      .catch(error => console.error(error));
  }
  return createNoteRoom;
}

export default useCreateNoteRoom;