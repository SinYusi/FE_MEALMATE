import styled from "styled-components"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetNoteroomList from "../../../services/useGetNoteroomList";
import { useSelector } from "react-redux";

const MobileMessageList = () => {
  const { noteroomList, getNoteroomList } = useGetNoteroomList();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    getNoteroomList();
  }, [getNoteroomList])

  if (isAuthenticated) {
    return (
      <>
        {
          noteroomList?.map((data) => (
            <MessageListContainer key={data.sendDt} onClick={() => navigate(`./${data.roomId}`, { state: { opponentId: data.opponentId } })}>
              <h2 style={{ margin: "0px 0px 10px 0px" }}>{data.roomName}</h2>
              <p style={{ margin: 0 }}>마지막 쪽지 : {data.message}</p>
            </MessageListContainer >
          ))
        }
      </>
    )
  }

  return (
    <>
      <h3>로그인하면 쪽지를 보실 수 있어요!</h3>
      <Link to="/login">로그인하기</Link>
    </>
  )
}

const MessageListContainer = styled.div`
  cursor: pointer;
  width: 350px;
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

export default MobileMessageList;