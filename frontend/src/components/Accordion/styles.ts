import styled, { css } from "styled-components";

const openChildrenContainer = css`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const openRow = css`
  background-color: rgba(255, 255, 255, 0.04);
`;

export const ChildrenContainer = styled.div<{
  isOpen: boolean;
  maxHeight: string;
}>`
  overflow: hidden;
  transition: max-height 0.1s linear;
  max-height: ${({ maxHeight }) => maxHeight};
  padding-left: 10px;
  ${({ isOpen }) => isOpen && openChildrenContainer}
`;

export const ArrowContainer = styled.span<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? 90 : 0)}deg);
  transition: transform 0.2s linear;
`;

export const TitleRow = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  justify-content: space-between;
  transition: background-color 0.2s linear;
  ${({ isOpen }) => isOpen && openRow}

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;
