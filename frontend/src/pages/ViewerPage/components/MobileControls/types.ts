import { FunctionComponent, ReactNode, SVGProps } from "react";

export type ControlConfig = {
  icon?: ReactNode;
  callback?: () => void;
  disabled?: boolean;
  text?: string;
  customContent?: ReactNode;
};
