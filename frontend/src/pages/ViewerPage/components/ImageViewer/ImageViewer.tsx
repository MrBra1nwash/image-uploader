import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Controls } from "../Controls/Controls";
import { BACK_END_URL } from "../../../../constants";

type Props = {
  imageUrl: string;
};

const Canvas = styled.canvas<{ rotation: number; scale: number }>`
  transform: rotate(${(props) => props.rotation}deg)
    scale(${(props) => props.scale});
  transform-origin: center center;
`;

export const ImageViewer = ({ imageUrl }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();

    img.onload = () => {
      if (!canvas || !ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = `${BACK_END_URL}/images/${imageUrl}`;
  }, [imageUrl]);

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(0.1, prevScale - 0.1));
  };

  const handleReset = () => {
    setRotation(0);
    setScale(1);
  };

  return (
    <div>
      <Canvas ref={canvasRef} rotation={rotation} scale={scale} />
      <Controls
        onReset={handleReset}
        onRotate={handleRotate}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </div>
  );
};
