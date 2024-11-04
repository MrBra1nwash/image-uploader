import { FunctionComponent, SVGProps } from "react";
import {
  DisabledIconContainer,
  EnabledIconContainer,
  ToggleCircle,
  ToggleContainer,
} from "./styles";
import { ReactComponent as PencilDisabled } from "./assets/pencil-disabled.svg";
import { ReactComponent as PencilEnabled } from "./assets/pencil.svg";

type Props = {
  enabled: boolean;
  onToggle: () => void;
  enabledIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  disabledIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
};

export const Switch = ({
  enabled,
  onToggle,
  enabledIcon: EnabledIcon = PencilEnabled,
  disabledIcon: DisabledIcon = PencilDisabled,
}: Props) => {
  const handleToggle = () => {
    onToggle();
  };

  return (
    <ToggleContainer onClick={handleToggle} enabled={enabled}>
      {enabled ? (
        <EnabledIconContainer>
          <EnabledIcon />
        </EnabledIconContainer>
      ) : (
        <DisabledIconContainer>
          <DisabledIcon />
        </DisabledIconContainer>
      )}
      <ToggleCircle enabled={enabled} />
    </ToggleContainer>
  );
};
