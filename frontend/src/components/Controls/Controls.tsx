import React from "react";
import { Button } from "../Button/Button";

type Props = {
  onRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const Controls = ({ onRotate, onZoomIn, onZoomOut, onReset }: Props) => {
  return (
    <div>
      <Button variant="secondary" onClick={onRotate}>
        Rotate
      </Button>
      <Button variant="secondary" onClick={onZoomIn}>
        Zoom In
      </Button>
      <Button variant="secondary" onClick={onZoomOut}>
        Zoom Out
      </Button>
      <Button variant="secondary" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};
