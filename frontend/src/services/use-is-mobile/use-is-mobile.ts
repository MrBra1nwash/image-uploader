import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

// Very simple hook, it doesn't work in all cases and not every screen width <=768 is mobile, but for my use case it is enough
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
