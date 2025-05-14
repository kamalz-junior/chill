import { useEffect, useState } from "react";

const MOBILE_BREAPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAPOINT);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
