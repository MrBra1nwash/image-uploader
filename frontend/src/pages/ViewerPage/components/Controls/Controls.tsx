import { useMemo } from "react";
import { Accordion } from "../../../../components";
import { MenuRow } from "../MenuRow/MenuRow";
import {
  FlipHorizontalIcon,
  FlipIcon,
  FlipVerticalIcon,
  MinusIcon,
  PlusIcon,
  RotateCircleIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ZoomIcon,
} from "../../assets";
import {
  ControlIconWrapper,
  ControlsContainer,
  ResetButton,
  RowControlsContainer,
  ZoomValue,
} from "./styles";

type Props = {
  scale: number;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const Controls = ({
  scale,
  onFlipHorizontal,
  onFlipVertical,
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
      <Accordion title={<MenuRow icon={RotateCircleIcon}>Rotate</MenuRow>}>
        <RowControlsContainer>
          <ControlIconWrapper onClick={onRotateLeft}>
            <RotateLeftIcon />
          </ControlIconWrapper>
          <ControlIconWrapper onClick={onRotateRight}>
            <RotateRightIcon />
          </ControlIconWrapper>
        </RowControlsContainer>
      </Accordion>
      <Accordion title={<MenuRow icon={FlipIcon}>Flip</MenuRow>}>
        <RowControlsContainer>
          <ControlIconWrapper onClick={onFlipVertical}>
            <FlipVerticalIcon />
          </ControlIconWrapper>
          <ControlIconWrapper onClick={onFlipHorizontal}>
            <FlipHorizontalIcon />
          </ControlIconWrapper>
        </RowControlsContainer>
      </Accordion>

      <ResetButton onClick={onReset}>Reset</ResetButton>
    </ControlsContainer>
  );
};
