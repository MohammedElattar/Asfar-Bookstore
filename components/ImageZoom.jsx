import { useRef } from "react";

export default function ImageZoom({ zoom, src, alt }) {
  const zoomRef = useRef(zoom?.clone());

  function attachZoom(image) {
    zoomRef.current?.attach(image);
  }

  return <img src={src} alt={alt} ref={attachZoom} />;
}
