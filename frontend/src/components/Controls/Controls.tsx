import React from "react";

type Props = {
  onRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const Controls = ({ onRotate, onZoomIn, onZoomOut, onReset }: Props) => {
  return (
    <div>
      <button onClick={onRotate}>Rotate</button>
      <button onClick={onZoomIn}>Zoom In</button>
      <button onClick={onZoomOut}>Zoom Out</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
