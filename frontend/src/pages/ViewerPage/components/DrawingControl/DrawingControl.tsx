import { ColorPicker, Switch } from "../../../../components";
import { DrawingControlsContainer } from "./styles";

type Props = {
  color: string;
  enabledDrawMode: boolean;
  onSetColor: (color: string) => void;
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
