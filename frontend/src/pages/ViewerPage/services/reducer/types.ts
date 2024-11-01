type ActionType =
  | "undo"
  | "redo"
  | "flipHorizontal"
  | "flipVertical"
  | "rotateLeft"
  | "rotateRight"
  | "zoomIn"
  | "zoomOut"
  | "reset";

export type Action = { type: ActionType };

export type State = {
  rotation: number;
  scale: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
};

export type UndoRedoState = {
  past: State[];
  now: State;
  future: State[];
};
