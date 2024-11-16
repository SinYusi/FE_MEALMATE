import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import calculateTimeAgo from "../utils/calculateTimeAgo";

const BoardCard = forwardRef(({ data, style }, ref) => {
  const navigate = useNavigate();

  return (
    <BoardCardContainer style={style} onClick={() => navigate(`/board/${data.boardId}`)} ref={ref}>
      <InformationText>{data.nickname} · {data.department} · {calculateTimeAgo(data.lastTime)} 전</InformationText>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title>{data.title}</Title>
        {
          data.isRecruitment ?
            <InformationText style={{ marginLeft: 5, color: "orange" }}>모집 중</InformationText>
            :
            <InformationText style={{ marginLeft: 5 }}>모집 완료</InformationText>
        }
      </div>
      <Content>{data.content}</Content>
    </BoardCardContainer>
  )
});


const BoardCardContainer = styled.div`
  cursor: pointer;
  width: 85%;
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

const InformationText = styled.p`
  font-size: 15px;
  color: #afafb2;
  margin: 0px;
`

const Title = styled.h3`
  margin: 5px 0px;
`

const Content = styled.p`
  color: #666a73;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0px;
`

export default BoardCard;