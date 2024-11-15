import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import BottomNav from "./components/BottomNav";
import Main from "./pages/Main/Main";
import MobileMain from "./pages/Main/MobileMain";
import Login from "./pages/Login/Login";
import DetailRestaurant from "./pages/DetailRestaurant/DetailRestaurant";
import { createTheme, ThemeProvider } from "@mui/material";
import Board from "./pages/Board/Board";

const theme = createTheme({
  typography: {
    fontFamily: 'SUIT-Regular, sans-serif',
  },
});

function App() {
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function checkIsMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
  }

  if (isMobile) {
    return (
      <ThemeProvider theme={theme}>
        <WholeContainer>
          <BottomNav />
          <Routes>
            <Route path="/" element={<MobileMain />} />
          </Routes>
        </WholeContainer>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <WholeContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/restaurant/:id' element={<DetailRestaurant />} />
          <Route path="/board" element={<Board />} />
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

  @media (max-width: 768px) {
    background-color: lightgray;
  }

  @media (min-width: 769px) {
    background-color: white;
  }
`;

export default App;