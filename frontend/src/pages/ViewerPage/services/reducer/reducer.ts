import { State, UndoRedoState, Action } from "./types";

const getNewState = (now: State, past: State[]) => ({
  past,
  now,
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
      return getNewState({ ...now, flipHorizontal: !now.flipHorizontal }, [
        ...past,
        now,
      ]);
    }

    case "flipVertical": {
      return getNewState({ ...now, flipVertical: !now.flipVertical }, [
        ...past,
        now,
      ]);
    }

    case "rotateLeft": {
      return getNewState({ ...now, rotation: (now.rotation + 90) % 360 }, [
        ...past,
        now,
      ]);
    }

    case "rotateRight": {
      return getNewState({ ...now, rotation: (now.rotation - 90) % 360 }, [
        ...past,
        now,
      ]);
    }

    case "zoomIn": {
      return getNewState({ ...now, scale: now.scale + 0.1 }, [...past, now]);
    }

    case "zoomOut": {
      return getNewState({ ...now, scale: Math.max(0.1, now.scale - 0.1) }, [
        ...past,
        now,
      ]);
    }

    case "reset": {
      return initialState;
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
  },
  future: [],
};
