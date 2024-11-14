import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import BottomNav from "./components/BottomNav";
import Main from "./pages/Main/Main";
import MobileMain from "./pages/Main/MobileMain";
import Login from "./pages/Main/Login/Login";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WholeContainer>
      {isMobile ? <BottomNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={isMobile ? <MobileMain /> : <Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    background-color: lightgray;
  }

  @media (min-width: 769px) {
    background-color: white;
  }
`;

export default App;