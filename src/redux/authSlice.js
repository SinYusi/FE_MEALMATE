import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const initialState = {
  isAuthenticated: false,
  email: "",
  authority: "",
  tokenExpiry: null, // 토큰 만료 시간
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.authority = action.payload.authority;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.error = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.email = "";
      state.authority = "";
      state.tokenExpiry = null;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, loginFailure } = authSlice.actions;

export const reduxLogin = (email, password) => async (dispatch) => {
  const cookies = new Cookies();
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    const token = response.data.token;
    const authority = response.data.authority;
    const expiresIn = 30 * 60 * 1000; // 30분
    const tokenExpiry = Date.now() + expiresIn;

    cookies.set('access_token', token, {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Strict',
      maxAge: expiresIn / 1000, // 쿠키 만료 시간 (초 단위)
    });

    dispatch(loginSuccess({ email, authority, tokenExpiry }));
  } catch (error) {
    console.error(error);
    dispatch(loginFailure("아이디 혹은 비밀번호를 잘못 입력하셨습니다."));
  }
};

export const logout = () => (dispatch) => {
  const cookies = new Cookies();
  cookies.remove('access_token', { path: '/' });

  dispatch(logoutSuccess());
}

export default authSlice.reducer;