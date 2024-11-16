import axios from "axios";
import { useCookies } from "react-cookie";

const usePatchRecruitment = () => {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const patchRecruitment = async (boardId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.patch(`${apiUrl}/board/update/recruitment/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => window.location.reload())
      .catch(error => console.error(error))
  }

  return patchRecruitment;
}

export default usePatchRecruitment;