import styled from "styled-components";

export const ToggleContainer = styled.div<{ enabled: boolean }>`
  width: 60px;
  height: 20px;
  border-radius: 50px;
  background-color: ${({ enabled }) => (enabled ? "#4CAF50" : "#F44336")};
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
`;

export const ToggleCircle = styled.div<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: ${({ enabled }) =>
    enabled ? "translateX(30px)" : "translateX(0)"};
`;

export const Icon = styled.div`
  font-size: 14px;
  color: #fff;
  position: absolute;
`;

export const EnabledIconContainer = styled(Icon)`
  left: 8px;
`;

export const DisabledIconContainer = styled(Icon)`
  right: 8px;
`;
