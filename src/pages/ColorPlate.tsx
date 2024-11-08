import { useState, useRef, useEffect } from "react";
import * as fabric from "fabric";

export default function ColorPlate() {
  const [r, setR] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);

    const text = new fabric.Text("Hello", {
      left: 100,
      top: 100,
      fill: "red",
    });
    canvas.add(text);

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 200,
      height: 200,
    });
    canvas.add(rect);

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1>ColorPlate</h1>
      <div>
        x:{" "}
        <input
          type="range"
          min="0"
          max="255"
          value={r}
          onChange={(e) => setR(parseInt(e.target.value))}
        />
        <b>{r}</b>
      </div>

      <canvas
        ref={canvasRef}
        width="256"
        height="256"
        className="plane w-[512px] h-[512px]"
      ></canvas>
    </div>
  );
}
