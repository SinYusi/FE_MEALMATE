import axios from "axios";

const useDuplicateIdCheck = () => {
  const duplicateIdCheck = async (email, setEmailError, setEmailErrorMessage) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("이메일을 먼저 입력해주세요.");
      return;
    } else {
      await axios.post(`${apiUrl}/member/check-email`, {
        email,
      }).then(() => {
        setEmailError(false);
        setEmailErrorMessage("사용 가능한 이메일입니다.");
      }).catch(error => {
        setEmailError(true);
        setEmailErrorMessage("이미 존재하는 이메일입니다.");
      });
    }
  }
  return duplicateIdCheck;
}

export default useDuplicateIdCheck;