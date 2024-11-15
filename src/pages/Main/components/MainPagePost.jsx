import { Link, useNavigate } from "react-router-dom";
import useGetBoardList from "../../../services/useGetBoardList";
import { useEffect } from "react";
import OrangeBorderBox from "../../../components/OrangeBorderBox";
import styled from "styled-components";
import Divider from "../../../components/Divider";
import calculateTimeAgo from "../../../utils/calculateTimeAgo";

const MainPagePost = () => {
  const { boardList, getBoardList } = useGetBoardList();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await getBoardList(0, 3);
    }
    getData();
  }, [getBoardList])

  return (
    <MainPagePostContainer>
      <TitleBox>
        <Title>최신 글</Title>
        <MoreBoardLink to="/board">더 보기</MoreBoardLink>
      </TitleBox>
      <Divider style={{ width: "90%" }} />
      {
        boardList.content?.map((data) => (
          <MainPagePostData key={data.boardId} onClick={() => navigate(`/board/${data.boardId}`)}>
            <Title>{data.title}</Title>
            <TimeAgo>
              {
                calculateTimeAgo(data.lastTime)
              } 전
            </TimeAgo>
          </MainPagePostData>
        ))
      }
    </MainPagePostContainer>
  )
}

const MainPagePostContainer = styled(OrangeBorderBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 220px;
  margin: 20px;
`

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin: 10px;
`

const Title = styled.p`
  margin: 0;
`

const MoreBoardLink = styled(Link)`
  color: #888;
  text-decoration: none;
`

const MainPagePostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  padding: 11px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.7s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BoardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TimeAgo = styled.div`
  font-size: 14px;
  color: #888;
`;

export default MainPagePost;