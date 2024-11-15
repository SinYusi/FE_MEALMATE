import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import OrangeBorderButton from "../../../components/OrangeBorderButton";
import OrangeFilledButton from "../../../components/OrangeFilledButton";
import OrangeBorderTextField from "../../../components/OrangeBorderTextField";

const AddBoardPopup = ({ onClose, restaurantId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookies] = useCookies(['access_token']);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 스크롤 막기
    return () => {
      document.body.style.overflow = 'auto'; // 팝업 닫힐 때 스크롤 다시 허용
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // PopupContainer 외부를 클릭했을 때만 닫힘
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.access_token
    if (title && content) {
      try {
        await axios.post('https://api.meal-mate.shop/api/board', {
          title: title,
          content: content,
          restaurantId: restaurantId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('게시물 추가 완료');
        onClose(true);
      } catch (error) {
        console.error(error)
      }
    }
    if (title == null) {
      alert('제목을 작성해주세요')
    }
    if (content == null) {
      alert('내용을 작성해주세요')
    }
  }

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContainer onSubmit={handleSubmit}>
        <h2 style={{ margin: "10px 0px" }}>게시글 작성</h2>
        <OrangeBorderTextField
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          style={{ marginBottom: 20 }}
        />
        <OrangeBorderTextField
          label="내용"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleContentChange}
        />
        <ButtonContainer>
          <OrangeBorderButton onClick={onClose}>
            취소
          </OrangeBorderButton>
          <OrangeFilledButton type="submit">
            작성
          </OrangeFilledButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모든 다른 요소 위에 표시 */
`;

const PopupContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1001; /* overlay보다 위에 표시 */
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export default AddBoardPopup;