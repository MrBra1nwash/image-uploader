import { useMemo } from "react";
import { Accordion } from "../../../../components";
import { MenuRow } from "../MenuRow/MenuRow";
import {
  FlipHorizontalIcon,
  FlipIcon,
  FlipVerticalIcon,
  LeftArrowIcon,
  MinusIcon,
  PlusIcon,
  RightArrowIcon,
  RotateCircleIcon,
  RotateLeftIcon,
  RotateRightIcon,
  TimeIcon,
  ZoomIcon,
} from "../../assets";
import {
  ControlIconWrapper,
  ControlsContainer,
  ResetButton,
  RowControlsContainer,
  ZoomValue,
} from "./styles";
import { ControlCallbacks } from "../../types";
import { ControlConfig } from "./types";

type Props = ControlCallbacks & {
  scale: number;
  isRedoDisabled: boolean;
  isUndoDisabled: boolean;
};

export const Controls = ({
  scale,
  isRedoDisabled,
  isUndoDisabled,
  onUndo,
  onRedo,
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

  const controls: ControlConfig[] = [
    {
      title: {
        icon: ZoomIcon,
        text: "Zoom",
      },
      buttons: [
        {
          icon: MinusIcon,
          callback: onZoomOut,
        },
        {
          icon: PlusIcon,
          callback: onZoomIn,
        },
      ],
      extra: <ZoomValue>{zoomValue}</ZoomValue>,
    },
    {
      title: {
        icon: RotateCircleIcon,
        text: "Rotate",
      },
      buttons: [
        {
          icon: RotateLeftIcon,
          callback: onRotateLeft,
        },
        {
          icon: RotateRightIcon,
          callback: onRotateRight,
        },
      ],
    },
    {
      title: {
        icon: FlipIcon,
        text: "Flip",
      },
      buttons: [
        {
          icon: FlipVerticalIcon,
          callback: onFlipVertical,
        },
        {
          icon: FlipHorizontalIcon,
          callback: onFlipHorizontal,
        },
      ],
    },
    {
      title: {
        icon: TimeIcon,
        text: "Time Travel",
      },
      buttons: [
        {
          icon: LeftArrowIcon,
          callback: onUndo,
          disabled: isUndoDisabled,
        },
        {
          icon: RightArrowIcon,
          callback: onRedo,
          disabled: isRedoDisabled,
        },
      ],
    },
  ];

  return (
    <ControlsContainer>
      {controls.map(({ title, buttons, extra }, index) => (
        // Totally fine to use `index` as a key in this case. We don't change order of items in any way
        <Accordion
          key={index}
          title={<MenuRow icon={title.icon}>{title.text}</MenuRow>}
        >
          <RowControlsContainer>
            {buttons.map(({ callback, icon: Icon, disabled }, index) => (
              <ControlIconWrapper
                key={index}
                onClick={callback}
                disabled={!!disabled}
              >
                <Icon />
              </ControlIconWrapper>
            ))}
            {extra}
          </RowControlsContainer>
        </Accordion>
      ))}

      <ResetButton onClick={onReset}>Reset</ResetButton>
    </ControlsContainer>
  );
};
