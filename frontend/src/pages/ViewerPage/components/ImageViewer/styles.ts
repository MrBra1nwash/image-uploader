import styled from "styled-components";

export const Container = styled.div`
  background-color: #f4f4f5;
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  right: 300px;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: auto;
`;

export const ControlsContainer = styled.div`
  width: 300px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #262729;
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
