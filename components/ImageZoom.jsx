import mediumZoom from "medium-zoom";
import { useRef } from "react";

export default function ImageZoom({ style, ...props }) {
  const zoom = useRef(typeof window !== "undefined" ? mediumZoom() : null);
  const zoomRef = useRef(zoom.current?.clone());

  function attachZoom(image) {
    zoomRef.current?.attach(image);
  }

  return (
    // eslint-disable-next-line
    <img
      ref={attachZoom}
      {...props}
      style={{ zIndex: "50", ...(style || {}) }}
    />
  );
}
