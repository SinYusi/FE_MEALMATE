import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import useGetMessageList from "../../services/useGetMessageList";
import Divider from "../../components/Divider";
import Logo from "../../components/Logo";
import useSendMessage from "../../services/useSendMessage";

const DetailMessage = () => {
  const noteroomId = useParams().id;
  const { messageList, getMessageList } = useGetMessageList();
  const email = useSelector(state => state.auth.email)
  const [message, setMessage] = useState("");
  const sendMessage = useSendMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      getMessageList(noteroomId);
    }
    const intervalId = setInterval(getData, 500);
    return () => clearInterval(intervalId);
  }, [noteroomId, getMessageList])

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 9);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      setMessage("");
      await sendMessage(message, messageList[0].opponentId, noteroomId);
      getMessageList(noteroomId);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 60 }}>
      <Logo style={{ margin: 20, width: 300 }} onClick={() => navigate('/')} />
      <form style={{ display: "flex", width: 500, alignItems: "center", justifyContent: "space-between" }} onClick={handleSendMessage}>
        <SendMessageTextField placeholder="답장하기" onChange={(e) => setMessage(e.target.value)} value={message} />
        <IconButton type="submit" style={{ width: 40, height: 40 }}>
          <SendIcon style={{ width: 40, height: 40 }} />
        </IconButton>
      </form>
      {
        messageList?.map((data) => (
          <div>
            <Divider style={{ width: 500, margin: "10px 0px" }} />
            {
              email === data.email ?
                <p style={{ color: "#ff9800", margin: "5px 0px 5px 10px" }}>보낸 쪽지</p>
                :
                <p style={{ color: "blue", margin: "5px 0px 5px 10px" }}>받은 쪽지</p>
            }
            <h4 style={{ margin: "5px 0px 5px 10px" }}>{data.message}</h4>
            <InformationText>{formatDateTime(data.sendDt)}</InformationText>
          </div>
        ))
      }
    </div>
  )
}

const InformationText = styled.p`
  font-size: 15px;
  color: #afafb2;
  margin: 5px 0px 5px 10px;
`

const SendMessageTextField = styled(TextField)`
  &&{
    margin: 10px 0px;
    width: 440px;
  }

  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #ff9800;
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #ff9800;
  }
`;

export default DetailMessage;