import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const initialState = {
  isAuthenticated: false,
  email: "",
  authority: "",
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
      state.error = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.email = "";
      state.authority = "";
      state.error = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, loginFailure } = authSlice.actions;

export const logout = () => (dispatch) => {
  const cookies = new Cookies();
  cookies.remove('access_token', { path: '/' });

  dispatch(logoutSuccess());
}

export default authSlice.reducer;