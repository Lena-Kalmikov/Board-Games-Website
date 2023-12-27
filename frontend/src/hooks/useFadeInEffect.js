import { useState, useEffect } from "react";

export default function useFadeInEffect(delay = 50) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return isLoaded;
}
