import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

const useGetMessageList = () => {
  const [messageList, setMessageList] = useState([]);
  const [cookie] = useCookies(['access_token']);
  const token = cookie.access_token;
  const getMessageList = useCallback(async (noteRoomId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/note/${noteRoomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setMessageList(response.data.reverse()))
      .catch(error => console.error(error));
  }, [token])

  return { messageList, getMessageList };
}

export default useGetMessageList;