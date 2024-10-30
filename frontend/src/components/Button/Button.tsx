import { PropsWithChildren } from "react";
import { ButtonVariant } from "./types";
import { StyledButton } from "./styles";

export type Props = PropsWithChildren<{
  variant: ButtonVariant;
  disabled?: boolean;
  onClick: () => void;
}>;

export const Button = ({ children, disabled, variant, onClick }: Props) => (
  <StyledButton {...{ disabled, variant, onClick }}>{children}</StyledButton>
);
