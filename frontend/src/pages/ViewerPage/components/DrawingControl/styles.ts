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

export const ControlIconWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  align-self: baseline;
  justify-content: center;
  height: 40px;
  min-width: 40px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: rgba(
    255,
    255,
    255,
    ${({ disabled }) => (disabled ? "0.01" : "0.04")}
  );
  outline: none;
  border: none;
  border-radius: 4px;

  ${({ disabled }) =>
    !disabled &&
    `&:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }`}
`;

export const ResetButton = styled.div`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  margin-top: 10px;
  color: white;
  font-size: 16px;
  color: #bec0c8;
  text-align: center;
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
