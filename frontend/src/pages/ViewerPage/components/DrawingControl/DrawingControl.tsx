import { HexColorPicker } from "react-colorful";
import { Switch } from "../../../../components";
import { ReactComponent as PencilEnabled } from "./assets/pencil.svg";
import { ReactComponent as PencilDisabled } from "./assets/pencil-disabled.svg";

type Props = {
  color: string;
  onSetColor: (color: string) => void;
  enabledDrawMode: boolean;
  onToggleDrawingMode: () => void;
};

export const DrawingControl = ({
  color,
  enabledDrawMode,
  onSetColor,
  onToggleDrawingMode,
}: Props) => {
  return (
    <>
      <Switch
        enabled={enabledDrawMode}
        onToggle={onToggleDrawingMode}
        enabledIcon={PencilEnabled}
        disabledIcon={PencilDisabled}
      />
      <HexColorPicker color={color} onChange={onSetColor} />
    </>
  );
};
