import styled from 'styled-components';
import Logo from '../../components/Logo';
import MobileMessageList from './conponents/MobileMessageList';

const MobileMessage = () => {
  return (
    <MessagePageContainer>
      <Logo style={{ margin: 20 }} />
      <MobileMessageList />
    </MessagePageContainer>
  )
}

const MessagePageContainer = styled.div`
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MobileMessage;