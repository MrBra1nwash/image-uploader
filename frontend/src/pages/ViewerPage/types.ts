export type ControlCallbacks = {
  onUndo: () => void;
  onRedo: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleDrawingMode: () => void;
  onSetColor: (color: string) => void;
};
