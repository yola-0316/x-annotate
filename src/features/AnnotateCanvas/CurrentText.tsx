import { useEffect, useRef } from "react";
import { Html } from "react-konva-utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { editorToolState } from "@/store/editorTool";
import { activeGraphState } from "@/store/graphCurrent";
import { graphStackState } from "@/store/graphStack";

export default function CurrentText() {
  const tool = useRecoilValue(editorToolState);
  const [activeGraph, setActiveGraph] = useRecoilState(activeGraphState);
  const setHistoryGraphs = useSetRecoilState(graphStackState);

  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      setActiveGraph({ tool, points: [] });
    };
  }, []);

  useEffect(() => {
    console.log(activeGraph.points, showTextEditor);
    if (showTextEditor) {
      // textRef.current?.focus();
      textRef.current?.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
      );
    }
  }, [activeGraph.points[0], activeGraph.points[1]]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setActiveGraph({ tool, points: [] });
      setHistoryGraphs((prev) => [
        ...prev,
        { ...activeGraph, text: e.currentTarget.value },
      ]);
    }
  };

  const showTextEditor = tool === "text" && activeGraph.points?.length === 2;

  return (
    <>
      <Html>
        {showTextEditor && (
          <textarea
            ref={textRef}
            autoFocus
            className="border outline"
            style={{
              position: "absolute",
              left: activeGraph.points[0],
              top: activeGraph.points[1],
            }}
            onKeyDown={handleKeyDown}
          />
        )}
      </Html>
    </>
  );
}
