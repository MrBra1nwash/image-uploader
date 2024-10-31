import styled, { css } from "styled-components";

const mobileControls = css`
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 80px;
`;

export const Container = styled.div`
  background-color: #f4f4f5;
  display: flex;
  flex-direction: column;
  background-color: #414243;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CanvasContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? "calc(100vh - 80px)" : "100vh")};
  overflow: auto;
  margin: 0;

  @media (min-width: 768px) {
    width: calc(100% - 300px);
    height: auto;
    max-height: 100vh;
  }
`;

export const ControlsContainer = styled.div<{ isMobile: boolean }>`
  width: 100%;
  height: auto;
  background-color: #262729;
  ${({ isMobile }) => isMobile && mobileControls}

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
  }
`;

export const Canvas = styled.canvas<{ rotation: number; scale: number }>`
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: rotate(${(props) => props.rotation}deg)
    scale(${(props) => props.scale});
  transform-origin: center center;
  max-width: 100%;
  max-height: 100%;
`;
