import { useRecoilValue } from "recoil";

import { activeGraphState } from "@/store/graphCurrent";
import { editorToolState } from "@/store/editorTool";

import CurrentGraph from "./CurrentGraph";
import CurrentText from "./CurrentText";
import GraphStack from "./GraphStack";

export default function AnnotateCanvas() {
  const tool = useRecoilValue(editorToolState);
  const activeGraph = useRecoilValue(activeGraphState);

  return (
    <>
      <GraphStack />

      {tool !== "text" && activeGraph.points?.length === 4 && <CurrentGraph />}
      {tool === "text" && <CurrentText />}
    </>
  );
}
