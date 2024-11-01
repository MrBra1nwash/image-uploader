import {
  MinusIcon,
  PlusIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ResetIcon,
} from "../../assets";

import {
  ControlIconWrapper,
  ControlItemWrapper,
  ControlTextWrapper,
  MobileControlsContainer,
} from "./styles";

type Props = {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const MobileControls = ({
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) => {
  return (
    <MobileControlsContainer>
      <ControlItemWrapper>
        <ControlIconWrapper onClick={onZoomOut}>
          <MinusIcon />
        </ControlIconWrapper>
        <ControlTextWrapper>Zoom Out</ControlTextWrapper>
      </ControlItemWrapper>
      <ControlItemWrapper>
        <ControlIconWrapper onClick={onZoomIn}>
          <PlusIcon />
        </ControlIconWrapper>
        <ControlTextWrapper>Zoom In</ControlTextWrapper>
      </ControlItemWrapper>
      <ControlItemWrapper>
        <ControlIconWrapper onClick={onRotateLeft}>
          <RotateLeftIcon />
        </ControlIconWrapper>
        <ControlTextWrapper>Rotate Left</ControlTextWrapper>
      </ControlItemWrapper>
      <ControlItemWrapper>
        <ControlIconWrapper onClick={onRotateRight}>
          <RotateRightIcon />
        </ControlIconWrapper>
        <ControlTextWrapper>Rotate Right</ControlTextWrapper>
      </ControlItemWrapper>
      <ControlItemWrapper>
        <ControlIconWrapper onClick={onReset}>
          <ResetIcon />
        </ControlIconWrapper>
        <ControlTextWrapper>Reset</ControlTextWrapper>
      </ControlItemWrapper>
    </MobileControlsContainer>
  );
};
