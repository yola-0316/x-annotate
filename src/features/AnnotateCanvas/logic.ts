import type Konva from "konva";

import { type Graph } from "@/store/graphCurrent";
import { EditorControl } from "@/store/editorControl";

export function getGraphAttr(graph: Graph, control?: EditorControl) {
  if (graph.tool === "line") {
    return { points: graph.points } as Konva.LineConfig;
  } else if (graph.tool === "rect") {
    return {
      x: graph?.points?.[0],
      y: graph?.points?.[1],
      width: graph?.points?.[2] - graph?.points?.[0],
      height: graph?.points?.[3] - graph?.points?.[1],
    } as Konva.RectConfig;
  } else if (graph.tool === "ellipse") {
    return {
      x: (graph?.points?.[0] + graph?.points?.[2]) / 2,
      y: (graph?.points?.[1] + graph?.points?.[3]) / 2,
      radiusX: Math.abs((graph?.points?.[2] - graph?.points?.[0]) / 2),
      radiusY: Math.abs((graph?.points?.[3] - graph?.points?.[1]) / 2),
    } as Konva.EllipseConfig;
  } else if (graph.tool === "text") {
    return {
      x: graph?.points?.[0],
      y: graph?.points?.[1],
      text: graph?.text,
      fontSize: 20,
      fontFamily: "Arial",
      fill: control?.color ?? "#000000",
    } as Konva.TextConfig;
  }
}
