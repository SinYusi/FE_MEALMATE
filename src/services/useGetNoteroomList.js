import axios from "axios";
import { useCallback, useState } from "react"
import { useCookies } from "react-cookie";

const useGetNoteroomList = () => {
  const [noteroomList, setNoteroomList] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const getNoteroomList = useCallback(async () => {
    const response = await axios.get(`https://api.meal-mate.shop/api/noteroom/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setNoteroomList(response.data);
  }, [token])

  return { noteroomList, getNoteroomList };
}

export default useGetNoteroomList;