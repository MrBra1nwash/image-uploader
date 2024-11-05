import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ColorOption,
  ColorPickerContainer,
  SelectedColor,
  Tooltip,
  TooltipArrow,
} from "./styles";
import { COLORS } from "./constants";

type Props = {
  color: string;
  size?: "regular" | "small";
  onChange: (color: string) => void;
};

export const ColorPicker = ({ size = "regular", color, onChange }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const selectedColorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleColorSelect = (color: string) => {
    onChange(color);
    setShowTooltip(false);
  };

  const setTooltipToProperPosition = useCallback(() => {
    if (showTooltip && selectedColorRef.current && colorPickerRef.current) {
      // Calculate tooltip position to center it above color selector.
      // It is positioned fixed to not be influenced by overflow: hidden and other parent's CSS props
      const selectedColorReact =
        selectedColorRef.current.getBoundingClientRect();

      const tooltipWidth = colorPickerRef.current.offsetWidth;
      const tooltipHeight = colorPickerRef.current.offsetHeight;

      const borderTriangleHeight = 8;
      const top = selectedColorReact.top - tooltipHeight - borderTriangleHeight;
      const left =
        selectedColorReact.left -
        tooltipWidth / 2 +
        selectedColorReact.width / 2;
      setTooltipPosition({ top, left });
    }
  }, [showTooltip]);

  useLayoutEffect(() => {
    setTooltipToProperPosition();
  }, [setTooltipToProperPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTooltip &&
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", setTooltipToProperPosition);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", setTooltipToProperPosition);
    };
  }, [setTooltipToProperPosition, showTooltip]);

  return (
    <ColorPickerContainer>
      <SelectedColor
        ref={selectedColorRef}
        size={size}
        color={color}
        onClick={handleClick}
      />
      {showTooltip && (
        <Tooltip ref={colorPickerRef} {...tooltipPosition}>
          <TooltipArrow />
          {COLORS.map((color) => (
            <ColorOption
              key={color}
              color={color}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </Tooltip>
      )}
    </ColorPickerContainer>
  );
};
