import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useState } from "react";
import { Container, SignUpTextField } from "../MobileSignUp";

const MobileSignUpStep2 = ({ nickName, setNickName, department, setDepartment, studentNumber, setStudentNumber, userCategory, setUserCategory, nickNameError, setNickNameError, departmentError, setDepartmentError, studentNumberError, setStudentNumberError, }) => {
  const [selectCollege, setSelectCollege] = useState("");
  const categoryName = ['보쌈', '일식', '고기', '피자', '찌개', '양식', '중식', '치킨', '집밥', '버거', '분식', '카페', '아시안'];
  const college = ['의과대학', '자연과학대학', '인문사회과학대학', '글로벌경영대학', '공과대학', 'SW융합대학', '의료과학대학', 'SCH미디어랩스', '창의라이프대학'];

  const customStyles = {
    borderColor: orange[800],
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff9800',
      },
      '&:hover fieldset': {
        borderColor: '#ff9800',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff9800',
      },
    },
    '& .MuiSelect-icon': {
      color: '#ff9800',
    },
  };

  return (
    <Container>
      <SignUpTextField
        type="text"
        value={nickName}
        label="닉네임"
        error={nickNameError}
        helperText={nickNameError ? "닉네임을 입력해주세요." : ""}
        onChange={(e) => {
          setNickName(e.target.value);
          setNickNameError(false);
        }}
        onBlur={() => {
          if (!nickName) {
            setNickNameError(true);
          }
        }}
        autoFocus
      />
      <SignUpTextField
        type="text"
        value="순천향대학교"
        label="학교"
        disabled
      />
      <FormControl style={{ marginTop: 20, width: 350, minWidth: 80, marginBottom: 20 }} sx={customStyles}>
        <InputLabel id="college-select-label" sx={{ color: "#ff9800" }}>단과대</InputLabel>
        <Select
          labelId="college-select-label"
          value={selectCollege}
          onChange={(e) => setSelectCollege(e.target.value)}
          label="단과대"
        >
          <MenuItem value="">단과대를 선택해주세요</MenuItem>
          {college.map(data => (
            <MenuItem key={data} value={data} sx={{ color: 'black' }}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Department selectCollege={selectCollege} department={department} setDepartment={setDepartment} />
      <SignUpTextField
        type="number"
        label="학번"
        value={studentNumber}
        InputProps={{ inputProps: { min: 0, max: 99 } }}
        error={studentNumberError}
        helperText={studentNumberError ? "학번을 입력해주세요." : ""}
        onChange={(e) => {
          if (e.target.value > 99) setStudentNumber(99);
          else if (e.target.value < 0) setStudentNumber(0);
          else setStudentNumber(e.target.value);
          setStudentNumberError(false);
        }}
        onBlur={() => {
          if (!studentNumber) {
            setStudentNumberError(true);
          }
        }}
      />
      <p style={{ margin: '10px 0px 0px 0px' }}>최소 한 개의 카테고리를 선택해주세요.</p>
      <FormGroup style={{ width: '350px', display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '10px' }}>
        {categoryName.map((data) => (
          <FormControlLabel
            key={data}
            control={<Checkbox
              sx={{ color: orange[800], '&.Mui-checked': { color: orange[600], }, }}
              onChange={(e) => {
                if (e.target.checked) {
                  setUserCategory([...userCategory, data]);
                } else {
                  setUserCategory(userCategory.filter(category => category !== data));
                }
              }}
            />}
            label={data}
          />
        ))}
      </FormGroup>
    </Container>
  );
}

const Department = ({ selectCollege, department, setDepartment }) => {
  const departments = {
    "의과대학": ['의예과', '의학과', '간호학과', '기초의학교실', '인문사회의학교실'],
    "자연과학대학": ['화학과', '식품영양학과', '환경보건학과', '생명과학과', '스포츠과학과', '사회체육학과', '스포츠의학과'],
    "인문사회과학대학": ['유아교육과', '특수교육과', '청소년교육상담학과', '법학과', '행정학과', '경찰행정학과', '사회복지학과'],
    "글로벌경영대학": ['경영학과', '국제통상학과', '관광경영학과', '경제금융학과', 'IT금융경영학과', '글로벌문화산업학과', '회계학과', 'GBS'],
    "공과대학": ['컴퓨터공학과', '정보통신공학과', '전자공학과', '전기공학과', '전자정보공학과', '나노화학공학과', '에너지환경공학과', '디스플레이신소재공학과', '기계공학과'],
    "SW융합대학": ['컴퓨터소프트웨어공학과', '정보보호학과', '의료IT공학과', 'AI빅데이터학과', '사물인터넷학과', '메타버스&게임학과'],
    "의료과학대학": ['보건행정경영학과', '의료생명공학과', '임상병리학과', '작업치료학과', '의약공학과', '의공학과'],
    "SCH미디어랩스": ['한국문화콘텐츠학과', '영미학과', '중국학과', '미디어커뮤니케이션학과', '건축학과', '디지털애니메이션학과', '스마트자동차학과', '에너지공학과', '공연영상학과', '탄소중립학과', '의생명융합학부헬스케어융합전공', '의생명융합학부바이오의약전공', 'SCH미디어랩스'],
    "창의라이프대학": ['스마트팩토리공학과', '스마트모빌리티공학과', '융합바이오화학공학과', '산업경영공학과', '세무회계학과', '자동차산업공학과', '융합기계학과', '신뢰성품질공학과', '화학공학과', '메카트로닉스공학과']
  };

  const isCollegeSelected = !!selectCollege && departments[selectCollege];

  const customStyles = {
    borderColor: orange[800],
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff9800',
      },
      '&:hover fieldset': {
        borderColor: '#ff9800',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff9800',
      },
    },
    '& .MuiSelect-icon': {
      color: '#ff9800',
    },
  };

  return (
    <FormControl style={{ marginTop: 20, width: 350, minWidth: 80, marginBottom: 20 }} sx={customStyles} disabled={!isCollegeSelected}>
      <InputLabel id="department-select-label" sx={{ color: "#ff9800" }}>학과</InputLabel>
      <Select labelId="department-select-label" value={department} onChange={(e) => setDepartment(e.target.value)} label="학과">
        {isCollegeSelected ? (
          departments[selectCollege].map(data => (
            <MenuItem key={data} value={data} sx={{ color: 'black' }}>
              {data}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">단과대를 먼저 선택해주세요</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default MobileSignUpStep2;