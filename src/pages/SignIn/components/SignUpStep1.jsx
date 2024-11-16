import { useState } from "react";
import { Button, InputAdornment } from "@mui/material";
import { styled as muiStyled } from '@mui/material/styles';
import { Container, SignUpTextField } from "../SignUp";
import useDuplicateIdCheck from "../../../services/useDuplicateIdCheck";

const SignUpStep1 = ({ email, setEmail, password, setPassword, emailError, setEmailError, passwordError, setPasswordError, checkPassword, setCheckPassword, checkPasswordError, setCheckPasswordError }) => {
  const [idDuplicateCheck, setIdDuplicateCheck] = useState(false);

  // Error Messages
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  //아이디 중복 체크 훅
  const idCheck = useDuplicateIdCheck();

  const validatePassword = (password) => {
    const minLength = /^.{8,16}$/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      minLength.test(password) &&
      hasUppercase.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const idCheckHandle = async (e) => {
    e.preventDefault();
    await idCheck(email, setEmailError, setEmailErrorMessage);
    setIdDuplicateCheck(true);
  };

  return (
    <Container>
      <SignUpTextField
        type='email'
        value={email}
        label='학교 이메일'
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
          setEmailErrorMessage("");
        }}
        onBlur={() => {
          if (!email) {
            setEmailError(true);
            setEmailErrorMessage("아이디를 입력해주세요.");
          }
          else if (!idDuplicateCheck) {
            setEmailError(true);
            setEmailErrorMessage("중복체크를 눌러주세요.");
          }
          else setEmailError(false);
        }}
        error={emailError}
        helperText={emailErrorMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CheckIdButton onClick={idCheckHandle}>중복 체크</CheckIdButton>
            </InputAdornment>
          ),
        }}
      />
      <SignUpTextField
        type="password"
        label='비밀번호'
        variant='outlined'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(!validatePassword(e.target.value));
          setPasswordErrorMessage(validatePassword(e.target.value) ? "" : "최소 하나의 특수문자와 대문자를 포함한 8~16자여야 합니다.");
        }}
        onBlur={() => {
          if (!password || !validatePassword(password)) {
            setPasswordError(true);
            setPasswordErrorMessage("비밀번호는 최소 하나의 특수문자와 대문자를 포함해야 합니다.");
          }
          else setPasswordError(false);
        }}
        error={passwordError}
        helperText={passwordErrorMessage}
      />
      <SignUpTextField
        type="password"
        label='비밀번호 확인'
        variant='outlined'
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value);
          e.target.value === password ? setCheckPasswordError(false) : setCheckPasswordError(true);
        }}
        onBlur={() => {
          if (!checkPassword || password !== checkPassword) {
            setCheckPasswordError(true);
          }
        }}
        error={checkPasswordError}
        helperText={checkPasswordError ? "비밀번호가 일치하지 않습니다" : ""}
      />
    </Container>
  )
}

const CheckIdButton = muiStyled(Button)`
  && {
    color: white;
    background-color: #ff9800;
    padding: 8px 16px;
    font-size: 15px;
    margin-left: 8px;
    white-space: nowrap;
    max-width: 75px;
  }
`;

export default SignUpStep1;