import styled from 'styled-components';
import Logo from '../../components/Logo';
import MessageList from './conponents/MessageList';

const Message = () => {
  return (
    <MessagePageContainer>
      <Logo style={{ margin: 20 }} />
      <MessageList />
    </MessagePageContainer>
  )
}

const MessagePageContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Message;