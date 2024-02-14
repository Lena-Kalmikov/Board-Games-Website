import { useState, useEffect } from "react";

export default function useFadeInEffect(delay = 50) {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsComponentLoaded(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return isComponentLoaded;
}
