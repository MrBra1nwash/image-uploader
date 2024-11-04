import { RefObject, useEffect, MouseEvent } from "react";
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
};

export const useHandleDrawing = ({
  canvasRef,
  drawingCanvasRef,
  lines,
  enabledDrawMode,
  imageUrl,
  onDrawLine,
  onStartLine,
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

    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    lines.forEach((line) => {
      ctx.strokeStyle = line.color;
      ctx.beginPath();
      line.points.forEach(({ x, y }, index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }, [drawingCanvasRef, lines]);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!enabledDrawMode || !canvasDrawing) return;

    const rect = canvasDrawing.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    onStartLine(point);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!enabledDrawMode || !canvasDrawing || event.buttons !== 1) return;

    const rect = canvasDrawing.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    onDrawLine(point);
  };

  return {
    handleMouseDown,
    handleMouseMove,
  };
};
