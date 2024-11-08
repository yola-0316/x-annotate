import { useState, useRef, useEffect } from "react";

function DOMColor() {
  const blockSize = 2;
  const size = 256 * blockSize;

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold underline">DOMColor</h1>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        {Array.from({ length: 256 * 256 }).map((_, i) => {
          const x = (i % 256) * blockSize;
          const y = Math.floor(i / 256) * blockSize;
          const r = Math.floor(i / 256);
          const g = i % 256;
          const b = Math.floor((i % 65536) / 256);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={blockSize}
              height={blockSize}
              fill={`rgb(${r}, ${g}, ${b})`}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default DOMColor;
