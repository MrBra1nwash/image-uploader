export type Action =
  | { type: "undo" }
  | { type: "redo" }
  | { type: "flipHorizontal" }
  | { type: "flipVertical" }
  | { type: "rotateLeft" }
  | { type: "rotateRight" }
  | { type: "zoomIn" }
  | { type: "zoomOut" }
  | { type: "reset" }
  | { type: "toggleDrawingMode" }
  | { type: "startLine"; payload: { point: Point } }
  | { type: "drawLine"; payload: { point: Point } }
  | { type: "setColor"; payload: { color: string } };

export type State = {
  rotation: number;
  scale: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  lines: Line[];
  color: string;
  enabledDrawMode: boolean;
};

export type UndoRedoState = {
  past: State[];
  now: State;
  future: State[];
};

export type Line = {
  points: Point[];
  color: string;
};

export type Point = {
  x: number;
  y: number;
};
