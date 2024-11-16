import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MessagePopup from "./components/MessagePopup";
import calculateTimeAgo from "../../utils/calculateTimeAgo";
import Logo from "../../components/Logo";
import useGetDetailBoard from "../../services/useGetDetailBoard";
import useDeleteBoard from "../../services/useDeleteBoard";
import OrangeBorderTextField from "../../components/OrangeBorderTextField";
import OrangeBorderButton from "../../components/OrangeBorderButton";
import OrangeFilledButton from "../../components/OrangeFilledButton";
import usePatchRecruitment from "../../services/usePatchRecruitment";

const DetailBoard = () => {
  const email = useSelector((state) => state.auth.email);
  const boardId = useParams().id;
  const { detailBoard, getDetailBoard } = useGetDetailBoard();
  const [isClickedSendBtn, setIsClickedSendBtn] = useState(false);
  const [isModifyBtnClicked, setIsModifyBtnClicked] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(detailBoard.title);
  const [modifyContent, setModifyContent] = useState(detailBoard.content);
  const deleteBoard = useDeleteBoard();
  const patchRecruitment = usePatchRecruitment();

  useEffect(() => {
    getDetailBoard(boardId);
  }, [getDetailBoard, boardId]);

  useEffect(() => {
    setModifyTitle(detailBoard.title);
    setModifyContent(detailBoard.content);
  }, [detailBoard]);

  const deleteBoardClick = async () => {
    await deleteBoard(boardId);
  }

  const updateRecruitment = async () => {
    patchRecruitment(detailBoard.boardId)
  }

  return (
    <Container>
      <Logo style={{ margin: 20, width: 300 }} />
      <DetailBoardContainer>
        {
          isClickedSendBtn && <MessagePopup setIsClickedSendBtn={setIsClickedSendBtn} opponentId={detailBoard.writerId} />
        }
        <div style={{ display: "flex", margin: "10px 20px 0px 20px", alignItems: "center" }}>
          {
            !isModifyBtnClicked ?
              <>
                <InformationText>{detailBoard.nickname} · {detailBoard.department} · {calculateTimeAgo(detailBoard.lastTime)} 전</InformationText>
                {
                  email === detailBoard.email ?
                    <div style={{ display: "flex" }}>
                      <IconButton style={{ margin: 0 }} size="small" onClick={() => setIsModifyBtnClicked(true)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton style={{ margin: 0 }} size="small" onClick={deleteBoardClick}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                    :
                    email === "" ?
                      null
                      :
                      detailBoard.isRecruitment ?
                        <IconButton onClick={() => setIsClickedSendBtn(true)} size="small">
                          <SendIcon fontSize="small" />
                        </IconButton>
                        :
                        null
                }
              </>
              :
              null
          }
        </div>
        {
          isModifyBtnClicked ?
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <OrangeBorderTextField value={modifyTitle} onChange={(e) => setModifyTitle(e.target.value)} style={{ width: "90%", margin: 10 }} />
              <OrangeBorderTextField value={modifyContent} onChange={(e) => setModifyContent(e.target.value)} multiline rows={3} style={{ width: "90%", margin: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "10px 0px 20px 0px" }}>
                <OrangeBorderButton style={{ width: 300 }} onClick={() => setIsModifyBtnClicked(false)}>취소</OrangeBorderButton>
                <OrangeFilledButton style={{ width: 300 }}>완료</OrangeFilledButton>
              </div>
            </div>
            :
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Title>{detailBoard.title}</Title>
                {
                  email === detailBoard.email ?
                    detailBoard.isRecruitment ?
                      <OrangeBorderButton onClick={updateRecruitment}>모집 완료</OrangeBorderButton>
                      :
                      <InformationText>모집 완료</InformationText>
                    :
                    detailBoard.isRecruitment ?
                      <InformationText style={{ color: "orange" }}>모집 중</InformationText>
                      :
                      <InformationText>모집 완료</InformationText>
                }
              </div>
              <Content>{detailBoard.content}</Content>
            </>
        }
      </DetailBoardContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DetailBoardContainer = styled.div`
  width: 700px;
  border-radius: 10px;
  border: 1px solid #ff9800;
  margin: 20px;
`

const InformationText = styled.p`
  font-size: 15px;
  color: #afafb2;
  margin: 0;
`

const Title = styled.h3`
  margin: 10px 10px 10px 20px;
`

const Content = styled.p`
  margin: 5px 20px 10px 20px
`

export default DetailBoard;