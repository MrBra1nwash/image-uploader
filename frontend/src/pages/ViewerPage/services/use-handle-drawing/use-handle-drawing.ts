import { RefObject, useEffect, MouseEvent, TouchEvent } from "react";
import { Line, Point } from "../reducer/types";
import { BACK_END_URL } from "../../../../constants";

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  drawingCanvasRef: RefObject<HTMLCanvasElement>;
  lines: Line[];
  enabledDrawMode: boolean;
  imageUrl: string;
  onStartLine: (point: Point) => void;
  onDrawLine: (point: Point) => void;
  onResetTransformations: () => void;
};

export const useHandleDrawing = ({
  canvasRef,
  drawingCanvasRef,
  lines,
  enabledDrawMode,
  imageUrl,
  onDrawLine,
  onStartLine,
  onResetTransformations,
}: Props) => {
  const canvasDrawing = drawingCanvasRef.current;

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDrawing = drawingCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();

    img.onload = () => {
      if (!canvas || !ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      if (canvasDrawing) {
        canvasDrawing.width = img.width;
        canvasDrawing.height = img.height;
      }
    };

    img.src = `${BACK_END_URL}/images/${imageUrl}`;
  }, [canvasRef, drawingCanvasRef, imageUrl]);

  useEffect(() => {
    const drawCanvas = drawingCanvasRef.current;
    const ctx = drawCanvas?.getContext("2d");
    if (!drawCanvas || !ctx) return;

    const redrawLines = () => {
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      lines.forEach((line) => {
        ctx.strokeStyle = line.color;
        ctx.beginPath();
        line.points.forEach(({ x, y }, index) => {
          const absX = x * drawCanvas.width;
          const absY = y * drawCanvas.height;
          if (index === 0) {
            ctx.moveTo(absX, absY);
          } else {
            ctx.lineTo(absX, absY);
          }
        });
        ctx.stroke();
      });
    };

    redrawLines();

    const handleResize = () => {
      redrawLines();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawingCanvasRef, lines]);

  const handlePointerDown = (event: MouseEvent | TouchEvent) => {
    if (!enabledDrawMode || !canvasDrawing) return;

    // This line is an important simplification.
    // Otherwise we need to calculate positions of points based on current values of
    // scale, flip etc. It complicates code a lot I avoided it for simplicity.
    onResetTransformations();
    const rect = canvasDrawing.getBoundingClientRect();
    const point = {
      x:
        ("clientX" in event ? event.clientX : event.touches[0].clientX) -
        rect.left,
      y:
        ("clientY" in event ? event.clientY : event.touches[0].clientY) -
        rect.top,
    };

    // We need to store points relatively, because when image is resized - even on load image load
    // if we upload 5000x3000 image on FHD monitor image will be resized and points of drawings will be displaced
    onStartLine({
      x: point.x / rect.width,
      y: point.y / rect.height,
    });
  };

  const handlePointerMove = (event: MouseEvent | TouchEvent) => {
    if (
      !enabledDrawMode ||
      !canvasDrawing ||
      ("buttons" in event && event.buttons !== 1)
    )
      return;
    const rect = canvasDrawing.getBoundingClientRect();
    const point = {
      x:
        ("clientX" in event ? event.clientX : event.touches[0].clientX) -
        rect.left,
      y:
        ("clientY" in event ? event.clientY : event.touches[0].clientY) -
        rect.top,
    };

    onDrawLine({
      x: point.x / rect.width,
      y: point.y / rect.height,
    });
  };

  return {
    handleMouseDown: handlePointerDown,
    handleMouseMove: handlePointerMove,
    handleTouchStart: handlePointerDown,
    handleTouchMove: handlePointerMove,
  };
};
