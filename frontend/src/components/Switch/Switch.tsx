import { FunctionComponent, SVGProps } from "react";
import {
  DisabledIconContainer,
  EnabledIconContainer,
  ToggleCircle,
  ToggleContainer,
} from "./styles";

type Props = {
  enabled: boolean;
  onToggle: () => void;
  enabledIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
  disabledIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
};

export const Switch = ({
  enabled,
  onToggle,
  enabledIcon: EnabledIcon,
  disabledIcon: DisabledIcon,
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
