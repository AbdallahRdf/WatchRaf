import { useState, useEffect } from "react";

export const useScreenWidth = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const breakPoint = 768;
    const isScreenSmall = screenWidth <= breakPoint;

    useEffect(() => {
      const handleScreenSizeChange = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleScreenSizeChange);

      return () => window.removeEventListener("resize", handleScreenSizeChange);
    }, []);

    return {screenWidth, isScreenSmall};
}