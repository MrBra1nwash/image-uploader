import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as RotateLeftIcon } from "../../assets/rotate-left.svg";
import { ReactComponent as RotateRightIcon } from "../../assets/rotate-right.svg";
import { ReactComponent as ResetIcon } from "../../assets/reset.svg";
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
