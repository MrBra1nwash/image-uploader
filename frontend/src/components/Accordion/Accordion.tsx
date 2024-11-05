import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";
import { ArrowContainer, ChildrenContainer, TitleRow } from "./styles";

type Props = PropsWithChildren<{
  title: ReactNode;
}>;

export const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // To make animation work for the content with unknown height
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
    // Children is presented in deps array to trigger content height recalculation when children changes
  }, [isOpen, children]);

  return (
    <>
      <TitleRow isOpen={isOpen} onClick={toggleOpen}>
        {title}
        <ArrowContainer isOpen={isOpen}>
          <ArrowIcon />
        </ArrowContainer>
      </TitleRow>
      <ChildrenContainer
        isOpen={isOpen}
        maxHeight={contentHeight}
        ref={contentRef}
      >
        {children}
      </ChildrenContainer>
    </>
  );
};
