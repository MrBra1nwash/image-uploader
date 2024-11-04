import { useCallback, useEffect } from "react";

type Props = {
  onUndo: () => void;
  onRedo: () => void;
  onCancelDrawMode: () => void;
};

export const useHandleHotKeys = ({
  onUndo,
  onRedo,
  onCancelDrawMode,
}: Props) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Not the best way to detect, but it is suggested even here
      // https://developer.mozilla.org/ru/docs/Web/API/Navigator/platform#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B
      const isMac = navigator.platform.includes("Mac");

      if (event.key === "Escape") {
        onCancelDrawMode();
      } else if (
        (isMac ? event.metaKey : event.ctrlKey) &&
        event.key.toLowerCase() === "z"
      ) {
        if (event.shiftKey) {
          onRedo();
        } else {
          onUndo();
        }

        event.preventDefault();
        event.stopPropagation();
      }
    },
    [onCancelDrawMode, onRedo, onUndo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
