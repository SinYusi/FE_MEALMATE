import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import BottomNav from "./components/BottomNav";
import Main from "./pages/Main/Main";
import MobileMain from "./pages/Main/MobileMain";
import Login from "./pages/Login/Login";
import DetailRestaurant from "./pages/DetailRestaurant/DetailRestaurant";
import { createTheme, ThemeProvider } from "@mui/material";
import Board from "./pages/Board/Board";
import DetailBoard from "./pages/DetailBoard/DetailBoard";
import SignUp from "./pages/SignIn/SignUp";
import Mypage from "./pages/Mypage/Mypage";
import Wish from "./pages/Wish/Wish";
import Message from "./pages/Message/Message";
import DetailMessage from "./pages/DetailMessage/DetailMessage";
import MobileLogin from "./pages/Login/MobileLogin";
import MobileSignup from "./pages/SignIn/MobileSignUp";
import MobileDetailRestaurant from "./pages/DetailRestaurant/MobileDetailRestaurant";
import MobileDetailBoard from "./pages/DetailBoard/MobileDetailBoard";
import MobileBoard from "./pages/Board/MobileBoard";
import MobileMypage from "./pages/Mypage/MoblieMyPage";
import MobileWish from "./pages/Wish/MobileWish";
import { useDispatch, useSelector } from "react-redux";
import MobileMessage from "./pages/Message/MobileMessage";
import MobileDetailMessage from "./pages/DetailMessage/MobileDetailMessage";
import { logout } from "./redux/authSlice";

const theme = createTheme({
  typography: {
    fontFamily: 'SUIT-Regular, sans-serif',
  },
});

function App() {
  const [isMobile, setIsMobile] = useState(checkIsMobile());
  const dispatch = useDispatch();
  const tokenExpiry = useSelector(state => state.auth.tokenExpiry);

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (tokenExpiry && Date.now() > tokenExpiry) {
        dispatch(logout());
      }
    };

    const intervalId = setInterval(checkTokenExpiry, 5000); // 1초마다 확인
    return () => clearInterval(intervalId); // 클린업
  }, []);

  function checkIsMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
  }

  const location = useLocation();

  if (isMobile) {
    return (
      <ThemeProvider theme={theme}>
        <WholeContainer>
          {location.pathname !== '/login' && location.pathname !== '/signup' && <BottomNav />}
          <Routes>
            <Route path="/" element={<MobileMain />} />
            <Route path="/login" element={<MobileLogin />} />
            <Route path='/signup' element={<MobileSignup />} />
            <Route path='/restaurant/:id' element={<MobileDetailRestaurant />} />
            <Route path="/board" element={<MobileBoard />} />
            <Route path="/board/:id" element={<MobileDetailBoard />} />
            <Route path="/mypage" element={<MobileMypage />} />
            <Route path="/wish" element={<MobileWish />} />
            <Route path="/message" element={<MobileMessage />} />
            <Route path="/message/:id" element={<MobileDetailMessage />} />
          </Routes>
        </WholeContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <WholeContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<SignUp />} />
          <Route path='/restaurant/:id' element={<DetailRestaurant />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<DetailBoard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/message" element={<Message />} />
          <Route path="/message/:id" element={<DetailMessage />} />
        </Routes>
      </WholeContainer>
    </ThemeProvider>
  );
}

const WholeContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

export default App;