import Link from "next/link";
import styled from "styled-components";

const MessageWrapper = styled.div`
  background-color: #eee;
  border-top: 3px solid ${(props) => props.color};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  a {
    color: #055250;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    background-color: rgb(218, 218, 218);
    border-radius: 5px;
    padding: 5px 10px;
    transition: 0.3s;
    &:hover {
      background-color: transparent;
    }
  }
`;

function Message({ icon, text, button, color = "#1e85be" }) {
  return (
    <MessageWrapper color={color}>
      <div className="wrapper">
        {icon}
        {text}
      </div>
      {button ? <Link href={button.href}>{button.text}</Link> : null}
    </MessageWrapper>
  );
}

export default Message;
