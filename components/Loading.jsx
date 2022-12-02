import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);

  }
`;

const Span = styled.span`
  display: block;
  width: ${(props) => (props.size || "20") + "px"};
  height: ${(props) => (props.size || "20") + "px"};
  background-color: transparent;
  border-style: solid;
  border-color: ${(props) => props.borderColor || "#000"};
  border-width: ${(props) => props.borderWidth || "2px"};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${animation} ${(props) => (props.duration || "1") + "s"} infinite
    linear;
`;

function Loading(props) {
  return <Span {...props}></Span>;
}
export default Loading;
