import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password,
      });
      const token = response.data.token;
      const authority = response.data.authority;

      cookies.set('access_token', token, {
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600,
      });

      dispatch(loginSuccess({ email, authority }));

      setTimeout(() => {
        dispatch(logout());
      }, 60 * 60 * 1000); // 30분 (밀리초 단위)

      navigate('/');
    } catch (error) {
      setError(true);
      setErrorMessage("아이디 혹은 비밀번호를 잘못 입력하셨습니다");
      console.error(error);
    }
  };

  return { error, errorMessage, login };
}

export default useLogin;