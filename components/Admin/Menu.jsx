import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
const Menu = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  opacity: 0;
  z-index: -1;
  transition: 0.3s;
  &.active {
    z-index: 25;
    opacity: 1;
    top: 50px;
  }
  header {
    padding: 10px 20px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f0f0f0;
    button {
      font-size: 23px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
  }
  .body {
    background-color: #fff;
    padding: 20px;
    border-radius: 0 0 5px 5px;
  }
`;

export default function MenuComponent({
  children,
  title,
  className,
  onClose = () => {},
}) {
  return (
    <Menu className={className}>
      <header>
        <h4>{title}</h4>
        <button type="button" onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <div className="body">{children}</div>
    </Menu>
  );
}
