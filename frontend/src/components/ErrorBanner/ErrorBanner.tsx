import { useEffect, useState } from "react";
import { BANNER_DISAPPEAR_TIMEOUT } from "./constants";
import { BannerContainer, CloseButton } from "./styles";

type Props = {
  message?: string;
};

export const ErrorBanner = ({ message }: Props) => {
  const [showBanner, setShowBanner] = useState(!!message);

  useEffect(() => {
    setShowBanner(!!message);

    // Automatically hide the banner after 5 seconds
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, BANNER_DISAPPEAR_TIMEOUT);

    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    setShowBanner(false);
  };

  return (
    <BannerContainer show={showBanner}>
      {message}
      <CloseButton onClick={handleClose}>&times;</CloseButton>
    </BannerContainer>
  );
};
