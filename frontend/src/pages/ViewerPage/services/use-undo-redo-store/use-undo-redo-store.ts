import { useReducer } from "react";
import { initialState, Point, reducer } from "..";

// It serves a role of facade to make the components not aware of how we manage state
export const useUndoRedoStore = () => {
  const [{ now, past, future }, dispatch] = useReducer(reducer, initialState);

  const actions = {
    onFlipHorizontal: () => dispatch({ type: "flipHorizontal" }),
    onFlipVertical: () => dispatch({ type: "flipVertical" }),
    onRotateLeft: () => dispatch({ type: "rotateLeft" }),
    onRotateRight: () => dispatch({ type: "rotateRight" }),
    onZoomIn: () => dispatch({ type: "zoomIn" }),
    onZoomOut: () => dispatch({ type: "zoomOut" }),
    onReset: () => dispatch({ type: "reset" }),
    onUndo: () => dispatch({ type: "undo" }),
    onRedo: () => dispatch({ type: "redo" }),
    onToggleDrawingMode: () => dispatch({ type: "toggleDrawingMode" }),
    onSetColor: (color: string) =>
      dispatch({ type: "setColor", payload: { color } }),
    onStartLine: (point: Point) =>
      dispatch({ type: "startLine", payload: { point } }),
    onDrawLine: (point: Point) =>
      dispatch({ type: "drawLine", payload: { point } }),
  };

  const isUndoDisabled = past.length === 0;
  const isRedoDisabled = future.length === 0;

  return {
    actions,
    state: now,
    isUndoDisabled,
    isRedoDisabled,
  };
};
