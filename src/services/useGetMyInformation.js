import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie"

const useGetMyInformation = () => {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [myInformation, setMyInformation] = useState([]);

  const getMyInformation = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/member`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => setMyInformation(response.data))
      .catch(error => console.error(error));
  }, [token])

  return { myInformation, getMyInformation };
}

export default useGetMyInformation;