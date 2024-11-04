import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectedColor = styled.div<{
  color: string;
  size: "regular" | "small";
}>`
  background-color: ${({ color }) => color};
  width: ${({ size }) => (size === "regular" ? 30 : 16)}px;
  height: ${({ size }) => (size === "regular" ? 30 : 16)}px;
  cursor: pointer;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const Tooltip = styled.div<{ top: number; left: number }>`
  position: fixed;
  z-index: 1000;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  width: 155px;
`;

export const TooltipArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
`;

export const ColorOption = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 25px;
  height: 25px;
  margin: 2px;
  cursor: pointer;
  border: 1px solid #ccc;
  display: inline-block;
`;
