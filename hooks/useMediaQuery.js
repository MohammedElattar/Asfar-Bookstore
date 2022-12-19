import { useEffect, useState } from "react";

function useMediaQuery(media) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    setIsMatch(window.matchMedia(media).matches);
    window.onresize = () => {
      setIsMatch(window.matchMedia(media).matches);
    };
    return () => (window.onresize = null);
  }, [media]);
  return isMatch;
}

export default useMediaQuery;
