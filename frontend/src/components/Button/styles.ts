import styled from "styled-components";
import { Props } from "./Button";

export const StyledButton = styled.button<Props>`
  background-color: ${({ variant }) =>
    variant === "primary" ? "#007bff" : "#fff"};
  color: ${({ variant }) =>
    variant === "primary"
      ? "#fff"
      : variant === "secondary"
      ? "#000"
      : "#007bff"};
  border: 1px solid
    ${(props) => (props.variant === "secondary" ? "#000" : "#007bff")};
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
