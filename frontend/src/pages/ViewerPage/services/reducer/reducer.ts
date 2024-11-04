import { State, UndoRedoState, Action } from "./types";

const getNewState = (payload: Partial<State>, now: State, past: State[]) => ({
  past: [...past, now],
  now: {
    ...now,
    ...payload,
  },
  future: [],
});

export const reducer = (
  state: UndoRedoState,
  action: Action
): UndoRedoState => {
  const { past, now, future } = state;

  switch (action.type) {
    case "undo": {
      if (past.length === 0) return state;

      return {
        past: past.slice(0, -1),
        now: past.at(-1) || initialState.now,
        future: [now, ...future],
      };
    }

    case "redo": {
      if (future.length === 0) return state;

      return {
        past: [...past, now],
        now: future[0],
        future: future.slice(1),
      };
    }

    case "flipHorizontal": {
      return getNewState({ flipHorizontal: !now.flipHorizontal }, now, past);
    }

    case "flipVertical": {
      return getNewState({ flipVertical: !now.flipVertical }, now, past);
    }

    case "rotateLeft": {
      return getNewState({ rotation: (now.rotation + 90) % 360 }, now, past);
    }

    case "rotateRight": {
      return getNewState({ rotation: (now.rotation - 90) % 360 }, now, past);
    }

    case "zoomIn": {
      return getNewState({ scale: now.scale + 0.1 }, now, past);
    }

    case "zoomOut": {
      return getNewState({ scale: Math.max(0.1, now.scale - 0.1) }, now, past);
    }

    case "toggleDrawingMode": {
      return {
        ...state,
        now: {
          ...now,
          enabledDrawMode: !now.enabledDrawMode,
        },
      };
    }

    case "startLine": {
      const newLine = {
        points: [{ x: action.payload.point.x, y: action.payload.point.y }],
        color: now.color,
      };

      return getNewState({ lines: [...now.lines, newLine] }, now, past);
    }

    case "drawLine": {
      // It is intentional to not use `getNewState` in `drawLine`.
      // Because with undo we want to undo the whole line. So we update `past` only in `startLine`.
      const lines = now.lines;

      if (lines.length === 0) return state;

      const updatedLines = lines.map((line, index) =>
        index === lines.length - 1
          ? {
              ...line,
              points: [
                ...line.points,
                { x: action.payload.point.x, y: action.payload.point.y },
              ],
            }
          : line
      );

      return {
        ...state,
        now: {
          ...now,
          lines: updatedLines,
        },
      };
    }

    case "setColor": {
      return {
        ...state,
        now: {
          ...now,
          color: action.payload.color,
        },
      };
    }

    case "reset": {
      return initialState;
    }

    case "resetTransformations": {
      const { flipHorizontal, flipVertical, rotation, scale } =
        initialState.now;
      const areTransformationsDefault =
        now.flipHorizontal === flipHorizontal &&
        now.flipVertical === flipVertical &&
        now.rotation === rotation &&
        now.scale === scale;

      if (areTransformationsDefault) {
        return state;
      }

      console.log(`
      For simplification purposes drawing on the canvas is resetting current transformation.
      Otherwise we need to calculate positions of points based on current values of
      scale, flip etc. It complicates code a lot and I avoided it for simplicity.
      `);

      return getNewState(
        {
          scale,
          rotation,
          flipHorizontal,
          flipVertical,
        },
        now,
        past
      );
    }

    default:
      return state;
  }
};

export const initialState: UndoRedoState = {
  past: [],
  now: {
    scale: 1,
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    lines: [],
    color: "#000000",
    enabledDrawMode: false,
  },
  future: [],
};
