import { useState, useEffect } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleContentLoaded = () => {
      setIsLoading(false);
    };

    document.addEventListener("DOMContentLoaded", handleContentLoaded);

    return () => {
      document.removeEventListener("DOMContentLoaded", handleContentLoaded);
      setIsLoading(false);
    };
  }, []);

  return isLoading;
};
