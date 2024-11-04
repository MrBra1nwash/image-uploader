import { useRef } from "react";
import { useIsMobile } from "../../../../services";
import {
  useHandleDrawing,
  useHandleHotKeys,
  useUndoRedoStore,
} from "../../services";
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
    state: {
      flipHorizontal,
      flipVertical,
      rotation,
      scale,
      enabledDrawMode,
      lines,
      color,
    },
    actions: {
      onDrawLine,
      onStartLine,
      onResetTransformations,
      ...controlsActions
    },
    isRedoDisabled,
    isUndoDisabled,
  } = useUndoRedoStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const {
    handleMouseDown,
    handleMouseMove,
    handleTouchMove,
    handleTouchStart,
  } = useHandleDrawing({
    canvasRef,
    drawingCanvasRef,
    enabledDrawMode,
    lines,
    imageUrl,
    onDrawLine,
    onStartLine,
    onResetTransformations,
  });

  useHandleHotKeys({
    onUndo: controlsActions.onUndo,
    onRedo: controlsActions.onRedo,
    onCancelDrawMode: () =>
      enabledDrawMode && controlsActions.onToggleDrawingMode(),
  });

  return (
    <Container>
      <CanvasContainer isMobile={isMobile}>
        <Canvas
          {...{
            rotation,
            scale,
            flipHorizontal,
            flipVertical,
          }}
          ref={canvasRef}
        />
        <Canvas
          {...{
            rotation,
            scale,
            flipHorizontal,
            flipVertical,
          }}
          ref={drawingCanvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
      </CanvasContainer>
      <ControlsContainer isMobile={isMobile}>
        {isMobile && (
          <MobileControls
            {...controlsActions}
            {...{ isRedoDisabled, isUndoDisabled, color, enabledDrawMode }}
          />
        )}
        {!isMobile && (
          <Controls
            {...controlsActions}
            {...{
              scale,
              isRedoDisabled,
              isUndoDisabled,
              color,
              enabledDrawMode,
            }}
          />
        )}
      </ControlsContainer>
    </Container>
  );
};
