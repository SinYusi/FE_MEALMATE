import axios from "axios";
import { useCallback, useState } from "react"

const useGetDetailBoard = () => {
  const [detailBoard, setDetailBoard] = useState({});

  const getDetailBoard = useCallback(async (boardId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/board/${boardId}`)
      .then(response => setDetailBoard(response.data))
      .catch(error => console.error(error))
  }, [])

  return { detailBoard, getDetailBoard };
}

export default useGetDetailBoard;