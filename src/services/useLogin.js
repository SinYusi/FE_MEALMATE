import { useDispatch } from "react-redux";
import { reduxLogin } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email, password) => {
    dispatch(reduxLogin(email, password));
    navigate('/');
  };

  return login;
}

export default useLogin;