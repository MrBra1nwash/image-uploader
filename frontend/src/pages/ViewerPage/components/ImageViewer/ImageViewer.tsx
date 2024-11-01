import { useEffect, useRef } from "react";
import { BACK_END_URL } from "../../../../constants";
import { useIsMobile } from "../../../../services";
import { useUndoRedoStore } from "../../services/use-undo-redo-store/use-undo-redo-store";
import { Controls } from "../Controls/Controls";
import { MobileControls } from "../MobileControls/MobileControls";
import {
  Canvas,
  CanvasContainer,
  Container,
  ControlsContainer,
} from "./styles";

type Props = {
  imageUrl: string;
};

export const ImageViewer = ({ imageUrl }: Props) => {
  const {
    state: { flipHorizontal, flipVertical, rotation, scale },
    actions,
    isRedoDisabled,
    isUndoDisabled,
  } = useUndoRedoStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
            {...actions}
            {...{ isRedoDisabled, isUndoDisabled }}
          />
        )}
        {!isMobile && (
          <Controls
            {...actions}
            {...{ scale, isRedoDisabled, isUndoDisabled }}
          />
        )}
      </ControlsContainer>
    </Container>
  );
};
