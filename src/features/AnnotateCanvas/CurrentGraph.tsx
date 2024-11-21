import type Konva from "konva";
import { Rect, Line, Ellipse } from "react-konva";
import { useRecoilValue } from "recoil";

import { activeGraphState } from "@/store/graphCurrent";
import { editorToolState } from "@/store/editorTool";

import { getGraphAttr } from "./logic";

const toolGraphMap = {
  move: () => null,
  pencil: () => null,
  eraser: () => null,
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
  text: () => null,
};

export default function CurrentGraph() {
  const tool = useRecoilValue(editorToolState);
  const activeGraph = useRecoilValue(activeGraphState);

  const graphAttr = getGraphAttr(activeGraph) as Konva.EllipseConfig;
  const RenderTool = toolGraphMap[tool];

  return (
    <RenderTool
      {...graphAttr}
      stroke={activeGraph.color}
      strokeWidth={activeGraph.strokeWidth}
    />
  );
}
