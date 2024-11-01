import { useEffect, useRef, useState } from "react";
import { BACK_END_URL } from "../../../../constants";
import { Controls } from "../Controls/Controls";
import {
  Canvas,
  CanvasContainer,
  Container,
  ControlsContainer,
} from "./styles";
import { useIsMobile } from "../../../../services";
import { MobileControls } from "../MobileControls/MobileControls";

type Props = {
  imageUrl: string;
};

export const ImageViewer = ({ imageUrl }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const isMobile = useIsMobile();

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

  const handleFlipHorizontal = () => {
    setFlipHorizontal((prevFlip) => !prevFlip);
  };

  const handleFlipVertical = () => {
    setFlipVertical((prevFlip) => !prevFlip);
  };

  const handleRotateLeft = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => (prevRotation - 90) % 360);
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
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  return (
    <Container>
      <CanvasContainer isMobile={isMobile}>
        <Canvas
          ref={canvasRef}
          {...{ rotation, scale, flipHorizontal, flipVertical }}
        />
      </CanvasContainer>
      <ControlsContainer isMobile={isMobile}>
        {isMobile && (
          <MobileControls
            onReset={handleReset}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        )}
        {!isMobile && (
          <Controls
            scale={scale}
            onFlipHorizontal={handleFlipHorizontal}
            onFlipVertical={handleFlipVertical}
            onReset={handleReset}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        )}
      </ControlsContainer>
    </Container>
  );
};
