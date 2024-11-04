import { ColorPicker, Switch } from "../../../../components";
import { DrawingControlsContainer } from "./styles";

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
    <DrawingControlsContainer>
      <Switch enabled={enabledDrawMode} onToggle={onToggleDrawingMode} />
      <ColorPicker color={color} onChange={onSetColor} />
    </DrawingControlsContainer>
  );
};
