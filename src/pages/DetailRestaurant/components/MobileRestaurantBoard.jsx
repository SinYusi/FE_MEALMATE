import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import AddBoardPopup from "./AddBoardPopup";
import { useSelector } from "react-redux";
import noneImg from "../../../assets/noneImg.png"
import useGetRestaurantBoardList from "../../../services/useGetRestaurantBoardList";
import BoardCard from "../../../components/BoardCard";
import OrangeFilledButton from "../../../components/OrangeFilledButton";

const MobileRestaurantBoard = ({ restaurantId }) => {
  const { restaurantBoardList, getRestaurantBoardList } = useGetRestaurantBoardList();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isClickedAddBoardBtn, setIsClickedAddBoardBtn] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && !restaurantBoardList.last) {
        await getRestaurantBoardList(restaurantId, page, 10, setLoading);
        setPage(prevPage => prevPage + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [page, loading, restaurantBoardList.last, getRestaurantBoardList, restaurantId])

  useEffect(() => {
    const getData = async () => {
      if (page === 0) {
        await getRestaurantBoardList(restaurantId, 0, 10, setLoading);
        setPage(prevPage => prevPage + 1);
      }
    }

    getData();
  }, [getRestaurantBoardList, restaurantId, page])

  const onClose = (shouldReload = false) => {
    setIsClickedAddBoardBtn(false);
    if (shouldReload) {
      setPage(0);
    }
  }

  return (
    <BoardContainer>
      {
        isClickedAddBoardBtn && <AddBoardPopup onClose={onClose} restaurantId={restaurantId} />
      }

      <div style={{ width: "80%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New MealMate</h1>
        {
          isAuthenticated && <OrangeFilledButton onClick={() => setIsClickedAddBoardBtn(true)}>글쓰기</OrangeFilledButton>
        }
      </div>
      {
        restaurantBoardList.content?.length ?
          restaurantBoardList.content.map((data, i) => {
            return (<BoardCard data={data} key={data.boardId} ref={i === restaurantBoardList.content.length - 1 ? lastItemRef : null} />)
          })
          :
          <>
            <img src={noneImg} style={{ width: "50%" }} alt="오류 사진" />
            <p>해당 식당에 게시물이 없습니다.</p>
          </>
      }
      {loading && <p>Loading...</p>}
    </BoardContainer>
  )
}

const BoardContainer = styled.div`
  width: 350px;
  margin-top: 10px;
  padding: 10px 0px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ff9800;
  border-radius: 10px;
`;

export default MobileRestaurantBoard;