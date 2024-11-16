import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MypageTable = ({ myInformation, userCategory }) => {
  const navigate = useNavigate();
  return (
    <>
      <TableContainer>
        <TableRow>
          <TableHead>이메일</TableHead>
          <TableContent>
            <p style={{ margin: "3px 5px" }}>{myInformation.email}</p>
          </TableContent>
        </TableRow>
        <TableRow>
          <TableHead>비밀번호</TableHead>
          <TableContent><Button style={{ marginLeft: 5, padding: 0 }} onClick={() => navigate('/changepassword', { state: { userCategory } })}>변경하기</Button></TableContent>
        </TableRow>
        <TableRow>
          <TableHead>닉네임</TableHead>
          <TableContent>
            <p style={{ margin: "3px 5px" }}>{myInformation.nickname}</p>
          </TableContent>
        </TableRow>
        <TableRow>
          <TableHead>학교</TableHead>
          <TableContent>
            <p style={{ margin: "3px 5px" }}>{myInformation.school}</p>
          </TableContent>
        </TableRow>
        <TableRow>
          <TableHead>학과</TableHead>
          <TableContent>
            <p style={{ margin: "3px 5px" }}>{myInformation.department}</p>
          </TableContent>
        </TableRow>
        <TableRow>
          <TableHead>학번</TableHead>
          <TableContent>
            <p style={{ margin: "3px 5px" }}>{myInformation.studentNumber + "학번"}</p>
          </TableContent>
        </TableRow>
      </TableContainer>
    </>
  )
}

const TableContainer = styled.table`
  border: 1px solid #bfbf92;
  border-top: 2px solid #ff9800;
  border-collapse: collapse;
  width: 400px;
`

const TableRow = styled.tr`
  border-bottom: 2px solid #c0c0c0;
`

const TableHead = styled.th`
  font-weight: 800;
  text-align: center;
  font-size: 1.25em;
  background: #dcdcdc;
`

const TableContent = styled.td`
  padding: .75em 0;
  width: 270px;
`

export default MypageTable;