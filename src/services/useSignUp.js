import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();

  const signUp = async (email, password, nickname, school, studentNumber, department, userCategory) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const categoryRegisters = userCategory.map(categoryName => ({
      categoryName: categoryName
    }));
    await axios.post(`${apiUrl}/member/signup`, {
      email,
      password,
      nickname,
      school,
      studentNumber,
      department,
      categoryRegisters,
    }).then(() => navigate('/login'))
      .catch(error => console.error(error))
  }

  return signUp;
}

export default useSignUp;