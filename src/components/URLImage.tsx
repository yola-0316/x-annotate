import { Image } from "react-konva";

import useImage from "@/hooks/useImage";

interface URLImageProps {
  src: string;
  x?: number;
  y?: number;
}
export default function URLImage({ src, x = 0, y = 0 }: URLImageProps) {
  const [image] = useImage(src);

  return <Image x={x} y={y} image={image} />;
}
