import styled from "styled-components"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetNoteroomList from "../../../services/useGetNoteroomList";
import noneImg from "../../../assets/noneImg.png";

const MessageList = () => {
  const { noteroomList, getNoteroomList } = useGetNoteroomList();
  const navigate = useNavigate();

  useEffect(() => {
    getNoteroomList();
  }, [getNoteroomList])

  return (
    <>
      {
        noteroomList.length > 0 ?
          noteroomList?.map((data) => (
            <MessageListContainer key={data.sendDt} onClick={() => navigate(`./${data.roomId}`, { state: { opponentId: data.opponentId } })}>
              <h2 style={{ margin: "0px 0px 10px 0px" }}>{data.roomName}</h2>
              <p style={{ margin: 0 }}>마지막 쪽지 : {data.message}</p>
            </MessageListContainer >
          ))
          :
          <>
            <img src={noneImg} alt="없음" />
            <p>쪽지가 아직 없습니다!</p>
          </>
      }
    </>
  )
}

const MessageListContainer = styled.div`
  cursor: pointer;
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  transition: background-color 0.5s ease;

  &: hover {
    background-color: #f1f3f5;
  };
`

export default MessageList;