import axios from "axios";
import { useCallback, useState } from "react";

const useGetBoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = useCallback(async (page, size, department = "") => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/board`, {
      params: {
        page,
        size,
        department,
      }
    }).then((response => {
      setBoardList(response.data);
    })).catch((error) => {
      console.error(error);
    })
  }, [])

  return { boardList, getBoardList };
}

export default useGetBoardList;