import axios from "axios";
import { useCallback, useState } from "react"
import { useCookies } from "react-cookie";

const useGetWishList = () => {
  const [wishList, setWishList] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const getWishList = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/wish`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setWishList(response.data);
    }).catch(error => {
      console.error("위시 리스트 불러오는 중 오류 발생", error);
    })
  }, [token])

  return { wishList, getWishList };
}

export default useGetWishList;