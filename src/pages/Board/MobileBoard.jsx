import { useEffect } from "react";
import styled from "styled-components";
import BoardCard from "../../components/BoardCard";
import useGetBoardList from "../../services/useGetBoardList";
import Logo from "../../components/Logo";

const MobileBoard = () => {
  const { boardList, getBoardList } = useGetBoardList();

  useEffect(() => {
    const getData = async () => {
      await getBoardList(0, 20);
    }

    getData();
  }, [getBoardList]);

  return (
    <BoardListContainer>
      <Logo style={{ margin: 20, width: 300 }} />
      {
        boardList.content?.map((data) => (
          <BoardCard key={data.boardId} data={data} />
        ))
      }
    </BoardListContainer>
  )
}

const BoardListContainer = styled.div`
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default MobileBoard;