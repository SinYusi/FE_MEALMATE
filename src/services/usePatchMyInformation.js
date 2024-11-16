import axios from "axios"
import { useCookies } from "react-cookie"

const usePatchMyInformation = () => {
  const [cookie] = useCookies(['accss_token']);
  const token = cookie.access_token;
  const patchMyInformation = async (password, categoryList) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const categoryRegisters = categoryList.map((category) => {
      return (
        { categoryName: category }
      )
    })
    await axios.patch(`${apiUrl}/member`, {
      password,
      categoryRegisters,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => alert('정보 수정 성공'))
      .catch(error => alert(`정보 수정 실패 ${error}`))
  }
  return patchMyInformation;
}

export default usePatchMyInformation;