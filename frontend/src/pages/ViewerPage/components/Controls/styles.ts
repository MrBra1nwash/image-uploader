import styled from "styled-components";

export const RowControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ControlsContainer = styled.div`
  padding: 20px;
`;

export const ZoomValue = styled.div`
  color: #bec0c8;
  font-size: 16px;
`;

export const ControlIconWrapper = styled.button`
  display: flex;
  align-items: center;
  align-self: baseline;
  justify-content: center;
  height: 30px;
  min-width: 40px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.04);
  outline: none;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const ResetButton = styled.button`
  width: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  color: white;
  font-size: 16px;
  color: #bec0c8;
  background-color: rgba(255, 255, 255, 0.04);

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const ScaleTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
`;
