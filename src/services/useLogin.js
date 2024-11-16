import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxLogin } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const login = async (email, password) => {
    dispatch(reduxLogin(email, password));
  };

  return login;
}

export default useLogin;