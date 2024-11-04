import { PropsWithChildren, MouseEvent } from "react";
import { ButtonVariant } from "./types";
import { StyledButton } from "./styles";

export type Props = PropsWithChildren<{
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Button = ({ children, disabled, variant, onClick }: Props) => (
  <StyledButton {...{ disabled, variant, onClick }}>{children}</StyledButton>
);
