import styled from "styled-components";

export const BannerContainer = styled.div<{ show: boolean }>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.show ? "20px" : "-1000px")};
  width: 300px;
  min-height: 80px;
  left: calc(50% - 150px);
  background-color: #fdd;
  box-sizing: border-box;
  color: #a00;
  padding: 20px 25px;
  line-height: 22px;
  border: 1px solid #faa;
  border-radius: 6px;
  transition: top 0.5s ease-in-out;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;
