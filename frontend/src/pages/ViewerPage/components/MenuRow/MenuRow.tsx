import { FunctionComponent, PropsWithChildren, SVGProps } from "react";
import { RowContainer } from "./styles";

type Props = PropsWithChildren<{
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}>;

export const MenuRow = ({ icon: Icon, children }: Props) => (
  <RowContainer>
    <Icon />
    {children}
  </RowContainer>
);
