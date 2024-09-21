import { useState, useEffect } from "react";

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const getScreenSize = (width: number): ScreenSize => {
  if (width < 576) {
    return "xs";
  } else if (width >= 576 && width < 768) {
    return "sm";
  } else if (width >= 768 && width < 992) {
    return "md";
  } else if (width >= 992 && width < 1200) {
    return "lg";
  } else {
    return "xl";
  }
};

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(
    getScreenSize(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
