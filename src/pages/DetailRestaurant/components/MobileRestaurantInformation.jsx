import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import useLikeService from "../../../services/useLike";
import useGetLikeInformation from "../../../services/useGetLikeInformation";
import useGetDetailRestaurant from "../../../services/useGetDetailRestaurant";
import OrangeBorderBox from "../../../components/OrangeBorderBox";
import { useNavigate } from "react-router-dom";
import OrangeBorderButton from "../../../components/OrangeBorderButton";
import OrangeFilledButton from "../../../components/OrangeFilledButton";

const MobileRestaurantInformation = ({ restaurantId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const { detailOfRestaurant, getDetailRestaurant } = useGetDetailRestaurant();
  const { isLiked, setIsLiked, getLikeInformation } = useGetLikeInformation();
  const likeService = useLikeService();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const getData = async () => {
      await getDetailRestaurant(restaurantId);
      if (isAuthenticated) {
        await getLikeInformation(restaurantId);
      }
    };
    getData();
  }, [getDetailRestaurant, getLikeInformation, restaurantId, isAuthenticated]);

  const handleLikeService = async () => {
    if (isAuthenticated) {
      setIsLiked((prevLike) => !prevLike);
      await likeService(isLiked, restaurantId);
      getDetailRestaurant(restaurantId);
    } else {
      setShowPopup(true); // 팝업 표시
    }
  };

  useEffect(() => {
    if (detailOfRestaurant) {
      const currentTime = new Date();
      const currentFormattedTime = new Date(
        `1970-01-01T${currentTime.getHours()}:${currentTime.getMinutes()}:00`
      );
      const openAt = new Date(`1970-01-01T${detailOfRestaurant.openAt}:00`);
      const closeAt = new Date(`1970-01-01T${detailOfRestaurant.closeAt}:00`);
      if (currentFormattedTime >= openAt && currentFormattedTime <= closeAt) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [detailOfRestaurant]);

  return (
    <>
      <RestaurantInformationContainer>
        <img
          src={detailOfRestaurant?.restaurantImageUrl}
          alt="식당사진"
          style={{ width: 300, height: 300, margin: 20, borderRadius: 10 }}
        />
        <RestaurantInformationText>
          <RestaurantTitle>{detailOfRestaurant?.restaurantName}</RestaurantTitle>
          <RestaurantContent>
            전화번호 : {detailOfRestaurant?.restaurantTelNum}
          </RestaurantContent>
          <RestaurantContent>
            주소 : {detailOfRestaurant?.location}
          </RestaurantContent>
          <RestaurantContent>
            {isOpen ? "영업 중" : "영업 종료"}
          </RestaurantContent>
          <RestaurantContent>
            영업 시간 : {detailOfRestaurant?.openAt} ~ {detailOfRestaurant?.closeAt}
          </RestaurantContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              style={{
                width: 30,
                height: 30,
                outline: "none",
                boxShadow: "none",
                marginTop: 5,
              }}
              onClick={() => handleLikeService()}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <p style={{ marginBottom: 10 }}>{detailOfRestaurant.likeCount}</p>
          </div>
        </RestaurantInformationText>
      </RestaurantInformationContainer>
      {showPopup && <Popup setShowPopup={setShowPopup} />}
    </>
  );
};

const Popup = ({ setShowPopup }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false); // 팝업 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup]);

  return (
    <PopupOverlay>
      <PopupContainer ref={popupRef}>
        <p>로그인 후 사용 가능합니다. 로그인 하시겠어요?</p>
        <ButtonContainer>
          <OrangeBorderButton onClick={() => setShowPopup(false)}>아니오</OrangeBorderButton>
          <OrangeFilledButton onClick={() => navigate('/login')}>예</OrangeFilledButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

const RestaurantInformationContainer = styled(OrangeBorderBox)`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: auto;
  border-radius: 10px;
  margin: 20px;
`;

const RestaurantInformationText = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-left: 20px;
`;

const RestaurantTitle = styled.h1`
  margin: 5px 0px;
`;

const RestaurantContent = styled.h3`
  margin: 5px 0px;
  font-weight: lighter;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

export default MobileRestaurantInformation;