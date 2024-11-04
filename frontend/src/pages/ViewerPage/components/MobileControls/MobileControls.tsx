import { ColorPicker } from "../../../../components";
import {
  MinusIcon,
  PlusIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ResetIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "../../assets";
import { ControlCallbacks } from "../../types";

import { ReactComponent as PencilEnabledIcon } from "./assets/pencil.svg";
import { ReactComponent as PencilDisabledIcon } from "./assets/pencil-disabled.svg";

import {
  ControlIconWrapper,
  ControlItemWrapper,
  ControlTextWrapper,
  MobileControlsContainer,
} from "./styles";

type Props = ControlCallbacks & {
  isRedoDisabled: boolean;
  isUndoDisabled: boolean;
  color: string;
  enabledDrawMode: boolean;
};

export const MobileControls = ({
  onUndo,
  onRedo,
  onFlipHorizontal,
  onFlipVertical,
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onReset,
  onSetColor,
  onToggleDrawingMode,
  isRedoDisabled,
  isUndoDisabled,
  color,
  enabledDrawMode,
}: Props) => {
  const controls = [
    {
      icon: <MinusIcon />,
      callback: onZoomOut,
      text: "Zoom Out",
    },
    {
      icon: <PlusIcon />,
      callback: onZoomIn,
      text: "Zoom In",
    },
    {
      icon: <RotateLeftIcon />,
      callback: onRotateLeft,
      text: "Rotate Left",
    },
    {
      icon: <RotateRightIcon />,
      callback: onRotateRight,
      text: "Rotate Right",
    },
    {
      icon: <FlipHorizontalIcon />,
      callback: onFlipHorizontal,
      text: "Flip Horizontal",
    },
    {
      icon: <FlipVerticalIcon />,
      callback: onFlipVertical,
      text: "Flip Vertical",
    },
    {
      icon: enabledDrawMode ? <PencilEnabledIcon /> : <PencilDisabledIcon />,
      callback: onToggleDrawingMode,
      text: "Toggle Drawing",
    },
    {
      icon: <ColorPicker size="small" color={color} onChange={onSetColor} />,
      text: "Change Color",
    },
    {
      icon: <LeftArrowIcon />,
      callback: onUndo,
      disabled: isUndoDisabled,
      text: "Undo",
    },
    {
      icon: <RightArrowIcon />,
      callback: onRedo,
      disabled: isRedoDisabled,
      text: "Redo",
    },
    {
      icon: <ResetIcon />,
      callback: onReset,
      text: "Reset",
    },
  ];

  return (
    <MobileControlsContainer>
      {controls.map(({ callback, icon, text }, index) => (
        <ControlItemWrapper key={index}>
          <ControlIconWrapper onClick={callback}>{icon}</ControlIconWrapper>
          <ControlTextWrapper>{text}</ControlTextWrapper>
        </ControlItemWrapper>
      ))}
    </MobileControlsContainer>
  );
};
