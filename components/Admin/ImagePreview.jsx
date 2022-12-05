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
  ...other
}) {
  const [src, setSrc] = useState(url);
  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setSrc(dataURL);
    };
    reader.readAsDataURL(file);
  }, [file, url]);
  return (
    <div {...other}>
      <Image src={src || url} alt={alt} width={width} height={height} />
    </div>
  );
}
