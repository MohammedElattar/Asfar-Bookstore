import React, { useEffect, useState } from "react";

function useMediaQuery(media) {
  const [isMatch, setIsMatch] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(media).matches;
    }
    return false;
  });

  useEffect(() => {
    window.onresize = () => {
      setIsMatch(window.matchMedia(media).matches);
    };
    return () => (window.onresize = null);
  }, [media]);
  return isMatch;
}

export default useMediaQuery;
