import { useState, useEffect } from "react";

export const useScreenWidth = () => {

  const breakPoint = 768;

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth<=breakPoint);

    useEffect(() => {
      const handleScreenSizeChange = () => {
        setIsScreenSmall(window.innerWidth<=breakPoint);
      };
      window.addEventListener("resize", handleScreenSizeChange);

      return () => window.removeEventListener("resize", handleScreenSizeChange);
    }, []);

    return isScreenSmall;
}