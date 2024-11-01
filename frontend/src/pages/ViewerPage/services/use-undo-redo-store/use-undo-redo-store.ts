import { useReducer } from "react";
import { ControlCallbacks } from "../../types";
import { initialState, reducer } from "../reducer/reducer";

export const useUndoRedoStore = () => {
  const [{ now, past, future }, dispatch] = useReducer(reducer, initialState);

  const actions: Record<keyof ControlCallbacks, () => void> = {
    onFlipHorizontal: () => dispatch({ type: "flipHorizontal" }),
    onFlipVertical: () => dispatch({ type: "flipVertical" }),
    onRotateLeft: () => dispatch({ type: "rotateLeft" }),
    onRotateRight: () => dispatch({ type: "rotateRight" }),
    onZoomIn: () => dispatch({ type: "zoomIn" }),
    onZoomOut: () => dispatch({ type: "zoomOut" }),
    onReset: () => dispatch({ type: "reset" }),
    onUndo: () => dispatch({ type: "undo" }),
    onRedo: () => dispatch({ type: "redo" }),
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
