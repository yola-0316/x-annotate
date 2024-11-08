import type Konva from "konva";
import { Rect, Line, Ellipse, KonvaNodeComponent } from "react-konva";
export type ToolType = "line" | "rect" | "ellipse";
export type PointPair = number[];
export type Graph = {
  tool: ToolType;
  points: PointPair;
};

type ToolGraphMap = {
  [key in ToolType]: KonvaNodeComponent<Konva.Node, Konva.NodeConfig>;
};

const toolGraphMap = {
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
};

interface DynaGraphProps {
  tool: ToolType;
  activeGraph: Graph;
  graphStack: Graph[];
  color?: string;
  strokeWidth?: number;
}

export default function DynaGraph({
  tool,
  activeGraph,
  graphStack,
  color = "red",
  strokeWidth = 2,
}: DynaGraphProps) {
  const RenderTool = toolGraphMap[tool];

  const graphAttr = getGraphAttr(activeGraph) as Konva.EllipseConfig;

  return (
    <>
      {activeGraph.points?.length === 4 && (
        <RenderTool {...graphAttr} stroke={color} strokeWidth={strokeWidth} />
      )}
      {graphStack.map((graph, index) => {
        const graphAttr = getGraphAttr(graph) as Konva.EllipseConfig;
        const Component = toolGraphMap[graph.tool];
        return (
          <Component
            key={index}
            {...graphAttr}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </>
  );
}

function getGraphAttr(graph: Graph) {
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
  }
}
