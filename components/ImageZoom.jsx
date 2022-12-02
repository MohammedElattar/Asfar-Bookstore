import mediumZoom from "medium-zoom";
import { useRef } from "react";

export default function ImageZoom(props) {
  const zoom = useRef(typeof window !== undefined ? mediumZoom() : null);
  const zoomRef = useRef(zoom.current?.clone());

  function attachZoom(image) {
    zoomRef.current?.attach(image);
  }

  return <img ref={attachZoom} {...props} />;
}
