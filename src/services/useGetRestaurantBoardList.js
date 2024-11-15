import axios from "axios";
import { useCallback, useState } from "react"

const useGetRestaurantBoardList = () => {
  const [restaurantBoardList, setRestaurantBoardList] = useState({
    content: [],
    last: false,
  });

  const getRestaurantBoardList = useCallback(async (restaurantId, page, size, setLoading) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (page === 0) {
      setRestaurantBoardList({
        content: [],
        last: false,
      });
    }
    else {
      if (restaurantBoardList.last) return;
    }
    setLoading(true);
    await axios.get(`${apiUrl}/board/${restaurantId}/list`, {
      params: {
        page: page,
        size: size,
      }
    }).then(response => {
      if (page === 0) {
        setRestaurantBoardList(() => ({
          content: [...response.data.content],
          last: false,
        }));
      }
      else {
        setRestaurantBoardList(prevList => ({
          content: [...prevList.content, ...response.data.content],
          last: false,
        }));
      }
      if ((page + 1) === response.data.totalPage) {
        setRestaurantBoardList((prevList) => ({
          content: [...prevList.content],
          last: true,
        }));
      }
      setLoading(false);
    }).catch(error => console.error(error))
  }, [restaurantBoardList.last]);

  return { restaurantBoardList, getRestaurantBoardList };
}

export default useGetRestaurantBoardList;