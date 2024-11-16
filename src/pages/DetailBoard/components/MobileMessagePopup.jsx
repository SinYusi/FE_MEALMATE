import { useState } from "react";
import styled from "styled-components";
import useCreateNoteRoom from "../../../services/useCreateNoteRoom";
import OrangeBorderButton from "../../../components/OrangeBorderButton";
import OrangeFilledButton from "../../../components/OrangeFilledButton";
import OrangeBorderTextField from "../../../components/OrangeBorderTextField";

const MobileMessagePopup = ({ setIsClickedSendBtn, opponentId }) => {
  const [message, setMessage] = useState("");
  const createNoteRoom = useCreateNoteRoom();

  const sendMessageSbumit = async (e) => {
    e.preventDefault();
    await createNoteRoom(message, opponentId);
    setIsClickedSendBtn(false);
  }

  const handleOverlayClick = (e) => {
    // PopupContainer가 아닌 영역 클릭 시 닫기
    if (e.target === e.currentTarget) {
      setIsClickedSendBtn(false);
    }
  };

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContainer onSubmit={sendMessageSbumit}>
        <OrangeBorderTextField
          multiline
          rows={4}
          placeholder="저랑 같이 밥 드실래요?"
          onChange={(e) => setMessage(e.target.value)}
        />
        <BtnBox>
          <OrangeBorderButton onClick={() => setIsClickedSendBtn(false)} style={{ width: 140 }}>취소</OrangeBorderButton>
          <OrangeFilledButton type="submit" style={{ width: 140 }}>전송</OrangeFilledButton>
        </BtnBox>
      </PopupContainer>
    </PopupOverlay>
  )
}

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
  width: 300px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1001; /* overlay보다 위에 표시 */
  position: relative;
  height: 160px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
`

export default MobileMessagePopup;