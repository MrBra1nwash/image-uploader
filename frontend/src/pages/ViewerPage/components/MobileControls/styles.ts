import styled from "styled-components";

export const RowControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MobileControlsContainer = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 100%;
  box-sizing: border-box;
`;

export const ControlItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  gap: 3px;
  width: 72px;
`;

export const ControlIconWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

export const ControlTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  color: #bec0c8;
  margin-top: 8px;
  font-size: 12px;
`;
