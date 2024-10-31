import { useMemo } from "react";
import { Accordion } from "../../../../components";
import { MenuRow } from "../MenuRow/MenuRow";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as RotateCircle } from "../../assets/rotate-circle.svg";
import { ReactComponent as RotateLeft } from "../../assets/rotate-left.svg";
import { ReactComponent as RotateRight } from "../../assets/rotate-right.svg";
import { ReactComponent as ZoomIcon } from "../../assets/zoom.svg";
import {
  ControlIconWrapper,
  ControlsContainer,
  ResetButton,
  RowControlsContainer,
  ZoomValue,
} from "./styles";

type Props = {
  scale: number;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const Controls = ({
  scale,
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) => {
  const zoomValue = useMemo(() => {
    if (scale > 4) {
      return `It's time for you to visit an ophthalmologist :)`;
    }
    return Math.round(scale * 100) + "%";
  }, [scale]);

  return (
    <ControlsContainer>
      <Accordion title={<MenuRow icon={ZoomIcon}>Zoom</MenuRow>}>
        <RowControlsContainer>
          <ControlIconWrapper onClick={onZoomOut}>
            <MinusIcon />
          </ControlIconWrapper>
          <ControlIconWrapper onClick={onZoomIn}>
            <PlusIcon />
          </ControlIconWrapper>
          <ZoomValue>{zoomValue}</ZoomValue>
        </RowControlsContainer>
      </Accordion>
      <Accordion title={<MenuRow icon={RotateCircle}>Rotate</MenuRow>}>
        <RowControlsContainer>
          <ControlIconWrapper onClick={onRotateLeft}>
            <RotateLeft />
          </ControlIconWrapper>
          <ControlIconWrapper onClick={onRotateRight}>
            <RotateRight />
          </ControlIconWrapper>
        </RowControlsContainer>
      </Accordion>

      <ResetButton onClick={onReset}>Reset</ResetButton>
    </ControlsContainer>
  );
};
