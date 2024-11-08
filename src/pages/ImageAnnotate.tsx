import { useState, useRef, useEffect } from "react";
import * as fabric from "fabric";

type Point = { x: number; y: number };

function drawLine(canvas: fabric.Canvas, start: Point, end: Point) {
  const line = new fabric.Line([start.x, start.y, end.x, end.y], {
    stroke: "red",
  });
  canvas.add(line);
}

export default function ImageAnnotate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const normalStack: [Point?, Point?] = [];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);

    const text = new fabric.FabricText("Hello", {
      left: 100,
      top: 100,
      fill: "red",
    });
    // canvas.add(text);

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 20,
      height: 20,
      angle: 10,
    });
    rect.set("selectable", false);
    // canvas.add(rect);

    const group = new fabric.Group([rect, text], {
      left: 10,
      top: 10,
    });
    canvas.add(group);

    group.remove();

    drawLine(canvas, { x: 0, y: 0 }, { x: 100, y: 100 });

    canvas.on("mouse:down", (event) => {
      console.log(event.scenePoint);
      if (normalStack.length === 0) {
        normalStack.push(event.scenePoint);
      } else {
        drawLine(canvas, normalStack[0]!, event.scenePoint);
        normalStack.push(event.scenePoint);
      }
    });

    canvas.on("mouse:move", (event) => {
      console.log(event.scenePoint);

      if (normalStack.length === 0) {
        // normalStack.push(event.scenePoint);
      } else {
        canvas.clear();
        drawLine(canvas, normalStack[0]!, event.scenePoint);
        // normalStack.push(event.scenePoint);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1>ImageAnnotate</h1>

      <div className="editor">
        <canvas
          ref={canvasRef}
          width="1024"
          height="1024"
          className="plane border border-gray-300"
        ></canvas>
      </div>
    </div>
  );
}
