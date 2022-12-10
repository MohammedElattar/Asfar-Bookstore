import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export default function ImagePreview({
  url,
  file,
  alt,
  width,
  height,
  style,
  ...other
}) {
  const [src, setSrc] = useState(url);
  useEffect(() => {
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
  }, [file, url]);
  return (
    <div {...other}>
      <img src={src || url} alt={alt} style={style} />
    </div>
  );
}
