import { FunctionComponent, ReactNode, SVGProps } from "react";

export type ControlConfig = {
  title: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    text: string;
  };
  buttons: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    callback: () => void;
    disabled?: boolean;
  }[];
  extra?: ReactNode;
};
