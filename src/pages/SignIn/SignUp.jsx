import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { styled as muiStyled } from '@mui/material/styles';
import { useState } from "react";
import SignUpStep1 from "./components/SignUpStep1";
import SignUpStep2 from "./components/SignUpStep2";
import Logo from "../../components/Logo";
import useSignUp from "../../services/useSignUp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [nickName, setNickName] = useState("");
  const [department, setDepartment] = useState("");
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const [studentNumber, setStudentNumber] = useState(currentYear);
  const school = "순천향대학교"

  // Error states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [studentNumberError, setStudentNumberError] = useState(false);

  //step1을 패스했는지 관리하는 상태 변수
  const [isPassedStep1, setIsPassedStep1] = useState(false);

  const signupService = useSignUp();

  const signUpSubmit = async (e) => {
    e.preventDefault();
    if (!isPassedStep1) {
      if (!isDisabledStep1)
        setIsPassedStep1(true);
    }
    else {
      if (!isDisabledStep2) {
        signupService(email, password, nickName, school, studentNumber, department, userCategory);
      }
    }
  };

  // 버튼이 비활성화 되는지에 대한 논리적 상태
  const isDisabledStep1 = !(email && !emailError && password && !passwordError && checkPassword && !checkPasswordError);
  const isDisabledStep2 = !(nickName && !nickNameError && department && !departmentError && studentNumber && !studentNumberError && userCategory.length)

  return (
    <SignUpContainer onSubmit={signUpSubmit}>
      <Logo style={{margin: 20}}/>
      {
        !isPassedStep1 ?
          <SignUpStep1
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            emailError={emailError}
            setEmailError={setEmailError}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            checkPasswordError={checkPasswordError}
            setCheckPasswordError={setCheckPasswordError}
          />
          :
          <SignUpStep2
            nickName={nickName}
            setNickName={setNickName}
            department={department}
            setDepartment={setDepartment}
            studentNumber={studentNumber}
            setStudentNumber={setStudentNumber}
            userCategory={userCategory}
            setUserCategory={setUserCategory}
            nickNameError={nickNameError}
            setNickNameError={setNickNameError}
            departmentError={departmentError} setDepartmentError={setDepartmentError}
            studentNumberError={studentNumberError}
            setStudentNumberError={setStudentNumberError}
          />
      }
      <SignUpBtnBox>
        {
          !isPassedStep1 ? <SignUpBtn type="submit" disabled={isDisabledStep1}>다음</SignUpBtn> : <SignUpBtn type="submit" disabled={isDisabledStep2}>가입하기</SignUpBtn>
        }
      </SignUpBtnBox>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 710px;
  margin-top: 60px;
`;

const SignUpBtnBox = styled.div`
  width: 300px;
  height: auto;
  bottom: 0;
  display: flex;
  justify-content: center;
  background: white;
`

const SignUpBtn = muiStyled(Button)`
  && {
    color: white;
    width: 100%;
    height: 50px;
    min-width: 80px;
    white-space: nowrap;
    background-color: #ff9800;
    margin: 10px 0px;
    @media (max-width: 576px) {
      font-size: 12px;
      min-width: 60px;
    }
    &:disabled {
      background-color: #bdbdbd; /* 회색 배경색 */
      color: #ffffff; /* 텍스트 색상 */
    }
  }
`;

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 360px;
height: auto;
`;

export const SignUpTextField = styled(TextField)`
  &&{
    margin-top: 20px;
    min-height: 80px;
    width: 320px;
  }

  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #ff9800;
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #ff9800;
  }
`;

export default Signup;
